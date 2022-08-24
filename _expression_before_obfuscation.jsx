// ********** ********** Copyright ********** **********
// © 2022 Addie Liu (liuaddie@gmail.com)
// GNU Lesser General Public License (LGPL) v3.0
// ********** ********** Copyright ********** **********

// ********** ********** Readme ********** **********
// This is not a jsx, but the expression backup for the main jsx
// This version only support same number of points in all paths
// ********** ********** Readme ********** **********

// below emoPath is dummy, will create a real emoPath in the main jsx
var emoPath = [
	content("Shape 3").content("Path 1").path,
	content("Shape 2").content("Path 1").path,
	content("Shape 1").content("Path 1").path
];

// obfuscation below code and copy to main jsx
var emo = effect("BlendShape")("Menu");
var emoDur = effect("BlendShape Duration")("Slider");
const pTime = 0;

// find previous key index in the Drop Down Menu
// if not enough 2 keys, cannot do transition, so return 0
function findPrevKey(prop, dur) {
	if (prop.numKeys > 1) {
		for (i = 2; i <= prop.numKeys; i++) {
			if (i != prop.numKeys) {
				if (time >= prop.key(i).time && time < prop.key(i + 1).time) {
					return i;
				}
			} else if (prop.key(i).time <= time) {
				return i;
			}
		}
	} else {
		return 0;
	}
}

// use duration to calculate the shape
// return points, in & out tangents
function pathTransit(prop, paths, dur, pk) {
	p1 = paths[prop.key(pk - 1).value - 1];
	p2 = paths[prop.key(pk).value - 1];
	progress = (time - prop.key(pk).time) / framesToTime(dur.valueAtTime(prop.key(i).time));
	progress = progress < 1 ? progress : 1;
	r1 = 1 - progress;
	r2 = progress;
	p_num = 0;
	pp = [];
	pi = [];
	po = [];
	if (p1.points(pTime).length == p2.points(pTime).length) {
		p_num = p1.points(pTime).length;
	}
	for (i = 0; i < p_num; i++) {
		ppNew = p1.points(pTime)[i] * r1 + p2.points(pTime)[i] * r2;
		pp.push(ppNew);
		piNew = p1.inTangents(pTime)[i] * r1 + p2.inTangents(pTime)[i] * r2;
		pi.push(piNew);
		poNew = p1.outTangents(pTime)[i] * r1 + p2.outTangents(pTime)[i] * r2;
		po.push(poNew);
	}
	return pp, pi, po;
}

// main
var prevKey = findPrevKey(emo, emoDur);
if (prevKey > 0) {
	var pp, pi, po = pathTransit(emo, emoPath, emoDur, prevKey);
	createPath(pp, pi, po, 1);
} else {
	createPath(emoPath[emo.valueAtTime(0)-1].points(0), emoPath[emo.valueAtTime(0)-1].inTangents(0), emoPath[emo.valueAtTime(0)-1].outTangents(0), 1);
}
