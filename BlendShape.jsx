// ********** ********** Copyright ********** **********
// © 2022 Addie Liu (liuaddie@gmail.com)
// GNU Lesser General Public License (LGPL) v3.0
// ********** ********** Copyright ********** **********

// ********** ********** Readme ********** **********
// This is main jsx
// This version only support same number of points in all paths
// ********** ********** Readme ********** **********

{
  function blendshape(thisObj) {
    function blenshape_ui(thisObj) {
      var mainPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "BlendShape", undefined, {
        resizable: true,
        closeButton: false
      });
      res = "panel{orientation:'column',\
              a1: Group{orientation:'row',\
                addBlendShape: Button{text:'Add BlendShape'},\
              },\
              a2: Group{orientation:'row',\
                verText: StaticText{text:'v0.0.2-nightly', alignment:'right'},\
              },\
            }";

      mainPanel.grp = mainPanel.add(res);

      //Button Appearant
      mainPanel.grp.a2.alignment = ['right','top'];
      mainPanel.grp.a2.verText.graphics.foregroundColor = mainPanel.grp.a2.verText.graphics.newPen (mainPanel.grp.a2.verText.graphics.PenType.SOLID_COLOR, [0.72, 0.43, 0.18], 1);

      //Button Trigger
      mainPanel.grp.a1.addBlendShape.onClick = function() {
        if (app.project.activeItem == undefined || app.project.activeItem == null || app.project.activeItem.selectedLayers.length !== 1 || app.project.activeItem.selectedLayers[0].matchName !== "ADBE Vector Layer") {
          alert("Select a shape layer");
        } else {
          app.beginUndoGroup("addBlendShape");
          addBlendShape(app.project.activeItem.selectedLayers[0]);
          app.endUndoGroup();
        }
      }

      mainPanel.layout.layout(true);
      return mainPanel;
    }
    var blendshapePal = blenshape_ui(thisObj);
    if (blendshapePal != null && blendshapePal instanceof Window) {
      blendshapePal.center();
      blendshapePal.show();
    }
  }
  blendshape(this);
}

function addBlendShape(bsLayer) {
  var allShapes = [];
  var allShapesName = [];
  var exp = "var emoPath = [";

  // Find all Shapes
  for (i = 1; i <= bsLayer.property("Contents").numProperties; i++) {
    if (bsLayer.property("Contents").property(i).matchName == "ADBE Vector Group") {
      allShapes.push(bsLayer.property("Contents").property(i));
      bsLayer.property("Contents").property(i).enabled = false; // hide the orginal shapes
      allShapesName.push(bsLayer.property("Contents").property(i).name);
      exp += "content('" + bsLayer.property("Contents").property(i).name + "').content('";
      exp += bsLayer.property("Contents").property(i).property("Contents").property(1).name + "').path";
      exp += (i !== bsLayer.property("Contents").numProperties) ? "," : "";
    }
  }
  exp += "];"
  // BlendShape need at least 2 shapes
  if (allShapes.length >= 2) {
    // Expression for add to the BlendShape path, see [_expression_before_obfuscation.jsx]
    exp += 'var emo=effect("BlendShape")("Menu"),emoDur=effect("BlendShape Duration")("Slider"),pTime=0;function findPrevKey(e,p){if(!(e.numKeys>1))return 0;for(i=2;i<=e.numKeys;i++)if(i!=e.numKeys){if(time>=e.key(i).time&&time<e.key(i+1).time)return i}else if(e.key(i).time<=time)return i}function pathTransit(e,p,t,r){for(p1=p[e.key(r-1).value-1],p2=p[e.key(r).value-1],progress=(time-e.key(r).time)/framesToTime(t.valueAtTime(e.key(i).time)),progress=progress<1?progress:1,r1=1-progress,r2=progress,p_num=0,pp=[],pi=[],po=[],p1.points(pTime).length==p2.points(pTime).length&&(p_num=p1.points(pTime).length),i=0;i<p_num;i++)ppNew=p1.points(pTime)[i]*r1+p2.points(pTime)[i]*r2,pp.push(ppNew),piNew=p1.inTangents(pTime)[i]*r1+p2.inTangents(pTime)[i]*r2,pi.push(piNew),poNew=p1.outTangents(pTime)[i]*r1+p2.outTangents(pTime)[i]*r2,po.push(poNew);return po}var prevKey=findPrevKey(emo,emoDur);if(prevKey>0){var pp,pi,po=pathTransit(emo,emoPath,emoDur,prevKey);createPath(pp,pi,po,1)}else createPath(emoPath[emo.valueAtTime(0)-1].points(0),emoPath[emo.valueAtTime(0)-1].inTangents(0),emoPath[emo.valueAtTime(0)-1].outTangents(0),1);';

    // Add a BlendShape
    var bsGroup = bsLayer.property("Contents").addProperty("ADBE Vector Group");
    bsGroup.name = "BlendShape";
    var bsPath = bsGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
    bsPath.path.expression = exp;
    var bsFill = bsGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    bsGroup.moveTo(1);

    // Add Dropdown Controller - for keying BlendShape
    var bsDropdown = bsLayer.property("Effects").addProperty("ADBE Dropdown Control");
    var bsDropdownItems = bsDropdown.property(1).setPropertyParameters(allShapesName);
    bsDropdownItems.propertyGroup(1).name = "BlendShape";
    var bsDropdownKey = bsDropdownItems.propertyGroup(1).property("Menu").addKey(0);

    // Add Slider Controller - for keying Duration
    var bsDuration = bsLayer.property("Effects").addProperty("ADBE Slider Control");
    bsDuration.name = "BlendShape Duration";
    var bsDurationKey = bsDuration.property("Slider").addKey(0);
    bsDuration.property("Slider").setValueAtKey(bsDurationKey, 10);
    bsDuration.property("Slider").setInterpolationTypeAtKey(bsDurationKey, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD);

  } else {
    alert("Create at least 2 shapes");
  }

}
