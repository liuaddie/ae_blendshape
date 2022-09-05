{
	"shapeObj":function(TargetPath, TargetTime,  TargetStep){
		TargetTime = (typeof TargetTime !== 'undefined') ?  TargetTime : 0;
		TargetStep = (typeof TargetStep !== 'undefined') ?  TargetStep : 60;
		var pa = TargetPath;
		var tt = TargetTime;
		var step = TargetStep;
		var pp = TargetPath.points(tt);
		var ppSum = [0,0];
		var ppMax = [0,0];
		var ppMin = [0,0];
		var pt = []; // all points
		var ptOnPath = []; // pointOnPath percentage, accuracy depends on steps
		var ptDist = []; // internal use
		var ptMinDist = []; // internal use
		var ptMinDistNew = []; // internal use

		//intial pointOnPath percentage of all points to zero
		for (k=0; k<pp.length; k++){
			pt.push(pa.points(tt)[k]);
			ptOnPath.push(0);
			ptDist.push(0);
			ptMinDist.push(0);
			ptMinDistNew.push(0);
		}

		// check following items for each steps:
		// pointOnPath Percentage, Real Shape Center, Shape Min & Max points
		for (i=0; i<step; i++){
			ppOnPath = pa.pointOnPath(i/step,tt);

			// pointOnPath percentage
			for (j=0; j<pp.length; j++){
				ptDist[j] = length(pt[j], ppOnPath);
				ptMinDist[j] = (i==0) ? ptDist[j] : ptMinDist[j];
				ptMinDistNew[j] = Math.min(ptMinDist[j], ptDist[j]);
				if (ptMinDistNew[j] !== ptMinDist[j]){
					ptMinDist[j] = ptMinDistNew[j];
					ptOnPath[j] = i/step;
				}
			}

			// Center, Min & Max
			if (i == 0){
				ppSum = pa.pointOnPath(0,tt);
				ppMax = pa.pointOnPath(0,tt);
				ppMin = pa.pointOnPath(0,tt);
			}
			ppSum += ppOnPath;
			ppMin = [Math.min(ppMin[0], ppOnPath[0]), Math.min(ppMin[1], ppOnPath[1])];
			ppMax = [Math.max(ppMax[0], ppOnPath[0]), Math.max(ppMax[1], ppOnPath[1])];
		}

		// Return for object properties
		this.shape = TargetPath.valueAtTime(TargetTime); // Shape of TargetTime
		this.pt = pt; // Array, All points
		this.ptOnPath = ptOnPath; // Array, pointOnPath Percentage of all points
		this.ptCenter = ppSum/step; // Position, Real Shape Center
		this.ptMin = ppMin; // Position, Shape Min Point
		this.ptMax = ppMax; // Position, Shape Max Point
	} // End of shapeObj

} // End of JSON
