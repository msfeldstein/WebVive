var EventEmitter = require('eventemitter3');

THREE.ViveController = function ( id ) {

	THREE.Object3D.call( this );

  this.Events = new EventEmitter()
  this.Events.PadTouched = "PadTouched"
  this.Events.PadUntouched = "PadUntouched"
  this.Events.TriggerClicked = "TriggerClicked"
  this.Events.TriggerUnclicked = "TriggerUnclicked"
  this.Events.MenuClicked = "MenuClicked"
  this.Events.MenuUnclicked = "MenuUnclicked"

	this.matrixAutoUpdate = false;
	this.standingMatrix = new THREE.Matrix4();

  this.onPadTouched = new EventEmitter()
  this.onPadUntouched = new EventEmitter()
  this.onTriggerClicked = new EventEmitter()
  this.onTriggerUnclicked = new EventEmitter()

  this.padTouched = false
	var scope = this;

	function update() {

		requestAnimationFrame( update );

		var gamepad = navigator.getGamepads()[ id ];

		if ( gamepad !== undefined && gamepad.pose !== null ) {

			var pose = gamepad.pose;

			scope.position.fromArray( pose.position );
			scope.quaternion.fromArray( pose.orientation );
			scope.matrix.compose( scope.position, scope.quaternion, scope.scale );
			scope.matrix.multiplyMatrices( scope.standingMatrix, scope.matrix );
			scope.matrixWorldNeedsUpdate = true;

			scope.visible = true;
      var wasTouched = scope.padTouched
      scope.padTouched = gamepad.buttons[0].touched
      if (scope.padTouched && !wasTouched) {
        scope.Events.emit(scope.Events.PadTouched)
      }

      if (!scope.padTouched && wasTouched) {
        scope.Events.emit(scope.Events.PadUntouched)
      }

      var wasTriggerClicked = scope.triggerClicked
      scope.triggerClicked = gamepad.buttons[1].value == 1
      if (!wasTriggerClicked && scope.triggerClicked) {
        scope.Events.emit(scope.Events.TriggerClicked)
      }
      if (wasTriggerClicked && !scope.triggerClicked) {
        scope.Events.emit(scope.Events.TriggerUnclicked)
      }

      var wasMenuClicked = scope.menuClicked
      scope.menuClicked = gamepad.buttons[2].pressed
      if (!wasMenuClicked && scope.menuClicked) {
        scope.Events.emit(scope.Events.MenuClicked)
      }

      scope.padX = gamepad.axes[0]
      scope.padY = gamepad.axes[1]

      scope.triggerLevel = gamepad.buttons[1].value



		} else {

			scope.visible = false;

		}

	}

	update();

};

THREE.ViveController.prototype = Object.create( THREE.Object3D.prototype );
THREE.ViveController.prototype.constructor = THREE.ViveController;
