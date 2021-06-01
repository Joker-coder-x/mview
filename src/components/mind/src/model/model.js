class MindModel {
  constructor(options) {
    this.centralNode = options.centralNode;
    this.otherNode = options.otherNode;

    this.$nodes = new Map();
  }
}

export default MindModel;