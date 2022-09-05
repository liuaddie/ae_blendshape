{
	"shapeInfoClass":function(path, step){
		this.path = path;
		this.step = step;
		var pa = this.path;
		var pp = this.path.points(0);
		var ppSum = [0,0];
		var step = this.step;
		var tar = 0;
		var tarOnPath = 0;
		var minDist = 0;
		var minDistNew = 0;
		var ppMax = [0,0];
		var ppMin = [0,0];
		for (i=0; i<step; i++){
			ppOnPath = pa.pointOnPath(i/step,0);
			dist = length(pp[tar], ppOnPath);
			if (i == 0){
				minDist = dist;
				ppSum = pa.pointOnPath(0,0);
				ppMax = pa.pointOnPath(0,0);
				ppMin = pa.pointOnPath(0,0);
			}
			ppSum += ppOnPath;
			minDistNew = Math.min(minDist, dist);
			ppMin = [Math.min(ppMin[0], ppOnPath[0]), Math.min(ppMin[1], ppOnPath[1])];
			ppMax = [Math.max(ppMax[0], ppOnPath[0]), Math.max(ppMax[1], ppOnPath[1])];
			if (minDistNew !== minDist){
				minDist = minDistNew;
				tarOnPath = i/step;
			}
		}
		this.pos = pa.pointOnPath(tarOnPath,0);
		this.ptCenter = ppSum/step;
		this.ptMin = ppMin;
		this.ptMax = ppMax;
	},

	"findPoint":function(TargetPath, TargetPoint){
		var pa = TargetPath;
		var pp = pa.points(0);
		var ppSum = [0,0];
		var step = 100;
		var tar = TargetPoint;
		var tarOnPath = 0;
		var minDist = 0;
		var minDistNew = 0;
		var ppMax = [0,0];
		var ppMin = [0,0];
		for (i=0; i<step; i++){
			ppOnPath = pa.pointOnPath(i/step,0);
			dist = length(pp[tar], ppOnPath);
			if (i == 0){
				minDist = dist;
				ppSum = pa.pointOnPath(0,0);
				ppMax = pa.pointOnPath(0,0);
				ppMin = pa.pointOnPath(0,0);
			}
			ppSum += ppOnPath;
			minDistNew = Math.min(minDist, dist);
			ppMin = [Math.min(ppMin[0], ppOnPath[0]), Math.min(ppMin[1], ppOnPath[1])];
			ppMax = [Math.max(ppMax[0], ppOnPath[0]), Math.max(ppMax[1], ppOnPath[1])];
			if (minDistNew !== minDist){
				minDist = minDistNew;
				tarOnPath = i/step;
			}
		}
			// return pa.pointOnPath(tarOnPath,0);
			// return ppSum/step;
			return ppMax;
		}

}
