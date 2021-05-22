/**
 * @name  ExportHelper
 * @description 导出文件助手(引用了csv.js [v3.6.4]这个第三方库进行对字符串的编码和解码 github地址为:https://github.com/knrz/CSV.js/tree/3.6.4)
 * @author  稀饭
 * @date 2021/05/18
 * @license  MIT
 */
(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ?
    factory(exports) :
    typeof define === "function" && define.amd ?
    define(["exports"], factory) :
    ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      factory((global.ExportHelper = {})));
})(this, function(exports) {
  "use strict";

  const _window = window,
    _document = document,
    CSV_MIME_TYPE = "text/csv";

  const CSV = (function() {
    var ESCAPE_DELIMITERS = ["|", "^"],
      CELL_DELIMITERS = [",", ";", "\t", "|", "^"],
      LINE_DELIMITERS = ["\r\n", "\r", "\n"];

    function isObject(object) {
      var type = typeof object;
      return type === "function" || (type === "object" && !!object);
    }
    var isArray =
      Array.isArray ||
      function(object) {
        return toString.call(object) === "[object Array]";
      };

    function isString(object) {
      return typeof object === "string";
    }

    function isNumber(object) {
      return !isNaN(Number(object));
    }

    function isBoolean(value) {
      return value == false || value == true;
    }

    function isNull(value) {
      return value == null;
    }

    function isPresent(value) {
      return value != null;
    }

    function fallback(value, fallback) {
      return isPresent(value) ? value : fallback;
    }

    function forEach(collection, iterator) {
      for (var _i = 0, _len = collection.length; _i < _len; _i += 1) {
        if (iterator(collection[_i], _i) === false) break;
      }
    }

    function sanitizeString(string) {
      return string.replace(/"/g, '\\"');
    }

    function buildCell(index) {
      return "attrs[" + index + "]";
    }

    function castCell(value, index) {
      if (isNumber(value)) {
        return "Number(" + buildCell(index) + ")";
      } else if (isBoolean(value)) {
        return "Boolean(" + buildCell(index) + " == true)";
      } else {
        return "String(" + buildCell(index) + ")";
      }
    }

    function buildConstructor(deserialize, cast, values, attrs) {
      var definition = [];
      if (arguments.length == 3) {
        if (cast) {
          if (isArray(cast)) {
            forEach(values, function(value, index) {
              if (isString(cast[index])) {
                cast[index] = cast[index].toLowerCase();
              } else {
                deserialize[cast[index]] = cast[index];
              }
              definition.push(
                "deserialize[cast[" + index + "]](" + buildCell(index) + ")"
              );
            });
          } else {
            forEach(values, function(value, index) {
              definition.push(castCell(value, index));
            });
          }
        } else {
          forEach(values, function(value, index) {
            definition.push(buildCell(index));
          });
        }
        definition = "return [" + definition.join(",") + "]";
      } else {
        if (cast) {
          if (isArray(cast)) {
            forEach(values, function(value, index) {
              if (isString(cast[index])) {
                cast[index] = cast[index].toLowerCase();
              } else {
                deserialize[cast[index]] = cast[index];
              }
              definition.push(
                '"' +
                sanitizeString(attrs[index]) +
                '": deserialize[cast[' +
                index +
                "]](" +
                buildCell(index) +
                ")"
              );
            });
          } else {
            forEach(values, function(value, index) {
              definition.push(
                '"' +
                sanitizeString(attrs[index]) +
                '": ' +
                castCell(value, index)
              );
            });
          }
        } else {
          forEach(values, function(value, index) {
            definition.push(
              '"' + sanitizeString(attrs[index]) + '": ' + buildCell(index)
            );
          });
        }
        definition = "return {" + definition.join(",") + "}";
      }
      return new Function("attrs", "deserialize", "cast", definition);
    }

    function detectDelimiter(string, delimiters) {
      var count = 0,
        detected;

      forEach(delimiters, function(delimiter) {
        var needle = delimiter,
          matches;
        if (ESCAPE_DELIMITERS.indexOf(delimiter) != -1) {
          needle = "\\" + needle;
        }
        matches = string.match(new RegExp(needle, "g"));
        if (matches && matches.length > count) {
          count = matches.length;
          detected = delimiter;
        }
      });
      return detected || delimiters[0];
    }

    var CSV = (function() {
      function CSV(data, options) {
        if (!options) options = {};

        if (isArray(data)) {
          this.mode = "encode";
        } else if (isString(data)) {
          this.mode = "parse";
        } else {
          throw new Error("Incompatible format!");
        }

        this.data = data;

        this.options = {
          header: fallback(options.header, false),
          cast: fallback(options.cast, true)
        };

        var lineDelimiter = options.lineDelimiter || options.line,
          cellDelimiter = options.cellDelimiter || options.delimiter;

        if (this.isParser()) {
          this.options.lineDelimiter =
            lineDelimiter || detectDelimiter(this.data, LINE_DELIMITERS);
          this.options.cellDelimiter =
            cellDelimiter || detectDelimiter(this.data, CELL_DELIMITERS);
          this.data = normalizeCSV(this.data, this.options.lineDelimiter);
        } else if (this.isEncoder()) {
          this.options.lineDelimiter = lineDelimiter || "\r\n";
          this.options.cellDelimiter = cellDelimiter || ",";
        }
      }

      function invoke(method, constructor, attributes, deserialize, cast) {
        method(new constructor(attributes, deserialize, cast));
      }

      function normalizeCSV(text, lineDelimiter) {
        if (text.slice(-lineDelimiter.length) != lineDelimiter)
          text += lineDelimiter;
        return text;
      }

      CSV.prototype.set = function(setting, value) {
        return (this.options[setting] = value);
      };

      CSV.prototype.isParser = function() {
        return this.mode == "parse";
      };

      CSV.prototype.isEncoder = function() {
        return this.mode == "encode";
      };

      CSV.prototype.parse = function(callback) {
        if (this.mode != "parse") return;
        if (this.data.trim().length === 0) return [];

        var data = this.data,
          options = this.options,
          header = options.header,
          current = { cell: "", line: [] },
          deserialize = this.deserialize,
          flag,
          record,
          response;

        if (!callback) {
          response = [];
          callback = function(record) {
            response.push(record);
          };
        }

        function resetFlags() {
          flag = { escaped: false, quote: false, cell: true };
        }

        function resetCell() {
          current.cell = "";
        }

        function resetLine() {
          current.line = [];
        }

        function saveCell(cell) {
          current.line.push(
            flag.escaped ? cell.slice(1, -1).replace(/""/g, '"') : cell
          );
          resetCell();
          resetFlags();
        }

        function saveLastCell(cell) {
          saveCell(cell.slice(0, 1 - options.lineDelimiter.length));
        }

        function saveLine() {
          if (header) {
            if (isArray(header)) {
              record = buildConstructor(
                deserialize,
                options.cast,
                current.line,
                header
              );
              saveLine = function() {
                invoke(
                  callback,
                  record,
                  current.line,
                  deserialize,
                  options.cast
                );
              };
              saveLine();
            } else {
              header = current.line;
            }
          } else {
            if (!record) {
              record = buildConstructor(
                deserialize,
                options.cast,
                current.line
              );
            }
            saveLine = function() {
              invoke(callback, record, current.line, deserialize, options.cast);
            };
            saveLine();
          }
        }

        if (options.lineDelimiter.length == 1) saveLastCell = saveCell;

        var dataLength = data.length,
          cellDelimiter = options.cellDelimiter.charCodeAt(0),
          lineDelimiter = options.lineDelimiter.charCodeAt(
            options.lineDelimiter.length - 1
          ),
          _i,
          _c,
          _ch;

        resetFlags();

        for (_i = 0, _c = 0; _i < dataLength; _i++) {
          _ch = data.charCodeAt(_i);

          if (flag.cell) {
            flag.cell = false;
            if (_ch == 34) {
              flag.escaped = true;
              continue;
            }
          }

          if (flag.escaped && _ch == 34) {
            flag.quote = !flag.quote;
            continue;
          }

          if ((flag.escaped && flag.quote) || !flag.escaped) {
            if (_ch == cellDelimiter) {
              saveCell(current.cell + data.slice(_c, _i));
              _c = _i + 1;
            } else if (_ch == lineDelimiter) {
              saveLastCell(current.cell + data.slice(_c, _i));
              _c = _i + 1;
              if (current.line.length > 1 || current.line[0] !== "") {
                saveLine();
              }
              resetLine();
            }
          }
        }

        if (response) {
          return response;
        } else {
          return this;
        }
      };

      function serializeType(object) {
        if (isArray(object)) {
          return "array";
        } else if (isObject(object)) {
          return "object";
        } else if (isString(object)) {
          return "string";
        } else if (isNull(object)) {
          return "null";
        } else {
          return "primitive";
        }
      }

      CSV.prototype.deserialize = {
        string: function(string) {
          return String(string);
        },
        number: function(number) {
          return Number(number);
        },
        boolean: function(b) {
          return Boolean(b);
        }
      };

      CSV.prototype.serialize = {
        object: function(object) {
          var that = this,
            attributes = Object.keys(object),
            serialized = Array(attributes.length);
          forEach(attributes, function(attr, index) {
            serialized[index] = that[serializeType(object[attr])](object[attr]);
          });
          return serialized;
        },
        array: function(array) {
          var that = this,
            serialized = Array(array.length);
          forEach(array, function(value, index) {
            serialized[index] = that[serializeType(value)](value);
          });
          return serialized;
        },
        string: function(string) {
          return '"' + String(string).replace(/"/g, '""') + '"';
        },
        null: function(value) {
          return "";
        },
        primitive: function(value) {
          return value;
        }
      };

      CSV.prototype.encode = function(callback) {
        if (this.mode != "encode") return;

        if (this.data.length == 0) return "";

        var data = this.data,
          options = this.options,
          header = options.header,
          sample = data[0],
          serialize = this.serialize,
          offset = 0,
          attributes,
          response;

        if (!callback) {
          response = Array(data.length);
          callback = function(record, index) {
            response[index + offset] = record;
          };
        }

        function serializeLine(record) {
          return record.join(options.cellDelimiter);
        }

        if (header) {
          if (!isArray(header)) {
            attributes = Object.keys(sample);
            header = attributes;
          }
          callback(serializeLine(serialize.array(header)), 0);
          offset = 1;
        }

        var recordType = serializeType(sample),
          map;

        if (recordType == "array") {
          if (isArray(options.cast)) {
            map = Array(options.cast.length);
            forEach(options.cast, function(type, index) {
              if (isString(type)) {
                map[index] = type.toLowerCase();
              } else {
                map[index] = type;
                serialize[type] = type;
              }
            });
          } else {
            map = Array(sample.length);
            forEach(sample, function(value, index) {
              map[index] = serializeType(value);
            });
          }
          forEach(data, function(record, recordIndex) {
            var serializedRecord = Array(map.length);
            forEach(record, function(value, valueIndex) {
              serializedRecord[valueIndex] = serialize[map[valueIndex]](value);
            });
            callback(serializeLine(serializedRecord), recordIndex);
          });
        } else if (recordType == "object") {
          attributes = Object.keys(sample);
          if (isArray(options.cast)) {
            map = Array(options.cast.length);
            forEach(options.cast, function(type, index) {
              if (isString(type)) {
                map[index] = type.toLowerCase();
              } else {
                map[index] = type;
                serialize[type] = type;
              }
            });
          } else {
            map = Array(attributes.length);
            forEach(attributes, function(attr, index) {
              map[index] = serializeType(sample[attr]);
            });
          }
          forEach(data, function(record, recordIndex) {
            var serializedRecord = Array(attributes.length);
            forEach(attributes, function(attr, attrIndex) {
              serializedRecord[attrIndex] = serialize[map[attrIndex]](
                record[attr]
              );
            });
            callback(serializeLine(serializedRecord), recordIndex);
          });
        }

        if (response) {
          return response.join(options.lineDelimiter);
        } else {
          return this;
        }
      };

      CSV.prototype.forEach = function(callback) {
        return this[this.mode](callback);
      };

      return CSV;
    })();

    CSV.parse = function(data, options) {
      return new CSV(data, options).parse();
    };

    CSV.encode = function(data, options) {
      return new CSV(data, options).encode();
    };

    CSV.forEach = function(data, options, callback) {
      if (arguments.length == 2) {
        callback = options;
      }
      return new CSV(data, options).forEach(callback);
    };

    return CSV;
  })();

  function has(browser) {
    const ua = navigator.userAgent;
    if (browser === "ie") {
      const isIE = ua.indexOf("compatible") > -1 && ua.indexOf("MSIE") > -1;
      if (isIE) {
        const reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(ua);
        return parseFloat(RegExp["$1"]);
      } else {
        return false;
      }
    } else {
      return ua.indexOf(browser) > -1;
    }
  }

  function isIE11() {
    let iev = 0;
    const ieold = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
    const trident = !!navigator.userAgent.match(/Trident\/7.0/);
    const rv = navigator.userAgent.indexOf("rv:11.0");

    if (ieold) {
      iev = Number(RegExp.$1);
    }
    if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
      iev = 10;
    }
    if (trident && rv !== -1) {
      iev = 11;
    }

    return iev === 11;
  }

  function isEdge() {
    return /Edge/.test(navigator.userAgent);
  }

  function getDownloadUrl(text, mime = CSV_MIME_TYPE) {
    const BOM = "\uFEFF";
    // Add BOM to text for open in excel correctly
    if (_window.Blob && _window.URL && _window.URL.createObjectURL) {
      const data = new Blob([BOM + text], {
        type: mime
      });
      return URL.createObjectURL(data);
    } else {
      const type = mime.slice(mime.lastIndexOf("/"));
      return (
        `data:attachment${type};charset=utf-8,` + BOM + encodeURIComponent(text)
      );
    }
  }

  function download(filename, text, mime = CSV_MIME_TYPE) {
    if (has("ie") && has("ie") < 10) {
      // has module unable identify ie11 and Edge
      const oWin = _window.top.open("about:blank", "_blank");
      oWin.document.charset = "utf-8";
      oWin.document.write(text);
      oWin.document.close();
      oWin.document.execCommand("SaveAs", filename);
      oWin.close();
    } else if (has("ie") === 10 || isIE11() || isEdge()) {
      const BOM = "\uFEFF";
      const data = new Blob([BOM + text], {
        type: mime
      });
      navigator.msSaveBlob(data, filename);
    } else {
      const link = _document.createElement("a");
      link.download = filename;
      link.href = getDownloadUrl(text, mime);
      _document.body.appendChild(link);
      link.click();
      _document.body.removeChild(link);
    }
  }

  function exportCsv(data, options = {}, filename = "download.csv") {
    return download(filename, new CSV(data, options).encode());
  }

  function parseCsv(text, options = {}) {
    return new CSV(text, options).parse();
  }

  exports.download = download;
  exports.CSV = CSV;
  exports.exportCsv = exportCsv;
  exports.parseCsv = parseCsv;

  // Object.defineProperty(exports, "__esModule", { value: true });
});
