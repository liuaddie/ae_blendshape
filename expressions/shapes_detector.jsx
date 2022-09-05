{
	"findPoint":function(TargetPath, TargetPoint){
		var pa = TargetPath;
		var pp = pa.points(0);
		var ppSum = [0,0];
		var step = 10;
		var tar = TargetPoint;
		var tarOnPath = 0;
		var minDist = 0;
		var minDistNew = 0;
		for (i=0; i<step; i++){
			ppOnPath = pa.pointOnPath(i/step,0);
			ppSum += ppOnPath;
			dist = length(pp[tar], ppOnPath);
			if (i == 0){
				minDist = dist;
			}
			minDistNew = Math.min(minDist, dist);
			if (minDistNew !== minDist){
				minDist = minDistNew;
				tarOnPath = i/step;
			}
		}
			return pa.pointOnPath(tarOnPath,0);
		}

}
