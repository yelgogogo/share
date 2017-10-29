var drawControllers = angular.module('drawControllers', []);

drawControllers.controller('drawCtrl', function($scope, drawService){

    $scope.objectValue = drawService.getObject();
    
    $scope.setWidth = function(newValue) {
        $scope.objectValue.width = newValue;
        drawService.setWidth(newValue);
    };

    $scope.setCount = function(newValue) {
        $scope.objectValue.count = newValue;
        drawService.setCount(newValue);
    };
    
    $scope.setMessage = function() {
      var msg;
      with (paper) {
        msg = paper.project.activeLayer.children;
      }
      drawService.setMessage(msg);
      $scope.objectValue.message = msg;
    };
    
    $scope.addShape = function() {
      with (paper) {
        var shape = new Shape.Circle(new Point(Math.random()*200, Math.random()*200), Math.random()*200);
        shape.strokeColor = 'black';
      }
    };

});

drawControllers.directive('drawingBoard',['drawService',function(drawService){

	function link(scope, element, attrs){

    // setup Paper
    
		var canvas = element[0];

		if ( scope.objectValue.count < 1){

  		paper = new paper.PaperScope();
  		paper.setup(canvas);
  		scope.setCount( scope.objectValue.count + 1 );

  		with (paper) {
				var firstBox = {
					idx: 1,
					name: 'firstBox',
					isSelected: false,
					x: 30,
					y: 250,
					width: 50,
					color: 'yellow',
					colorSelected: 'blue',
					height: 100,
					margin: 20,
					slotHeight: 70
				} 
				var arrowHieght = 50
				var arrow2Hieght = 30

				var connections = [];
				var connectionsCount = 7;
				var connecntionHeight = 2
				var connectionsColors = ['red','orange','yellow','green','cyan','blue','purple']
			
				for (var i=0;i < connectionsCount ; i++) {
					var item = {
						x: firstBox.x + firstBox.width + firstBox.margin,
						y: firstBox.y + firstBox.slotHeight,
						width: 200,
						color: connectionsColors[i],
						colorSelected: connectionsColors[i],
						height: (connectionsCount - i) * connecntionHeight,
						margin: 20
					}
				  connections.push(item)
				}

				var SecondBox = {
					idx:2,
					name: 'SecondBox',
					isSelected: false,
					x: firstBox.x + firstBox.width + connections[0].width + 2 * firstBox.margin,
					y: firstBox.y,
					color: 'red',
					colorSelected: 'green',
					width: firstBox.width,
					height: firstBox.height,
					margin: firstBox.margin,
				}

				var arrows = [
					{
						idx: 1,
						name: 'arrow1',
						strokeColor: 'red',
						isSelected: false,
						strokeColorSelected: 'cyan',
						strokeWidth: 5,
						strokeWidthSelected: 8,
						pointData: [
							new Point(firstBox.x + firstBox.margin, firstBox.y - firstBox.margin), 
							new Point(firstBox.x + firstBox.margin , firstBox.y - firstBox.margin - arrowHieght), 
							new Point(SecondBox.x + SecondBox.width - SecondBox.margin , SecondBox.y - SecondBox.margin - arrowHieght) ,
							new Point(SecondBox.x + SecondBox.width - SecondBox.margin, SecondBox.y - SecondBox.margin)
						]
					},
					{
						idx: 2,
						strokeColor: 'green',
						name: 'arrow2',
						isSelected: false,
						strokeColorSelected: 'cyan',
						strokeWidth: 5,
						strokeWidthSelected: 8,
						pointData: [
							new Point(firstBox.x + firstBox.width - firstBox.margin, firstBox.y - firstBox.margin), 
							new Point(firstBox.x + firstBox.width - firstBox.margin , firstBox.y - firstBox.margin - arrow2Hieght), 
							new Point(SecondBox.x + SecondBox.margin , SecondBox.y - SecondBox.margin - arrow2Hieght) ,
							new Point(SecondBox.x + SecondBox.margin, SecondBox.y - SecondBox.margin)
						]

					}]

				console.log(firstBox, SecondBox)
				function deepCopy (object) {
					return JSON.parse(JSON.stringify(object))
				}

				var boxArray = [];
				var arrowsArray = [];
				function generateRectangle (box) {
					var boxStartPoint = new Point(box.x, box.y)
					var boxEndPoint = new Point(box.x + box.width, box.y + box.height)
					var rectangle = new Rectangle(box.x, box.y, box.width, box.height);
					var path = new Path.Rectangle(rectangle);
					path.name = box.name;
					path.idx = box.idx;
					path.isSelected = box.isSelected;
					path.fillColor = box.color;
					path.onClick = function (event) {
						
						path.fillColor = box.colorSelected;
						console.log( box.name + (path.isSelected ? ' selected!' : ' deselected!'));
						path.isSelected = !path.isSelected;
						path.fillColor = path.isSelected ? box.colorSelected : box.color;
					}
					boxArray.push(path);
				}

				// generateRectangle(connection);
				generateRectangle(firstBox);
				generateRectangle(SecondBox);
				connections.forEach(function(c) {
						generateRectangle (c)
					}
				)

				arrows.forEach(function(c) {
						generateArrows (c)
					}
				)

				function generateArrows (arrow) {
					var arrowPath = new Path();
					arrow.pointData.forEach(function(c) {
						arrowPath.strokeColor = arrow.strokeColor;
						arrowPath.strokeWidth = arrow.strokeWidth;
						arrowPath.add(c);
					})
					console.log(arrowPath)
					arrowPath.name = arrow.name;
					arrowPath.isSelected = arrow.isSelected;
					arrowPath.idx = arrow.idx;
					arrowPath.onClick = function (event) {
						
						arrowPath.isSelected = !arrowPath.isSelected;
						console.log(arrowPath.name + (arrowPath.isSelected ? ' selected!' : ' deselected!'));
						arrowPath.strokeColor = arrowPath.isSelected ? arrow.strokeColorSelected : arrow.strokeColor;
						arrowPath.strokeWidth = arrowPath.isSelected ? arrow.strokeWidthSelected : arrow.strokeWidth;
					}
					console.log(arrowPath)
					arrowsArray.push(arrowPath);
				}
  
  			paper.view.draw();
  
  		}
		
	  } else {
	    
	    scope.setMessage();
	    
	  }

	}

	return {
		link: link
	}

}]);

