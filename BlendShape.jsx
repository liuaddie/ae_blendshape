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
      res = "group{orientation:'column',\
              a1: Group{orientation:'row',\
                addBlendShape: Button{text:'Add BlendShape'},\
              },\
            }";

      mainPanel.grp = mainPanel.add(res);

      //Button Appearant
      mainPanel.grp.a1.addBlendShape.size = [200, 25];

      //Button Trigger
      mainPanel.grp.a1.addBlendShape.onClick = function() {
        if (app.project.activeItem == undefined || app.project.activeItem == null || app.project.activeItem.selectedLayers.length !== 1 || app.project.activeItem.selectedLayers[0].matchName !== "ADBE Vector Layer") {
          alert("Select a shape layer");
        } else {
          addBlendShape(app.project.activeItem);
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
  alert("addBlendShape")
}
