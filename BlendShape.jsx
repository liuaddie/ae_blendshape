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
                verText: StaticText{text:'v0.0.1-nightly', alignment:'right'},\
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

  // BlendShape need at least 2 shapes
  if (allShapes.length >= 2) {
    // Expression for add to the BlendShape path, see [_expression_before_obfuscation.jsx]
    exp += "];var _0x1c77be=_0x12e7;(function(_0x158f2a,_0x3c7f68){var _0x1cf4c3=_0x12e7,_0x7615b5=_0x158f2a();while(!![]){try{var _0x545250=parseInt(_0x1cf4c3(0x19f))/(-0x1c73+0x1b*-0xd4+0x32d0)*(parseInt(_0x1cf4c3(0x192))/(-0x91d+-0xb1*-0x6+-0x4f9*-0x1))+-parseInt(_0x1cf4c3(0x1b6))/(0xb*-0x30d+0x162e+0x1*0xb64)*(parseInt(_0x1cf4c3(0x19d))/(0xc8*0x17+0x10*-0xc+-0x1134))+-parseInt(_0x1cf4c3(0x18f))/(0x3fa*-0x7+-0x3*-0x7fb+-0x14e*-0x3)*(-parseInt(_0x1cf4c3(0x1a6))/(0x3*-0x941+-0x1*0x1d95+0x395e))+-parseInt(_0x1cf4c3(0x1ac))/(-0x660+0x9c1*-0x2+0x19e9)+parseInt(_0x1cf4c3(0x19e))/(-0xd1f*0x1+0x9*-0x3d1+0x2f80)*(parseInt(_0x1cf4c3(0x1a7))/(0xec7+0x960+-0x181e))+-parseInt(_0x1cf4c3(0x1b7))/(0x306+-0x1aaf+-0x17b3*-0x1)*(parseInt(_0x1cf4c3(0x188))/(0x17*0x17b+0x2017*-0x1+0x1eb*-0x1))+parseInt(_0x1cf4c3(0x19b))/(0x61*-0x26+0x599*0x4+0x3*-0x2a6)*(-parseInt(_0x1cf4c3(0x1b4))/(0x34*-0xb5+-0x19c3+-0xb4*-0x59));if(_0x545250===_0x3c7f68)break;else _0x7615b5['push'](_0x7615b5['shift']());}catch(_0x5ef7b0){_0x7615b5['push'](_0x7615b5['shift']());}}}(_0x31f5,0xfbf*-0xc5+0xedfe7+0x1*0x96a5b));var emo=effect(_0x1c77be(0x1a8))(_0x1c77be(0x1b0)),emoDur=effect(_0x1c77be(0x1a8)+_0x1c77be(0x1ae))(_0x1c77be(0x18d));const pTime=-0x1919+0x249a*0x1+-0xb81*0x1;function _0x12e7(_0x18fcd2,_0x5c2adf){var _0x566890=_0x31f5();return _0x12e7=function(_0x7472b,_0x439fcd){_0x7472b=_0x7472b-(-0xbf*0x1b+-0x1*-0x1bff+-0x653);var _0x45fbf9=_0x566890[_0x7472b];return _0x45fbf9;},_0x12e7(_0x18fcd2,_0x5c2adf);}function _0x31f5(){var _0x30ea2c=['UmTHN','mXrqK','split','52UGHpBq','points','52473bIYetW','390CmgETK','key','dhGNA','KKObH','valueAtTim','qMbpi','GZPfB','55451pvEWUO','eurRk','numKeys','JmXVR','inTangents','Slider','6|2|1|3|12','3434735vIqCuX','|11|10|9','time','22pWMIwe','wyNAa','vduhB','sEpRN','zWTgJ','value','JAWcv','0|4|1|2|5|','dffig','13812iZQBWb','push','292TPpPRk','8sXcgjP','90564HGFPtr','xDtJy','length','YxfnF','8|7|0|4|5|','xpoab','rOvrX','6rQdxDq','11324403kniwcb','BlendShape','outTangent','kThEG','oCPgF','4659235aWkjWO','HtKOp','\x20Duration','DAgsN','Menu'];_0x31f5=function(){return _0x30ea2c;};return _0x31f5();}function findPrevKey(_0x1a6dcb,_0x42d3b2){var _0x4038c9=_0x1c77be,_0xdee274={'rOvrX':function(_0x451ef7,_0x56c4f1){return _0x451ef7>_0x56c4f1;},'YxfnF':function(_0x207d25,_0xdc261a){return _0x207d25<=_0xdc261a;},'vduhB':function(_0x22c32d,_0x5e6187){return _0x22c32d!=_0x5e6187;},'eurRk':function(_0x453a67,_0x57c4d2){return _0x453a67>=_0x57c4d2;},'dffig':function(_0x5455e1,_0x1b0ba2){return _0x5455e1<_0x1b0ba2;},'KKObH':function(_0x3427db,_0x1a1f43){return _0x3427db+_0x1a1f43;},'xDtJy':function(_0x1497d2,_0x14645e){return _0x1497d2<=_0x14645e;}};if(_0xdee274[_0x4038c9(0x1a5)](_0x1a6dcb[_0x4038c9(0x18a)],-0x3*-0xc9b+0x7e*-0x38+-0x290*0x4))for(i=-0x3a1*0x2+0x11b1*-0x1+0x18f5;_0xdee274[_0x4038c9(0x1a2)](i,_0x1a6dcb[_0x4038c9(0x18a)]);i++){if(_0xdee274[_0x4038c9(0x194)](i,_0x1a6dcb[_0x4038c9(0x18a)])){if(_0xdee274[_0x4038c9(0x189)](time,_0x1a6dcb[_0x4038c9(0x1b8)](i)[_0x4038c9(0x191)])&&_0xdee274[_0x4038c9(0x19a)](time,_0x1a6dcb[_0x4038c9(0x1b8)](_0xdee274[_0x4038c9(0x1ba)](i,-0x1710+0x182b+-0x11a))[_0x4038c9(0x191)]))return i;}else{if(_0xdee274[_0x4038c9(0x1a0)](_0x1a6dcb[_0x4038c9(0x1b8)](i)[_0x4038c9(0x191)],time))return i;}}else return 0x5*-0x4df+0x65+0x17f6;}function pathTransit(_0x1491aa,_0x135489,_0x3e1f18,_0x41897c){var _0x427461=_0x1c77be,_0xb05aa2={'xpoab':_0x427461(0x1a3)+_0x427461(0x18e)+_0x427461(0x190),'DAgsN':function(_0x4a8627,_0x1bbdab){return _0x4a8627/_0x1bbdab;},'HtKOp':function(_0x41699f,_0xee628f){return _0x41699f-_0xee628f;},'oCPgF':function(_0x5bec15,_0x297d65){return _0x5bec15(_0x297d65);},'UmTHN':function(_0x14817f,_0x84bb54){return _0x14817f<_0x84bb54;},'mXrqK':function(_0x2eb4b2,_0x10580c){return _0x2eb4b2-_0x10580c;},'qMbpi':_0x427461(0x199)+'3','JmXVR':function(_0x2b06ed,_0x38fd47){return _0x2b06ed+_0x38fd47;},'wyNAa':function(_0x58e51b,_0xc17f4a){return _0x58e51b*_0xc17f4a;},'dhGNA':function(_0x416816,_0x6c61){return _0x416816*_0x6c61;},'kThEG':function(_0x50d1fb,_0x5d89bd){return _0x50d1fb+_0x5d89bd;},'sEpRN':function(_0x4699f8,_0x2ed277){return _0x4699f8*_0x2ed277;},'GZPfB':function(_0x33336c,_0x138775){return _0x33336c+_0x138775;},'JAWcv':function(_0x3846cd,_0x5b3941){return _0x3846cd*_0x5b3941;},'zWTgJ':function(_0x138c3d,_0x251b6f){return _0x138c3d==_0x251b6f;}},_0x259100=_0xb05aa2[_0x427461(0x1a4)][_0x427461(0x1b3)]('|'),_0xb1f7a4=0x1*0x8ff+-0x13a7+-0x3e*-0x2c;while(!![]){switch(_0x259100[_0xb1f7a4++]){case'0':progress=_0xb05aa2[_0x427461(0x1af)](_0xb05aa2[_0x427461(0x1ad)](time,_0x1491aa[_0x427461(0x1b8)](_0x41897c)[_0x427461(0x191)]),_0xb05aa2[_0x427461(0x1ab)](framesToTime,_0x3e1f18[_0x427461(0x1bb)+'e'](_0x1491aa[_0x427461(0x1b8)](i)[_0x427461(0x191)])));continue;case'1':pp=[];continue;case'2':p_num=-0x14f*0xd+0x1856+-0x753;continue;case'3':pi=[];continue;case'4':progress=_0xb05aa2[_0x427461(0x1b1)](progress,0x2a6+0x16f4+0x1999*-0x1)?progress:0x2*0xbfe+-0x470*-0x1+0x3*-0x979;continue;case'5':r1=_0xb05aa2[_0x427461(0x1ad)](0x47*-0x3d+-0x4a*0x1f+-0x2*-0xcf1,progress);continue;case'6':r2=progress;continue;case'7':p2=_0x135489[_0xb05aa2[_0x427461(0x1ad)](_0x1491aa[_0x427461(0x1b8)](_0x41897c)[_0x427461(0x197)],0x1fe8+-0x8f6+-0x16f1)];continue;case'8':p1=_0x135489[_0xb05aa2[_0x427461(0x1ad)](_0x1491aa[_0x427461(0x1b8)](_0xb05aa2[_0x427461(0x1b2)](_0x41897c,0x157b+-0x140f+0x16b*-0x1))[_0x427461(0x197)],0x1*-0xf2c+-0x1c54+0x2b81)];continue;case'9':return pp,pi,po;case'10':for(i=-0x18de+0x84c+0x1*0x1092;_0xb05aa2[_0x427461(0x1b1)](i,p_num);i++){var _0xa3a1d0=_0xb05aa2[_0x427461(0x1bc)][_0x427461(0x1b3)]('|'),_0x65a8b5=0x1927*0x1+-0xb90+-0x1*0xd97;while(!![]){switch(_0xa3a1d0[_0x65a8b5++]){case'0':ppNew=_0xb05aa2[_0x427461(0x18b)](_0xb05aa2[_0x427461(0x193)](p1[_0x427461(0x1b5)](pTime)[i],r1),_0xb05aa2[_0x427461(0x1b9)](p2[_0x427461(0x1b5)](pTime)[i],r2));continue;case'1':piNew=_0xb05aa2[_0x427461(0x1aa)](_0xb05aa2[_0x427461(0x195)](p1[_0x427461(0x18c)](pTime)[i],r1),_0xb05aa2[_0x427461(0x193)](p2[_0x427461(0x18c)](pTime)[i],r2));continue;case'2':pi[_0x427461(0x19c)](piNew);continue;case'3':po[_0x427461(0x19c)](poNew);continue;case'4':pp[_0x427461(0x19c)](ppNew);continue;case'5':poNew=_0xb05aa2[_0x427461(0x187)](_0xb05aa2[_0x427461(0x193)](p1[_0x427461(0x1a9)+'s'](pTime)[i],r1),_0xb05aa2[_0x427461(0x198)](p2[_0x427461(0x1a9)+'s'](pTime)[i],r2));continue;}break;}}continue;case'11':_0xb05aa2[_0x427461(0x196)](p1[_0x427461(0x1b5)](pTime)[_0x427461(0x1a1)],p2[_0x427461(0x1b5)](pTime)[_0x427461(0x1a1)])&&(p_num=p1[_0x427461(0x1b5)](pTime)[_0x427461(0x1a1)]);continue;case'12':po=[];continue;}break;}}var prevKey=findPrevKey(emo,emoDur);if(prevKey>0x7c8+-0xa66*0x2+-0x341*-0x4){var pp,pi,po=pathTransit(emo,emoPath,emoDur,prevKey);createPath(pp,pi,po,-0x237+-0x1985+0x9*0x315);}else createPath(emoPath[emo[_0x1c77be(0x1bb)+'e'](0xc7f+-0x10*-0x1f6+0x3fd*-0xb)-(0x1f*-0xd3+-0x3*0x354+0x238a)][_0x1c77be(0x1b5)](-0x1b0f+0xc61+0x757*0x2),emoPath[emo[_0x1c77be(0x1bb)+'e'](-0x1a*0x10a+0x6bb+0x1449)-(0xc27+0x8ef*-0x2+-0x4*-0x16e)][_0x1c77be(0x18c)](0x5d0+0x416+-0x9e6),emoPath[emo[_0x1c77be(0x1bb)+'e'](-0x1c0c+-0x1173+0x2d7f)-(-0x1f*-0x12a+-0x125*0x20+0x8b)][_0x1c77be(0x1a9)+'s'](-0x188d+0x105*0x7+0x116a),-0x614*0x2+0x197d+-0xd54);";

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