drawControllers.directive('drawingBoard2',['drawService',function(drawService){

	function link(scope, element, attrs){

    // setup Paper
    
		var canvas = element[0];

  		paper = new paper.PaperScope();
  		paper.setup(canvas);
  		scope.setCount( scope.objectValue.count + 1 );

		with (paper) {
				
			var shape = new Shape.Circle(new Point(200, 200), 200);
        shape.strokeColor = 'black';
        shape.fillColor = 'pink';

      // Display data in canvas
			var text = new PointText(new Point(20, 20));
				text.justification = 'left';
				text.fillColor = 'black';

			var text2 = new PointText(new Point(200, 200));
				text2.justification = 'center';
				text2.fillColor = 'black';
				text2.content = 'click to change size';

      shape.onClick = function(event) {
          this.fillColor = 'red';
          scope.$apply(function () {
            scope.setWidth(Math.round((Math.random()*100)+100));
          });
      }

    	view.onFrame = function(event) {

    		if ( text.position.y > 440 ){
    		  text.position.y = -40;
    		} else {
    		  text.position.y = text.position.y + 3;
    		}

				text.content = 'Shape width: ' + scope.objectValue.width;

        shape.radius = scope.objectValue.width;

        scope.$apply(function () {
          scope.setMessage();          
        });

    	}

			paper.view.draw();

		}

	}

	return {
		link: link
	}

}]);



angular.module('drawControllers').component('myComponent', {
//templateUrl: './heroDetail.html',
	template: '<h1>Hello {{$ctrl}} </h1>',
	bindings: { 
		firstName: '<', 
		lastName: '<' ,
		scope: '<' 
	},
	controller: function() {
		this.getFullName = function() {
			return this.firstName + ' ' + this.lastName;
		};
	}
});