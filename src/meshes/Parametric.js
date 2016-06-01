import THREE from 'three';
import Physijs from 'whitestormjs-physijs';

class Parametric extends WHS.Shape {
  constructor(params = {}) {
    super(params, 'parametric');

    WHS.API.extend(params.geometry, {

      func() {},
      slices: 10,
      stacks: 10

    });

    this.build(params);

    super.wrap();
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConcaveMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        new THREE.ParametricGeometry(

          params.geometry.func,
          params.geometry.slices,
          params.geometry.stacks

        ),

        material,
        params.mass
      ));

      resolve();
    });
  }

  /**
   * Clone parametric.
   */
  clone() {
    return new WHS.Parametric(this.getParams(), this._type).copy(this);
  }
}

export {
  Parametric as default
};