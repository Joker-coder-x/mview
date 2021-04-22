const canvasMap={};

class CanvasManagerPool{
    set(canvasId,canvas){
        if(!canvasMap.has(canvasId)&&canvas instanceof HTMLCanvasElement){
            canvasMap.set(canvasId,canvas);
        }
    }

    delete(canvasId){
        canvasMap.delete(canvasId);
    }

    getCanvas(canvasId){
      const canvas= canvasMap.get(canvasId);
      return canvas===undefined?null:canvas;
    }

    getCanvasContext(canvasId){
        const canvas=this.getCanvas(canvasId);
       
        return canvas?canvas.getContext('2d'):null;
    }

    size(){
        return canvasMap.size;
    }

    clear(){
        return canvasMap.clear();
    }


}

export default new CanvasManagerPool();