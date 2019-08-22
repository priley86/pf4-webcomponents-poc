var CarbonCustomElements = (function (exports) {
  'use strict';

  function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    return Object.freeze(Object.defineProperties(strings, {
      raw: {
        value: Object.freeze(raw)
      }
    }));
  }

  var taggedTemplateLiteral = _taggedTemplateLiteral;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  var iterableToArray = _iterableToArray;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _toArray(arr) {
    return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
  }

  var toArray = _toArray;

  function _toPrimitive(input, hint) {
    if (_typeof_1(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];

    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof_1(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }

    return (hint === "string" ? String : Number)(input);
  }

  var toPrimitive = _toPrimitive;

  function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return _typeof_1(key) === "symbol" ? key : String(key);
  }

  var toPropertyKey = _toPropertyKey;

  function _decorate(decorators, factory, superClass) {
    var r = factory(function initialize(O) {
      _initializeInstanceElements(O, decorated.elements);
    }, superClass);

    var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);

    _initializeClassElements(r.F, decorated.elements);

    return _runClassFinishers(r.F, decorated.finishers);
  }

  function _createElementDescriptor(def) {
    var key = toPropertyKey(def.key);
    var descriptor;

    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false
      };
      Object.defineProperty(def.value, "name", {
        value: _typeof_1(key) === "symbol" ? "" : key,
        configurable: true
      });
    } else if (def.kind === "get") {
      descriptor = {
        get: def.value,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "set") {
      descriptor = {
        set: def.value,
        configurable: true,
        enumerable: false
      };
    } else if (def.kind === "field") {
      descriptor = {
        configurable: true,
        writable: true,
        enumerable: true
      };
    }

    var element = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
      descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;
    return element;
  }

  function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  function _coalesceClassElements(elements) {
    var newElements = [];

    var isSameElement = function isSameElement(other) {
      return other.kind === "method" && other.key === element.key && other.placement === element.placement;
    };

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var other;

      if (element.kind === "method" && (other = newElements.find(isSameElement))) {
        if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
          }

          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
            }

            other.decorators = element.decorators;
          }

          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc) {
    return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
  }

  function _initializeClassElements(F, elements) {
    var proto = F.prototype;
    ["method", "field"].forEach(function (kind) {
      elements.forEach(function (element) {
        var placement = element.placement;

        if (element.kind === kind && (placement === "static" || placement === "prototype")) {
          var receiver = placement === "static" ? F : proto;

          _defineClassElement(receiver, element);
        }
      });
    });
  }

  function _initializeInstanceElements(O, elements) {
    ["method", "field"].forEach(function (kind) {
      elements.forEach(function (element) {
        if (element.kind === kind && element.placement === "own") {
          _defineClassElement(O, element);
        }
      });
    });
  }

  function _defineClassElement(receiver, element) {
    var descriptor = element.descriptor;

    if (element.kind === "field") {
      var initializer = element.initializer;
      descriptor = {
        enumerable: descriptor.enumerable,
        writable: descriptor.writable,
        configurable: descriptor.configurable,
        value: initializer === void 0 ? void 0 : initializer.call(receiver)
      };
    }

    Object.defineProperty(receiver, element.key, descriptor);
  }

  function _decorateClass(elements, decorators) {
    var newElements = [];
    var finishers = [];
    var placements = {
      static: [],
      prototype: [],
      own: []
    };
    elements.forEach(function (element) {
      _addElementPlacement(element, placements);
    });
    elements.forEach(function (element) {
      if (!_hasDecorators(element)) return newElements.push(element);

      var elementFinishersExtras = _decorateElement(element, placements);

      newElements.push(elementFinishersExtras.element);
      newElements.push.apply(newElements, elementFinishersExtras.extras);
      finishers.push.apply(finishers, elementFinishersExtras.finishers);
    });

    if (!decorators) {
      return {
        elements: newElements,
        finishers: finishers
      };
    }

    var result = _decorateConstructor(newElements, decorators);

    finishers.push.apply(finishers, result.finishers);
    result.finishers = finishers;
    return result;
  }

  function _addElementPlacement(element, placements, silent) {
    var keys = placements[element.placement];

    if (!silent && keys.indexOf(element.key) !== -1) {
      throw new TypeError("Duplicated element (" + element.key + ")");
    }

    keys.push(element.key);
  }

  function _decorateElement(element, placements) {
    var extras = [];
    var finishers = [];

    for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
      var keys = placements[element.placement];
      keys.splice(keys.indexOf(element.key), 1);

      var elementObject = _fromElementDescriptor(element);

      var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);

      element = elementFinisherExtras.element;

      _addElementPlacement(element, placements);

      if (elementFinisherExtras.finisher) {
        finishers.push(elementFinisherExtras.finisher);
      }

      var newExtras = elementFinisherExtras.extras;

      if (newExtras) {
        for (var j = 0; j < newExtras.length; j++) {
          _addElementPlacement(newExtras[j], placements);
        }

        extras.push.apply(extras, newExtras);
      }
    }

    return {
      element: element,
      finishers: finishers,
      extras: extras
    };
  }

  function _decorateConstructor(elements, decorators) {
    var finishers = [];

    for (var i = decorators.length - 1; i >= 0; i--) {
      var obj = _fromClassDescriptor(elements);

      var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj);

      if (elementsAndFinisher.finisher !== undefined) {
        finishers.push(elementsAndFinisher.finisher);
      }

      if (elementsAndFinisher.elements !== undefined) {
        elements = elementsAndFinisher.elements;

        for (var j = 0; j < elements.length - 1; j++) {
          for (var k = j + 1; k < elements.length; k++) {
            if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
              throw new TypeError("Duplicated element (" + elements[j].key + ")");
            }
          }
        }
      }
    }

    return {
      elements: elements,
      finishers: finishers
    };
  }

  function _fromElementDescriptor(element) {
    var obj = {
      kind: element.kind,
      key: element.key,
      placement: element.placement,
      descriptor: element.descriptor
    };
    var desc = {
      value: "Descriptor",
      configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    if (element.kind === "field") obj.initializer = element.initializer;
    return obj;
  }

  function _toElementDescriptors(elementObjects) {
    if (elementObjects === undefined) return;
    return toArray(elementObjects).map(function (elementObject) {
      var element = _toElementDescriptor(elementObject);

      _disallowProperty(elementObject, "finisher", "An element descriptor");

      _disallowProperty(elementObject, "extras", "An element descriptor");

      return element;
    });
  }

  function _toElementDescriptor(elementObject) {
    var kind = String(elementObject.kind);

    if (kind !== "method" && kind !== "field") {
      throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
    }

    var key = toPropertyKey(elementObject.key);
    var placement = String(elementObject.placement);

    if (placement !== "static" && placement !== "prototype" && placement !== "own") {
      throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
    }

    var descriptor = elementObject.descriptor;

    _disallowProperty(elementObject, "elements", "An element descriptor");

    var element = {
      kind: kind,
      key: key,
      placement: placement,
      descriptor: Object.assign({}, descriptor)
    };

    if (kind !== "field") {
      _disallowProperty(elementObject, "initializer", "A method descriptor");
    } else {
      _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");

      _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");

      _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");

      element.initializer = elementObject.initializer;
    }

    return element;
  }

  function _toElementFinisherExtras(elementObject) {
    var element = _toElementDescriptor(elementObject);

    var finisher = _optionalCallableProperty(elementObject, "finisher");

    var extras = _toElementDescriptors(elementObject.extras);

    return {
      element: element,
      finisher: finisher,
      extras: extras
    };
  }

  function _fromClassDescriptor(elements) {
    var obj = {
      kind: "class",
      elements: elements.map(_fromElementDescriptor)
    };
    var desc = {
      value: "Descriptor",
      configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);
    return obj;
  }

  function _toClassDescriptor(obj) {
    var kind = String(obj.kind);

    if (kind !== "class") {
      throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
    }

    _disallowProperty(obj, "key", "A class descriptor");

    _disallowProperty(obj, "placement", "A class descriptor");

    _disallowProperty(obj, "descriptor", "A class descriptor");

    _disallowProperty(obj, "initializer", "A class descriptor");

    _disallowProperty(obj, "extras", "A class descriptor");

    var finisher = _optionalCallableProperty(obj, "finisher");

    var elements = _toElementDescriptors(obj.elements);

    return {
      elements: elements,
      finisher: finisher
    };
  }

  function _disallowProperty(obj, name, objectType) {
    if (obj[name] !== undefined) {
      throw new TypeError(objectType + " can't have a ." + name + " property.");
    }
  }

  function _optionalCallableProperty(obj, name) {
    var value = obj[name];

    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }

    return value;
  }

  function _runClassFinishers(constructor, finishers) {
    for (var i = 0; i < finishers.length; i++) {
      var newConstructor = (0, finishers[i])(constructor);

      if (newConstructor !== undefined) {
        if (typeof newConstructor !== "function") {
          throw new TypeError("Finishers must return a constructor.");
        }

        constructor = newConstructor;
      }
    }

    return constructor;
  }

  var decorate = _decorate;

  var classnames = createCommonjsModule(function (module) {
  /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  /* global define */

  (function () {

  	var hasOwn = {}.hasOwnProperty;

  	function classNames () {
  		var classes = [];

  		for (var i = 0; i < arguments.length; i++) {
  			var arg = arguments[i];
  			if (!arg) continue;

  			var argType = typeof arg;

  			if (argType === 'string' || argType === 'number') {
  				classes.push(arg);
  			} else if (Array.isArray(arg) && arg.length) {
  				var inner = classNames.apply(null, arg);
  				if (inner) {
  					classes.push(inner);
  				}
  			} else if (argType === 'object') {
  				for (var key in arg) {
  					if (hasOwn.call(arg, key) && arg[key]) {
  						classes.push(key);
  					}
  				}
  			}
  		}

  		return classes.join(' ');
  	}

  	if ( module.exports) {
  		classNames.default = classNames;
  		module.exports = classNames;
  	} else {
  		window.classNames = classNames;
  	}
  }());
  });

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  var superPropBase = _superPropBase;

  var get = createCommonjsModule(function (module) {
  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      module.exports = _get = Reflect.get;
    } else {
      module.exports = _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  module.exports = _get;
  });

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var directives = new WeakMap();
  var isDirective = function isDirective(o) {
    return typeof o === 'function' && directives.has(o);
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * True if the custom elements polyfill is in use.
   */
  var isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
  /**
   * Removes nodes, starting from `startNode` (inclusive) to `endNode`
   * (exclusive), from `container`.
   */

  var removeNodes = function removeNodes(container, startNode) {
    var endNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var node = startNode;

    while (node !== endNode) {
      var n = node.nextSibling;
      container.removeChild(node);
      node = n;
    }
  };

  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * A sentinel value that signals that a value was handled by a directive and
   * should not be written to the DOM.
   */
  var noChange = {};
  /**
   * A sentinel value that signals a NodePart to fully clear its content.
   */

  var nothing = {};

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }
  }

  var arrayWithoutHoles = _arrayWithoutHoles;

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var nonIterableSpread = _nonIterableSpread;

  function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }

  var toConsumableArray = _toConsumableArray;

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * An expression marker with embedded unique key to avoid collision with
   * possible text in templates.
   */
  var marker = "{{lit-".concat(String(Math.random()).slice(2), "}}");
  /**
   * An expression marker used text-positions, multi-binding attributes, and
   * attributes with markup-like text values.
   */

  var nodeMarker = "<!--".concat(marker, "-->");
  var markerRegex = new RegExp("".concat(marker, "|").concat(nodeMarker));
  /**
   * Suffix appended to all bound attribute names.
   */

  var boundAttributeSuffix = '$lit$';
  /**
   * An updateable Template that tracks the location of dynamic parts.
   */

  var Template = function Template(result, element) {
    var _this = this;

    classCallCheck(this, Template);

    this.parts = [];
    this.element = element;
    var index = -1;
    var partIndex = 0;
    var nodesToRemove = [];

    var _prepareTemplate = function _prepareTemplate(template) {
      var content = template.content; // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
      // null

      var walker = document.createTreeWalker(content, 133
      /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
      , null, false); // Keeps track of the last index associated with a part. We try to delete
      // unnecessary nodes, but we never want to associate two different parts
      // to the same index. They must have a constant node between.

      var lastPartIndex = 0;

      while (walker.nextNode()) {
        index++;
        var node = walker.currentNode;

        if (node.nodeType === 1
        /* Node.ELEMENT_NODE */
        ) {
            if (node.hasAttributes()) {
              var attributes = node.attributes; // Per
              // https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap,
              // attributes are not guaranteed to be returned in document order.
              // In particular, Edge/IE can return them out of order, so we cannot
              // assume a correspondance between part index and attribute index.

              var count = 0;

              for (var i = 0; i < attributes.length; i++) {
                if (attributes[i].value.indexOf(marker) >= 0) {
                  count++;
                }
              }

              while (count-- > 0) {
                // Get the template literal section leading up to the first
                // expression in this attribute
                var stringForPart = result.strings[partIndex]; // Find the attribute name

                var name = lastAttributeNameRegex.exec(stringForPart)[2]; // Find the corresponding attribute
                // All bound attributes have had a suffix added in
                // TemplateResult#getHTML to opt out of special attribute
                // handling. To look up the attribute value we also need to add
                // the suffix.

                var attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                var attributeValue = node.getAttribute(attributeLookupName);
                var strings = attributeValue.split(markerRegex);

                _this.parts.push({
                  type: 'attribute',
                  index: index,
                  name: name,
                  strings: strings
                });

                node.removeAttribute(attributeLookupName);
                partIndex += strings.length - 1;
              }
            }

            if (node.tagName === 'TEMPLATE') {
              _prepareTemplate(node);
            }
          } else if (node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
            var data = node.data;

            if (data.indexOf(marker) >= 0) {
              var parent = node.parentNode;

              var _strings = data.split(markerRegex);

              var lastIndex = _strings.length - 1; // Generate a new text node for each literal section
              // These nodes are also used as the markers for node parts

              for (var _i = 0; _i < lastIndex; _i++) {
                parent.insertBefore(_strings[_i] === '' ? createMarker() : document.createTextNode(_strings[_i]), node);

                _this.parts.push({
                  type: 'node',
                  index: ++index
                });
              } // If there's no text, we must insert a comment to mark our place.
              // Else, we can trust it will stick around after cloning.


              if (_strings[lastIndex] === '') {
                parent.insertBefore(createMarker(), node);
                nodesToRemove.push(node);
              } else {
                node.data = _strings[lastIndex];
              } // We have a part for each match found


              partIndex += lastIndex;
            }
          } else if (node.nodeType === 8
        /* Node.COMMENT_NODE */
        ) {
            if (node.data === marker) {
              var _parent = node.parentNode; // Add a new marker node to be the startNode of the Part if any of
              // the following are true:
              //  * We don't have a previousSibling
              //  * The previousSibling is already the start of a previous part

              if (node.previousSibling === null || index === lastPartIndex) {
                index++;

                _parent.insertBefore(createMarker(), node);
              }

              lastPartIndex = index;

              _this.parts.push({
                type: 'node',
                index: index
              }); // If we don't have a nextSibling, keep this node so we have an end.
              // Else, we can remove it to save future costs.


              if (node.nextSibling === null) {
                node.data = '';
              } else {
                nodesToRemove.push(node);
                index--;
              }

              partIndex++;
            } else {
              var _i2 = -1;

              while ((_i2 = node.data.indexOf(marker, _i2 + 1)) !== -1) {
                // Comment node has a binding marker inside, make an inactive part
                // The binding won't work, but subsequent bindings will
                // TODO (justinfagnani): consider whether it's even worth it to
                // make bindings in comments work
                _this.parts.push({
                  type: 'node',
                  index: -1
                });
              }
            }
          }
      }
    };

    _prepareTemplate(element); // Remove text binding nodes after the walk to not disturb the TreeWalker


    for (var _i3 = 0; _i3 < nodesToRemove.length; _i3++) {
      var n = nodesToRemove[_i3];
      n.parentNode.removeChild(n);
    }
  };
  var isTemplatePartActive = function isTemplatePartActive(part) {
    return part.index !== -1;
  }; // Allows `document.createComment('')` to be renamed for a
  // small manual size-savings.

  var createMarker = function createMarker() {
    return document.createComment('');
  };
  /**
   * This regex extracts the attribute name preceding an attribute-position
   * expression. It does this by matching the syntax allowed for attributes
   * against the string literal directly preceding the expression, assuming that
   * the expression is in an attribute-value position.
   *
   * See attributes in the HTML spec:
   * https://www.w3.org/TR/html5/syntax.html#attributes-0
   *
   * "\0-\x1F\x7F-\x9F" are Unicode control characters
   *
   * " \x09\x0a\x0c\x0d" are HTML space characters:
   * https://www.w3.org/TR/html5/infrastructure.html#space-character
   *
   * So an attribute is:
   *  * The name: any character except a control character, space character, ('),
   *    ("), ">", "=", or "/"
   *  * Followed by zero or more space characters
   *  * Followed by "="
   *  * Followed by zero or more space characters
   *  * Followed by:
   *    * Any character except space, ('), ("), "<", ">", "=", (`), or
   *    * (") then any non-("), or
   *    * (') then any non-(')
   */

  var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

  /**
   * An instance of a `Template` that can be attached to the DOM and updated
   * with new values.
   */

  var TemplateInstance =
  /*#__PURE__*/
  function () {
    function TemplateInstance(template, processor, options) {
      classCallCheck(this, TemplateInstance);

      this._parts = [];
      this.template = template;
      this.processor = processor;
      this.options = options;
    }

    createClass(TemplateInstance, [{
      key: "update",
      value: function update(values) {
        var i = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var part = _step.value;

            if (part !== undefined) {
              part.setValue(values[i]);
            }

            i++;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this._parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _part = _step2.value;

            if (_part !== undefined) {
              _part.commit();
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }, {
      key: "_clone",
      value: function _clone() {
        var _this = this;

        // When using the Custom Elements polyfill, clone the node, rather than
        // importing it, to keep the fragment in the template's document. This
        // leaves the fragment inert so custom elements won't upgrade and
        // potentially modify their contents by creating a polyfilled ShadowRoot
        // while we traverse the tree.
        var fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
        var parts = this.template.parts;
        var partIndex = 0;
        var nodeIndex = 0;

        var _prepareInstance = function _prepareInstance(fragment) {
          // Edge needs all 4 parameters present; IE11 needs 3rd parameter to be
          // null
          var walker = document.createTreeWalker(fragment, 133
          /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
          , null, false);
          var node = walker.nextNode(); // Loop through all the nodes and parts of a template

          while (partIndex < parts.length && node !== null) {
            var part = parts[partIndex]; // Consecutive Parts may have the same node index, in the case of
            // multiple bound attributes on an element. So each iteration we either
            // increment the nodeIndex, if we aren't on a node with a part, or the
            // partIndex if we are. By not incrementing the nodeIndex when we find a
            // part, we allow for the next part to be associated with the current
            // node if neccessasry.

            if (!isTemplatePartActive(part)) {
              _this._parts.push(undefined);

              partIndex++;
            } else if (nodeIndex === part.index) {
              if (part.type === 'node') {
                var _part2 = _this.processor.handleTextExpression(_this.options);

                _part2.insertAfterNode(node.previousSibling);

                _this._parts.push(_part2);
              } else {
                var _this$_parts;

                (_this$_parts = _this._parts).push.apply(_this$_parts, toConsumableArray(_this.processor.handleAttributeExpressions(node, part.name, part.strings, _this.options)));
              }

              partIndex++;
            } else {
              nodeIndex++;

              if (node.nodeName === 'TEMPLATE') {
                _prepareInstance(node.content);
              }

              node = walker.nextNode();
            }
          }
        };

        _prepareInstance(fragment);

        if (isCEPolyfill) {
          document.adoptNode(fragment);
          customElements.upgrade(fragment);
        }

        return fragment;
      }
    }]);

    return TemplateInstance;
  }();

  /**
   * The return type of `html`, which holds a Template and the values from
   * interpolated expressions.
   */

  var TemplateResult =
  /*#__PURE__*/
  function () {
    function TemplateResult(strings, values, type, processor) {
      classCallCheck(this, TemplateResult);

      this.strings = strings;
      this.values = values;
      this.type = type;
      this.processor = processor;
    }
    /**
     * Returns a string of HTML used to create a `<template>` element.
     */


    createClass(TemplateResult, [{
      key: "getHTML",
      value: function getHTML() {
        var endIndex = this.strings.length - 1;
        var html = '';

        for (var i = 0; i < endIndex; i++) {
          var s = this.strings[i]; // This exec() call does two things:
          // 1) Appends a suffix to the bound attribute name to opt out of special
          // attribute value parsing that IE11 and Edge do, like for style and
          // many SVG attributes. The Template class also appends the same suffix
          // when looking up attributes to create Parts.
          // 2) Adds an unquoted-attribute-safe marker for the first expression in
          // an attribute. Subsequent attribute expressions will use node markers,
          // and this is safe since attributes with multiple expressions are
          // guaranteed to be quoted.

          var match = lastAttributeNameRegex.exec(s);

          if (match) {
            // We're starting a new bound attribute.
            // Add the safe attribute suffix, and use unquoted-attribute-safe
            // marker.
            html += s.substr(0, match.index) + match[1] + match[2] + boundAttributeSuffix + match[3] + marker;
          } else {
            // We're either in a bound node, or trailing bound attribute.
            // Either way, nodeMarker is safe to use.
            html += s + nodeMarker;
          }
        }

        return html + this.strings[endIndex];
      }
    }, {
      key: "getTemplateElement",
      value: function getTemplateElement() {
        var template = document.createElement('template');
        template.innerHTML = this.getHTML();
        return template;
      }
    }]);

    return TemplateResult;
  }();

  var isPrimitive = function isPrimitive(value) {
    return value === null || !(_typeof_1(value) === 'object' || typeof value === 'function');
  };
  /**
   * Sets attribute values for AttributeParts, so that the value is only set once
   * even if there are multiple parts for an attribute.
   */

  var AttributeCommitter =
  /*#__PURE__*/
  function () {
    function AttributeCommitter(element, name, strings) {
      classCallCheck(this, AttributeCommitter);

      this.dirty = true;
      this.element = element;
      this.name = name;
      this.strings = strings;
      this.parts = [];

      for (var i = 0; i < strings.length - 1; i++) {
        this.parts[i] = this._createPart();
      }
    }
    /**
     * Creates a single part. Override this to create a differnt type of part.
     */


    createClass(AttributeCommitter, [{
      key: "_createPart",
      value: function _createPart() {
        return new AttributePart(this);
      }
    }, {
      key: "_getValue",
      value: function _getValue() {
        var strings = this.strings;
        var l = strings.length - 1;
        var text = '';

        for (var i = 0; i < l; i++) {
          text += strings[i];
          var part = this.parts[i];

          if (part !== undefined) {
            var v = part.value;

            if (v != null && (Array.isArray(v) || // tslint:disable-next-line:no-any
            typeof v !== 'string' && v[Symbol.iterator])) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = v[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var t = _step.value;
                  text += typeof t === 'string' ? t : String(t);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            } else {
              text += typeof v === 'string' ? v : String(v);
            }
          }
        }

        text += strings[l];
        return text;
      }
    }, {
      key: "commit",
      value: function commit() {
        if (this.dirty) {
          this.dirty = false;
          this.element.setAttribute(this.name, this._getValue());
        }
      }
    }]);

    return AttributeCommitter;
  }();
  var AttributePart =
  /*#__PURE__*/
  function () {
    function AttributePart(comitter) {
      classCallCheck(this, AttributePart);

      this.value = undefined;
      this.committer = comitter;
    }

    createClass(AttributePart, [{
      key: "setValue",
      value: function setValue(value) {
        if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
          this.value = value; // If the value is a not a directive, dirty the committer so that it'll
          // call setAttribute. If the value is a directive, it'll dirty the
          // committer if it calls setValue().

          if (!isDirective(value)) {
            this.committer.dirty = true;
          }
        }
      }
    }, {
      key: "commit",
      value: function commit() {
        while (isDirective(this.value)) {
          var directive = this.value;
          this.value = noChange;
          directive(this);
        }

        if (this.value === noChange) {
          return;
        }

        this.committer.commit();
      }
    }]);

    return AttributePart;
  }();
  var NodePart =
  /*#__PURE__*/
  function () {
    function NodePart(options) {
      classCallCheck(this, NodePart);

      this.value = undefined;
      this._pendingValue = undefined;
      this.options = options;
    }
    /**
     * Inserts this part into a container.
     *
     * This part must be empty, as its contents are not automatically moved.
     */


    createClass(NodePart, [{
      key: "appendInto",
      value: function appendInto(container) {
        this.startNode = container.appendChild(createMarker());
        this.endNode = container.appendChild(createMarker());
      }
      /**
       * Inserts this part between `ref` and `ref`'s next sibling. Both `ref` and
       * its next sibling must be static, unchanging nodes such as those that appear
       * in a literal section of a template.
       *
       * This part must be empty, as its contents are not automatically moved.
       */

    }, {
      key: "insertAfterNode",
      value: function insertAfterNode(ref) {
        this.startNode = ref;
        this.endNode = ref.nextSibling;
      }
      /**
       * Appends this part into a parent part.
       *
       * This part must be empty, as its contents are not automatically moved.
       */

    }, {
      key: "appendIntoPart",
      value: function appendIntoPart(part) {
        part._insert(this.startNode = createMarker());

        part._insert(this.endNode = createMarker());
      }
      /**
       * Appends this part after `ref`
       *
       * This part must be empty, as its contents are not automatically moved.
       */

    }, {
      key: "insertAfterPart",
      value: function insertAfterPart(ref) {
        ref._insert(this.startNode = createMarker());

        this.endNode = ref.endNode;
        ref.endNode = this.startNode;
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        this._pendingValue = value;
      }
    }, {
      key: "commit",
      value: function commit() {
        while (isDirective(this._pendingValue)) {
          var directive = this._pendingValue;
          this._pendingValue = noChange;
          directive(this);
        }

        var value = this._pendingValue;

        if (value === noChange) {
          return;
        }

        if (isPrimitive(value)) {
          if (value !== this.value) {
            this._commitText(value);
          }
        } else if (value instanceof TemplateResult) {
          this._commitTemplateResult(value);
        } else if (value instanceof Node) {
          this._commitNode(value);
        } else if (Array.isArray(value) || // tslint:disable-next-line:no-any
        value[Symbol.iterator]) {
          this._commitIterable(value);
        } else if (value === nothing) {
          this.value = nothing;
          this.clear();
        } else {
          // Fallback, will render the string representation
          this._commitText(value);
        }
      }
    }, {
      key: "_insert",
      value: function _insert(node) {
        this.endNode.parentNode.insertBefore(node, this.endNode);
      }
    }, {
      key: "_commitNode",
      value: function _commitNode(value) {
        if (this.value === value) {
          return;
        }

        this.clear();

        this._insert(value);

        this.value = value;
      }
    }, {
      key: "_commitText",
      value: function _commitText(value) {
        var node = this.startNode.nextSibling;
        value = value == null ? '' : value;

        if (node === this.endNode.previousSibling && node.nodeType === 3
        /* Node.TEXT_NODE */
        ) {
            // If we only have a single text node between the markers, we can just
            // set its value, rather than replacing it.
            // TODO(justinfagnani): Can we just check if this.value is primitive?
            node.data = value;
          } else {
          this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
        }

        this.value = value;
      }
    }, {
      key: "_commitTemplateResult",
      value: function _commitTemplateResult(value) {
        var template = this.options.templateFactory(value);

        if (this.value instanceof TemplateInstance && this.value.template === template) {
          this.value.update(value.values);
        } else {
          // Make sure we propagate the template processor from the TemplateResult
          // so that we use its syntax extension, etc. The template factory comes
          // from the render function options so that it can control template
          // caching and preprocessing.
          var instance = new TemplateInstance(template, value.processor, this.options);

          var fragment = instance._clone();

          instance.update(value.values);

          this._commitNode(fragment);

          this.value = instance;
        }
      }
    }, {
      key: "_commitIterable",
      value: function _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If _value is an array, then the previous render was of an
        // iterable and _value will contain the NodeParts from the previous
        // render. If _value is not an array, clear this part and make a new
        // array for NodeParts.
        if (!Array.isArray(this.value)) {
          this.value = [];
          this.clear();
        } // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render


        var itemParts = this.value;
        var partIndex = 0;
        var itemPart;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;
            // Try to reuse an existing part
            itemPart = itemParts[partIndex]; // If no existing part, create a new one

            if (itemPart === undefined) {
              itemPart = new NodePart(this.options);
              itemParts.push(itemPart);

              if (partIndex === 0) {
                itemPart.appendIntoPart(this);
              } else {
                itemPart.insertAfterPart(itemParts[partIndex - 1]);
              }
            }

            itemPart.setValue(item);
            itemPart.commit();
            partIndex++;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        if (partIndex < itemParts.length) {
          // Truncate the parts array so _value reflects the current state
          itemParts.length = partIndex;
          this.clear(itemPart && itemPart.endNode);
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        var startNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.startNode;
        removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
      }
    }]);

    return NodePart;
  }();
  /**
   * Implements a boolean attribute, roughly as defined in the HTML
   * specification.
   *
   * If the value is truthy, then the attribute is present with a value of
   * ''. If the value is falsey, the attribute is removed.
   */

  var BooleanAttributePart =
  /*#__PURE__*/
  function () {
    function BooleanAttributePart(element, name, strings) {
      classCallCheck(this, BooleanAttributePart);

      this.value = undefined;
      this._pendingValue = undefined;

      if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
        throw new Error('Boolean attributes can only contain a single expression');
      }

      this.element = element;
      this.name = name;
      this.strings = strings;
    }

    createClass(BooleanAttributePart, [{
      key: "setValue",
      value: function setValue(value) {
        this._pendingValue = value;
      }
    }, {
      key: "commit",
      value: function commit() {
        while (isDirective(this._pendingValue)) {
          var directive = this._pendingValue;
          this._pendingValue = noChange;
          directive(this);
        }

        if (this._pendingValue === noChange) {
          return;
        }

        var value = !!this._pendingValue;

        if (this.value !== value) {
          if (value) {
            this.element.setAttribute(this.name, '');
          } else {
            this.element.removeAttribute(this.name);
          }
        }

        this.value = value;
        this._pendingValue = noChange;
      }
    }]);

    return BooleanAttributePart;
  }();
  /**
   * Sets attribute values for PropertyParts, so that the value is only set once
   * even if there are multiple parts for a property.
   *
   * If an expression controls the whole property value, then the value is simply
   * assigned to the property under control. If there are string literals or
   * multiple expressions, then the strings are expressions are interpolated into
   * a string first.
   */

  var PropertyCommitter =
  /*#__PURE__*/
  function (_AttributeCommitter) {
    inherits(PropertyCommitter, _AttributeCommitter);

    function PropertyCommitter(element, name, strings) {
      var _this;

      classCallCheck(this, PropertyCommitter);

      _this = possibleConstructorReturn(this, getPrototypeOf(PropertyCommitter).call(this, element, name, strings));
      _this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
      return _this;
    }

    createClass(PropertyCommitter, [{
      key: "_createPart",
      value: function _createPart() {
        return new PropertyPart(this);
      }
    }, {
      key: "_getValue",
      value: function _getValue() {
        if (this.single) {
          return this.parts[0].value;
        }

        return get(getPrototypeOf(PropertyCommitter.prototype), "_getValue", this).call(this);
      }
    }, {
      key: "commit",
      value: function commit() {
        if (this.dirty) {
          this.dirty = false; // tslint:disable-next-line:no-any

          this.element[this.name] = this._getValue();
        }
      }
    }]);

    return PropertyCommitter;
  }(AttributeCommitter);
  var PropertyPart =
  /*#__PURE__*/
  function (_AttributePart) {
    inherits(PropertyPart, _AttributePart);

    function PropertyPart() {
      classCallCheck(this, PropertyPart);

      return possibleConstructorReturn(this, getPrototypeOf(PropertyPart).apply(this, arguments));
    }

    return PropertyPart;
  }(AttributePart); // Detect event listener options support. If the `capture` property is read
  // from the options object, then options are supported. If not, then the thrid
  // argument to add/removeEventListener is interpreted as the boolean capture
  // value so we should only pass the `capture` property.

  var eventOptionsSupported = false;

  try {
    var options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    }; // tslint:disable-next-line:no-any

    window.addEventListener('test', options, options); // tslint:disable-next-line:no-any

    window.removeEventListener('test', options, options);
  } catch (_e) {}

  var EventPart =
  /*#__PURE__*/
  function () {
    function EventPart(element, eventName, eventContext) {
      var _this2 = this;

      classCallCheck(this, EventPart);

      this.value = undefined;
      this._pendingValue = undefined;
      this.element = element;
      this.eventName = eventName;
      this.eventContext = eventContext;

      this._boundHandleEvent = function (e) {
        return _this2.handleEvent(e);
      };
    }

    createClass(EventPart, [{
      key: "setValue",
      value: function setValue(value) {
        this._pendingValue = value;
      }
    }, {
      key: "commit",
      value: function commit() {
        while (isDirective(this._pendingValue)) {
          var directive = this._pendingValue;
          this._pendingValue = noChange;
          directive(this);
        }

        if (this._pendingValue === noChange) {
          return;
        }

        var newListener = this._pendingValue;
        var oldListener = this.value;
        var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
        var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

        if (shouldRemoveListener) {
          this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
        }

        if (shouldAddListener) {
          this._options = getOptions(newListener);
          this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
        }

        this.value = newListener;
        this._pendingValue = noChange;
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(event) {
        if (typeof this.value === 'function') {
          this.value.call(this.eventContext || this.element, event);
        } else {
          this.value.handleEvent(event);
        }
      }
    }]);

    return EventPart;
  }(); // We copy options because of the inconsistent behavior of browsers when reading
  // the third argument of add/removeEventListener. IE11 doesn't support options
  // at all. Chrome 41 only reads `capture` if the argument is an object.

  var getOptions = function getOptions(o) {
    return o && (eventOptionsSupported ? {
      capture: o.capture,
      passive: o.passive,
      once: o.once
    } : o.capture);
  };

  /**
   * Creates Parts when a template is instantiated.
   */

  var DefaultTemplateProcessor =
  /*#__PURE__*/
  function () {
    function DefaultTemplateProcessor() {
      classCallCheck(this, DefaultTemplateProcessor);
    }

    createClass(DefaultTemplateProcessor, [{
      key: "handleAttributeExpressions",

      /**
       * Create parts for an attribute-position binding, given the event, attribute
       * name, and string literals.
       *
       * @param element The element containing the binding
       * @param name  The attribute name
       * @param strings The string literals. There are always at least two strings,
       *   event for fully-controlled bindings with a single expression.
       */
      value: function handleAttributeExpressions(element, name, strings, options) {
        var prefix = name[0];

        if (prefix === '.') {
          var _comitter = new PropertyCommitter(element, name.slice(1), strings);

          return _comitter.parts;
        }

        if (prefix === '@') {
          return [new EventPart(element, name.slice(1), options.eventContext)];
        }

        if (prefix === '?') {
          return [new BooleanAttributePart(element, name.slice(1), strings)];
        }

        var comitter = new AttributeCommitter(element, name, strings);
        return comitter.parts;
      }
      /**
       * Create parts for a text-position binding.
       * @param templateFactory
       */

    }, {
      key: "handleTextExpression",
      value: function handleTextExpression(options) {
        return new NodePart(options);
      }
    }]);

    return DefaultTemplateProcessor;
  }();
  var defaultTemplateProcessor = new DefaultTemplateProcessor();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  /**
   * The default TemplateFactory which caches Templates keyed on
   * result.type and result.strings.
   */

  function templateFactory(result) {
    var templateCache = templateCaches.get(result.type);

    if (templateCache === undefined) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      };
      templateCaches.set(result.type, templateCache);
    }

    var template = templateCache.stringsArray.get(result.strings);

    if (template !== undefined) {
      return template;
    } // If the TemplateStringsArray is new, generate a key from the strings
    // This key is shared between all templates with identical content


    var key = result.strings.join(marker); // Check if we already have a Template for this key

    template = templateCache.keyString.get(key);

    if (template === undefined) {
      // If we have not seen this key before, create a new Template
      template = new Template(result, result.getTemplateElement()); // Cache the Template for this key

      templateCache.keyString.set(key, template);
    } // Cache all future queries for this TemplateStringsArray


    templateCache.stringsArray.set(result.strings, template);
    return template;
  }
  var templateCaches = new Map();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var parts = new WeakMap();
  /**
   * Renders a template to a container.
   *
   * To update a container with new values, reevaluate the template literal and
   * call `render` with the new result.
   *
   * @param result a TemplateResult created by evaluating a template tag like
   *     `html` or `svg`.
   * @param container A DOM parent to render to. The entire contents are either
   *     replaced, or efficiently updated if the same result type was previous
   *     rendered there.
   * @param options RenderOptions for the entire render tree rendered to this
   *     container. Render options must *not* change between renders to the same
   *     container, as those changes will not effect previously rendered DOM.
   */

  var render = function render(result, container, options) {
    var part = parts.get(container);

    if (part === undefined) {
      removeNodes(container, container.firstChild);
      parts.set(container, part = new NodePart(Object.assign({
        templateFactory: templateFactory
      }, options)));
      part.appendInto(container);
    }

    part.setValue(result);
    part.commit();
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  // This line will be used in regexes to search for lit-html usage.
  // TODO(justinfagnani): inject version number at build time

  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
  /**
   * Interprets a template literal as an HTML template that can efficiently
   * render to and update a container.
   */

  var html = function html(strings) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    return new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var walkerNodeFilter = 133
  /* NodeFilter.SHOW_{ELEMENT|COMMENT|TEXT} */
  ;
  /**
   * Removes the list of nodes from a Template safely. In addition to removing
   * nodes from the Template, the Template part indices are updated to match
   * the mutated Template DOM.
   *
   * As the template is walked the removal state is tracked and
   * part indices are adjusted as needed.
   *
   * div
   *   div#1 (remove) <-- start removing (removing node is div#1)
   *     div
   *       div#2 (remove)  <-- continue removing (removing node is still div#1)
   *         div
   * div <-- stop removing since previous sibling is the removing node (div#1,
   * removed 4 nodes)
   */

  function removeNodesFromTemplate(template, nodesToRemove) {
    var content = template.element.content,
        parts = template.parts;
    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = nextActiveIndexInTemplateParts(parts);
    var part = parts[partIndex];
    var nodeIndex = -1;
    var removeCount = 0;
    var nodesToRemoveInTemplate = [];
    var currentRemovingNode = null;

    while (walker.nextNode()) {
      nodeIndex++;
      var node = walker.currentNode; // End removal if stepped past the removing node

      if (node.previousSibling === currentRemovingNode) {
        currentRemovingNode = null;
      } // A node to remove was found in the template


      if (nodesToRemove.has(node)) {
        nodesToRemoveInTemplate.push(node); // Track node we're removing

        if (currentRemovingNode === null) {
          currentRemovingNode = node;
        }
      } // When removing, increment count by which to adjust subsequent part indices


      if (currentRemovingNode !== null) {
        removeCount++;
      }

      while (part !== undefined && part.index === nodeIndex) {
        // If part is in a removed node deactivate it by setting index to -1 or
        // adjust the index as needed.
        part.index = currentRemovingNode !== null ? -1 : part.index - removeCount; // go to the next active part.

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        part = parts[partIndex];
      }
    }

    nodesToRemoveInTemplate.forEach(function (n) {
      return n.parentNode.removeChild(n);
    });
  }

  var countNodes = function countNodes(node) {
    var count = node.nodeType === 11
    /* Node.DOCUMENT_FRAGMENT_NODE */
    ? 0 : 1;
    var walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

    while (walker.nextNode()) {
      count++;
    }

    return count;
  };

  var nextActiveIndexInTemplateParts = function nextActiveIndexInTemplateParts(parts) {
    var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

    for (var i = startIndex + 1; i < parts.length; i++) {
      var part = parts[i];

      if (isTemplatePartActive(part)) {
        return i;
      }
    }

    return -1;
  };
  /**
   * Inserts the given node into the Template, optionally before the given
   * refNode. In addition to inserting the node into the Template, the Template
   * part indices are updated to match the mutated Template DOM.
   */


  function insertNodeIntoTemplate(template, node) {
    var refNode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var content = template.element.content,
        parts = template.parts; // If there's no refNode, then put node at end of template.
    // No part indices need to be shifted in this case.

    if (refNode === null || refNode === undefined) {
      content.appendChild(node);
      return;
    }

    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = nextActiveIndexInTemplateParts(parts);
    var insertCount = 0;
    var walkerIndex = -1;

    while (walker.nextNode()) {
      walkerIndex++;
      var walkerNode = walker.currentNode;

      if (walkerNode === refNode) {
        insertCount = countNodes(node);
        refNode.parentNode.insertBefore(node, refNode);
      }

      while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
        // If we've inserted the node, simply adjust all subsequent parts
        if (insertCount > 0) {
          while (partIndex !== -1) {
            parts[partIndex].index += insertCount;
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }

          return;
        }

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      }
    }
  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  var getTemplateCacheKey = function getTemplateCacheKey(type, scopeName) {
    return "".concat(type, "--").concat(scopeName);
  };

  var compatibleShadyCSSVersion = true;

  if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
  } else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn("Incompatible ShadyCSS version detected." + "Please update to at least @webcomponents/webcomponentsjs@2.0.2 and" + "@webcomponents/shadycss@1.3.1.");
    compatibleShadyCSSVersion = false;
  }
  /**
   * Template factory which scopes template DOM using ShadyCSS.
   * @param scopeName {string}
   */


  var shadyTemplateFactory = function shadyTemplateFactory(scopeName) {
    return function (result) {
      var cacheKey = getTemplateCacheKey(result.type, scopeName);
      var templateCache = templateCaches.get(cacheKey);

      if (templateCache === undefined) {
        templateCache = {
          stringsArray: new WeakMap(),
          keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
      }

      var template = templateCache.stringsArray.get(result.strings);

      if (template !== undefined) {
        return template;
      }

      var key = result.strings.join(marker);
      template = templateCache.keyString.get(key);

      if (template === undefined) {
        var element = result.getTemplateElement();

        if (compatibleShadyCSSVersion) {
          window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }

        template = new Template(result, element);
        templateCache.keyString.set(key, template);
      }

      templateCache.stringsArray.set(result.strings, template);
      return template;
    };
  };

  var TEMPLATE_TYPES = ['html', 'svg'];
  /**
   * Removes all style elements from Templates for the given scopeName.
   */

  var removeStylesFromLitTemplates = function removeStylesFromLitTemplates(scopeName) {
    TEMPLATE_TYPES.forEach(function (type) {
      var templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

      if (templates !== undefined) {
        templates.keyString.forEach(function (template) {
          var content = template.element.content; // IE 11 doesn't support the iterable param Set constructor

          var styles = new Set();
          Array.from(content.querySelectorAll('style')).forEach(function (s) {
            styles.add(s);
          });
          removeNodesFromTemplate(template, styles);
        });
      }
    });
  };

  var shadyRenderSet = new Set();
  /**
   * For the given scope name, ensures that ShadyCSS style scoping is performed.
   * This is done just once per scope name so the fragment and template cannot
   * be modified.
   * (1) extracts styles from the rendered fragment and hands them to ShadyCSS
   * to be scoped and appended to the document
   * (2) removes style elements from all lit-html Templates for this scope name.
   *
   * Note, <style> elements can only be placed into templates for the
   * initial rendering of the scope. If <style> elements are included in templates
   * dynamically rendered to the scope (after the first scope render), they will
   * not be scoped and the <style> will be left in the template and rendered
   * output.
   */

  var prepareTemplateStyles = function prepareTemplateStyles(renderedDOM, template, scopeName) {
    shadyRenderSet.add(scopeName); // Move styles out of rendered DOM and store.

    var styles = renderedDOM.querySelectorAll('style'); // If there are no styles, skip unnecessary work

    if (styles.length === 0) {
      // Ensure prepareTemplateStyles is called to support adding
      // styles via `prepareAdoptedCssText` since that requires that
      // `prepareTemplateStyles` is called.
      window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
      return;
    }

    var condensedStyle = document.createElement('style'); // Collect styles into a single style. This helps us make sure ShadyCSS
    // manipulations will not prevent us from being able to fix up template
    // part indices.
    // NOTE: collecting styles is inefficient for browsers but ShadyCSS
    // currently does this anyway. When it does not, this should be changed.

    for (var i = 0; i < styles.length; i++) {
      var style = styles[i];
      style.parentNode.removeChild(style);
      condensedStyle.textContent += style.textContent;
    } // Remove styles from nested templates in this scope.


    removeStylesFromLitTemplates(scopeName); // And then put the condensed style into the "root" template passed in as
    // `template`.

    insertNodeIntoTemplate(template, condensedStyle, template.element.content.firstChild); // Note, it's important that ShadyCSS gets the template that `lit-html`
    // will actually render so that it can update the style inside when
    // needed (e.g. @apply native Shadow DOM case).

    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

    if (window.ShadyCSS.nativeShadow) {
      // When in native Shadow DOM, re-add styling to rendered content using
      // the style ShadyCSS produced.
      var _style = template.element.content.querySelector('style');

      renderedDOM.insertBefore(_style.cloneNode(true), renderedDOM.firstChild);
    } else {
      // When not in native Shadow DOM, at this point ShadyCSS will have
      // removed the style from the lit template and parts will be broken as a
      // result. To fix this, we put back the style node ShadyCSS removed
      // and then tell lit to remove that node from the template.
      // NOTE, ShadyCSS creates its own style so we can safely add/remove
      // `condensedStyle` here.
      template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
      var removes = new Set();
      removes.add(condensedStyle);
      removeNodesFromTemplate(template, removes);
    }
  };
  /**
   * Extension to the standard `render` method which supports rendering
   * to ShadowRoots when the ShadyDOM (https://github.com/webcomponents/shadydom)
   * and ShadyCSS (https://github.com/webcomponents/shadycss) polyfills are used
   * or when the webcomponentsjs
   * (https://github.com/webcomponents/webcomponentsjs) polyfill is used.
   *
   * Adds a `scopeName` option which is used to scope element DOM and stylesheets
   * when native ShadowDOM is unavailable. The `scopeName` will be added to
   * the class attribute of all rendered DOM. In addition, any style elements will
   * be automatically re-written with this `scopeName` selector and moved out
   * of the rendered DOM and into the document `<head>`.
   *
   * It is common to use this render method in conjunction with a custom element
   * which renders a shadowRoot. When this is done, typically the element's
   * `localName` should be used as the `scopeName`.
   *
   * In addition to DOM scoping, ShadyCSS also supports a basic shim for css
   * custom properties (needed only on older browsers like IE11) and a shim for
   * a deprecated feature called `@apply` that supports applying a set of css
   * custom properties to a given location.
   *
   * Usage considerations:
   *
   * * Part values in `<style>` elements are only applied the first time a given
   * `scopeName` renders. Subsequent changes to parts in style elements will have
   * no effect. Because of this, parts in style elements should only be used for
   * values that will never change, for example parts that set scope-wide theme
   * values or parts which render shared style elements.
   *
   * * Note, due to a limitation of the ShadyDOM polyfill, rendering in a
   * custom element's `constructor` is not supported. Instead rendering should
   * either done asynchronously, for example at microtask timing (for example
   * `Promise.resolve()`), or be deferred until the first time the element's
   * `connectedCallback` runs.
   *
   * Usage considerations when using shimmed custom properties or `@apply`:
   *
   * * Whenever any dynamic changes are made which affect
   * css custom properties, `ShadyCSS.styleElement(element)` must be called
   * to update the element. There are two cases when this is needed:
   * (1) the element is connected to a new parent, (2) a class is added to the
   * element that causes it to match different custom properties.
   * To address the first case when rendering a custom element, `styleElement`
   * should be called in the element's `connectedCallback`.
   *
   * * Shimmed custom properties may only be defined either for an entire
   * shadowRoot (for example, in a `:host` rule) or via a rule that directly
   * matches an element with a shadowRoot. In other words, instead of flowing from
   * parent to child as do native css custom properties, shimmed custom properties
   * flow only from shadowRoots to nested shadowRoots.
   *
   * * When using `@apply` mixing css shorthand property names with
   * non-shorthand names (for example `border` and `border-width`) is not
   * supported.
   */


  var render$1 = function render$1(result, container, options) {
    var scopeName = options.scopeName;
    var hasRendered = parts.has(container);
    var needsScoping = container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof TemplateResult; // Handle first render to a scope specially...

    var firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName); // On first scope render, render into a fragment; this cannot be a single
    // fragment that is reused since nested renders can occur synchronously.

    var renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({
      templateFactory: shadyTemplateFactory(scopeName)
    }, options)); // When performing first scope render,
    // (1) We've rendered into a fragment so that there's a chance to
    // `prepareTemplateStyles` before sub-elements hit the DOM
    // (which might cause them to render based on a common pattern of
    // rendering in a custom element's `connectedCallback`);
    // (2) Scope the template with ShadyCSS one time only for this scope.
    // (3) Render the fragment into the container and make sure the
    // container knows its `part` is the one we just rendered. This ensures
    // DOM will be re-used on subsequent renders.

    if (firstScopeRender) {
      var part = parts.get(renderContainer);
      parts.delete(renderContainer);

      if (part.value instanceof TemplateInstance) {
        prepareTemplateStyles(renderContainer, part.value.template, scopeName);
      }

      removeNodes(container, container.firstChild);
      container.appendChild(renderContainer);
      parts.set(container, part);
    } // After elements have hit the DOM, update styling if this is the
    // initial render to this container.
    // This is needed whenever dynamic changes are made so it would be
    // safest to do every render; however, this would regress performance
    // so we leave it up to the user to call `ShadyCSSS.styleElement`
    // for dynamic changes.


    if (!hasRendered && needsScoping) {
      window.ShadyCSS.styleElement(container.host);
    }
  };

  var runtime = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  !(function(global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }

    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime =  module.exports ;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    runtime.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype &&
        NativeIteratorPrototype !== Op &&
        hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype =
      Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] =
      GeneratorFunction.displayName = "GeneratorFunction";

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        prototype[method] = function(arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
          // For the native GeneratorFunction constructor, the best we can
          // do is to check its .name property.
          (ctor.displayName || ctor.name) === "GeneratorFunction"
        : false;
    };

    runtime.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    runtime.awrap = function(arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value &&
              typeof value === "object" &&
              hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function(value) {
              invoke("next", value, resolve, reject);
            }, function(err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function(error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
    runtime.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function(innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList)
      );

      return runtime.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;

          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);

          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done
              ? GenStateCompleted
              : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };

          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (! info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }

      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    Gp[toStringTagSymbol] = "Generator";

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function(object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1, next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;

            return next;
          };

          return next.next = next;
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = "next";
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" &&
                hasOwn.call(this, name) &&
                !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function() {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !! caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }

            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }

            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },

      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev &&
              hasOwn.call(entry, "finallyLoc") &&
              this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry &&
            (type === "break" ||
             type === "continue") &&
            finallyEntry.tryLoc <= arg &&
            arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" ||
            record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },

      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    };
  })(
    // In sloppy mode, unbound `this` refers to the global object, fallback to
    // Function constructor if we're in global strict mode. That is sadly a form
    // of indirect eval which violates Content Security Policy.
    (function() {
      return this || (typeof self === "object" && self);
    })() || Function("return this")()
  );
  });

  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js
  var g = (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")();

  // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.
  var hadRuntime = g.regeneratorRuntime &&
    Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

  // Save the old regeneratorRuntime in case it needs to be restored later.
  var oldRuntime = hadRuntime && g.regeneratorRuntime;

  // Force reevalutation of runtime.js.
  g.regeneratorRuntime = undefined;

  var runtimeModule = runtime;

  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch(e) {
      g.regeneratorRuntime = undefined;
    }
  }

  var regenerator = runtimeModule;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  var construct = createCommonjsModule(function (module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function (module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
  });

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  /**
   * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
   * replaced at compile time by the munged name for object[property]. We cannot
   * alias this function, so we have to use a small shim that has the same
   * behavior when not compiling.
   */
  window.JSCompiler_renameProperty = function (prop, _obj) {
    return prop;
  };

  var defaultConverter = {
    toAttribute: function toAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value ? '' : null;

        case Object:
        case Array:
          // if the value is `null` or `undefined` pass this through
          // to allow removing/no change behavior.
          return value == null ? value : JSON.stringify(value);
      }

      return value;
    },
    fromAttribute: function fromAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value !== null;

        case Number:
          return value === null ? null : Number(value);

        case Object:
        case Array:
          return JSON.parse(value);
      }

      return value;
    }
  };
  /**
   * Change function that returns true if `value` is different from `oldValue`.
   * This method is used as the default for a property's `hasChanged` function.
   */

  var notEqual = function notEqual(value, old) {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
  };
  var defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
  };
  var microtaskPromise = Promise.resolve(true);
  var STATE_HAS_UPDATED = 1;
  var STATE_UPDATE_REQUESTED = 1 << 2;
  var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
  var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
  var STATE_HAS_CONNECTED = 1 << 5;
  /**
   * Base element class which manages element properties and attributes. When
   * properties change, the `update` method is asynchronously called. This method
   * should be supplied by subclassers to render updates as desired.
   */

  var UpdatingElement =
  /*#__PURE__*/
  function (_HTMLElement) {
    inherits(UpdatingElement, _HTMLElement);

    function UpdatingElement() {
      var _this;

      classCallCheck(this, UpdatingElement);

      _this = possibleConstructorReturn(this, getPrototypeOf(UpdatingElement).call(this));
      _this._updateState = 0;
      _this._instanceProperties = undefined;
      _this._updatePromise = microtaskPromise;
      _this._hasConnectedResolver = undefined;
      /**
       * Map with keys for any properties that have changed since the last
       * update cycle with previous values.
       */

      _this._changedProperties = new Map();
      /**
       * Map with keys of properties that should be reflected when updated.
       */

      _this._reflectingProperties = undefined;

      _this.initialize();

      return _this;
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     */


    createClass(UpdatingElement, [{
      key: "initialize",

      /**
       * Performs element initialization. By default captures any pre-set values for
       * registered properties.
       */
      value: function initialize() {
        this._saveInstanceProperties(); // ensures first update will be caught by an early access of `updateComplete`


        this._requestUpdate();
      }
      /**
       * Fixes any properties set on the instance before upgrade time.
       * Otherwise these would shadow the accessor and break these properties.
       * The properties are stored in a Map which is played back after the
       * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
       * (<=41), properties created for native platform properties like (`id` or
       * `name`) may not have default values set in the element constructor. On
       * these browsers native properties appear on instances and therefore their
       * default value will overwrite any element default (e.g. if the element sets
       * this.id = 'id' in the constructor, the 'id' will become '' since this is
       * the native platform default).
       */

    }, {
      key: "_saveInstanceProperties",
      value: function _saveInstanceProperties() {
        var _this2 = this;

        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor._classProperties.forEach(function (_v, p) {
          if (_this2.hasOwnProperty(p)) {
            var value = _this2[p];
            delete _this2[p];

            if (!_this2._instanceProperties) {
              _this2._instanceProperties = new Map();
            }

            _this2._instanceProperties.set(p, value);
          }
        });
      }
      /**
       * Applies previously saved instance properties.
       */

    }, {
      key: "_applyInstanceProperties",
      value: function _applyInstanceProperties() {
        var _this3 = this;

        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // tslint:disable-next-line:no-any
        this._instanceProperties.forEach(function (v, p) {
          return _this3[p] = v;
        });

        this._instanceProperties = undefined;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this._updateState = this._updateState | STATE_HAS_CONNECTED; // Ensure first connection completes an update. Updates cannot complete before
        // connection and if one is pending connection the `_hasConnectionResolver`
        // will exist. If so, resolve it to complete the update, otherwise
        // requestUpdate.

        if (this._hasConnectedResolver) {
          this._hasConnectedResolver();

          this._hasConnectedResolver = undefined;
        }
      }
      /**
       * Allows for `super.disconnectedCallback()` in extensions while
       * reserving the possibility of making non-breaking feature additions
       * when disconnecting at some point in the future.
       */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {}
      /**
       * Synchronizes property values when attributes change.
       */

    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, old, value) {
        if (old !== value) {
          this._attributeToProperty(name, value);
        }
      }
    }, {
      key: "_propertyToAttribute",
      value: function _propertyToAttribute(name, value) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultPropertyDeclaration;
        var ctor = this.constructor;

        var attr = ctor._attributeNameForProperty(name, options);

        if (attr !== undefined) {
          var attrValue = ctor._propertyValueToAttribute(value, options); // an undefined value does not change the attribute.


          if (attrValue === undefined) {
            return;
          } // Track if the property is being reflected to avoid
          // setting the property again via `attributeChangedCallback`. Note:
          // 1. this takes advantage of the fact that the callback is synchronous.
          // 2. will behave incorrectly if multiple attributes are in the reaction
          // stack at time of calling. However, since we process attributes
          // in `update` this should not be possible (or an extreme corner case
          // that we'd like to discover).
          // mark state reflecting


          this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

          if (attrValue == null) {
            this.removeAttribute(attr);
          } else {
            this.setAttribute(attr, attrValue);
          } // mark state not reflecting


          this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
        }
      }
    }, {
      key: "_attributeToProperty",
      value: function _attributeToProperty(name, value) {
        // Use tracking info to avoid deserializing attribute value if it was
        // just set from a property setter.
        if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
          return;
        }

        var ctor = this.constructor;

        var propName = ctor._attributeToPropertyMap.get(name);

        if (propName !== undefined) {
          var options = ctor._classProperties.get(propName) || defaultPropertyDeclaration; // mark state reflecting

          this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
          this[propName] = // tslint:disable-next-line:no-any
          ctor._propertyValueFromAttribute(value, options); // mark state not reflecting

          this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
        }
      }
      /**
       * This private version of `requestUpdate` does not access or return the
       * `updateComplete` promise. This promise can be overridden and is therefore
       * not free to access.
       */

    }, {
      key: "_requestUpdate",
      value: function _requestUpdate(name, oldValue) {
        var shouldRequestUpdate = true; // If we have a property key, perform property update steps.

        if (name !== undefined) {
          var ctor = this.constructor;
          var options = ctor._classProperties.get(name) || defaultPropertyDeclaration;

          if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
            if (!this._changedProperties.has(name)) {
              this._changedProperties.set(name, oldValue);
            } // Add to reflecting properties set.
            // Note, it's important that every change has a chance to add the
            // property to `_reflectingProperties`. This ensures setting
            // attribute + property reflects correctly.


            if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
              if (this._reflectingProperties === undefined) {
                this._reflectingProperties = new Map();
              }

              this._reflectingProperties.set(name, options);
            }
          } else {
            // Abort the request if the property should not be considered changed.
            shouldRequestUpdate = false;
          }
        }

        if (!this._hasRequestedUpdate && shouldRequestUpdate) {
          this._enqueueUpdate();
        }
      }
      /**
       * Requests an update which is processed asynchronously. This should
       * be called when an element should update based on some state not triggered
       * by setting a property. In this case, pass no arguments. It should also be
       * called when manually implementing a property setter. In this case, pass the
       * property `name` and `oldValue` to ensure that any configured property
       * options are honored. Returns the `updateComplete` Promise which is resolved
       * when the update completes.
       *
       * @param name {PropertyKey} (optional) name of requesting property
       * @param oldValue {any} (optional) old value of requesting property
       * @returns {Promise} A Promise that is resolved when the update completes.
       */

    }, {
      key: "requestUpdate",
      value: function requestUpdate(name, oldValue) {
        this._requestUpdate(name, oldValue);

        return this.updateComplete;
      }
      /**
       * Sets up the element to asynchronously update.
       */

    }, {
      key: "_enqueueUpdate",
      value: function () {
        var _enqueueUpdate2 = asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee() {
          var _this4 = this;

          var resolve, reject, previousUpdatePromise, result;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // Mark state updating...
                  this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
                  previousUpdatePromise = this._updatePromise;
                  this._updatePromise = new Promise(function (res, rej) {
                    resolve = res;
                    reject = rej;
                  });
                  _context.prev = 3;
                  _context.next = 6;
                  return previousUpdatePromise;

                case 6:
                  _context.next = 10;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](3);

                case 10:
                  if (this._hasConnected) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 13;
                  return new Promise(function (res) {
                    return _this4._hasConnectedResolver = res;
                  });

                case 13:
                  _context.prev = 13;
                  result = this.performUpdate(); // If `performUpdate` returns a Promise, we await it. This is done to
                  // enable coordinating updates with a scheduler. Note, the result is
                  // checked to avoid delaying an additional microtask unless we need to.

                  if (!(result != null)) {
                    _context.next = 18;
                    break;
                  }

                  _context.next = 18;
                  return result;

                case 18:
                  _context.next = 23;
                  break;

                case 20:
                  _context.prev = 20;
                  _context.t1 = _context["catch"](13);
                  reject(_context.t1);

                case 23:
                  resolve(!this._hasRequestedUpdate);

                case 24:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 8], [13, 20]]);
        }));

        function _enqueueUpdate() {
          return _enqueueUpdate2.apply(this, arguments);
        }

        return _enqueueUpdate;
      }()
    }, {
      key: "performUpdate",

      /**
       * Performs an element update. Note, if an exception is thrown during the
       * update, `firstUpdated` and `updated` will not be called.
       *
       * You can override this method to change the timing of updates. If this
       * method is overridden, `super.performUpdate()` must be called.
       *
       * For instance, to schedule updates to occur just before the next frame:
       *
       * ```
       * protected async performUpdate(): Promise<unknown> {
       *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
       *   super.performUpdate();
       * }
       * ```
       */
      value: function performUpdate() {
        // Mixin instance properties once, if they exist.
        if (this._instanceProperties) {
          this._applyInstanceProperties();
        }

        var shouldUpdate = false;
        var changedProperties = this._changedProperties;

        try {
          shouldUpdate = this.shouldUpdate(changedProperties);

          if (shouldUpdate) {
            this.update(changedProperties);
          }
        } catch (e) {
          // Prevent `firstUpdated` and `updated` from running when there's an
          // update exception.
          shouldUpdate = false;
          throw e;
        } finally {
          // Ensure element can accept additional updates after an exception.
          this._markUpdated();
        }

        if (shouldUpdate) {
          if (!(this._updateState & STATE_HAS_UPDATED)) {
            this._updateState = this._updateState | STATE_HAS_UPDATED;
            this.firstUpdated(changedProperties);
          }

          this.updated(changedProperties);
        }
      }
    }, {
      key: "_markUpdated",
      value: function _markUpdated() {
        this._changedProperties = new Map();
        this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
      }
      /**
       * Returns a Promise that resolves when the element has completed updating.
       * The Promise value is a boolean that is `true` if the element completed the
       * update without triggering another update. The Promise result is `false` if
       * a property was set inside `updated()`. If the Promise is rejected, an
       * exception was thrown during the update. This getter can be implemented to
       * await additional state. For example, it is sometimes useful to await a
       * rendered element before fulfilling this Promise. To do this, first await
       * `super.updateComplete` then any subsequent state.
       *
       * @returns {Promise} The Promise returns a boolean that indicates if the
       * update resolved without triggering another update.
       */

    }, {
      key: "shouldUpdate",

      /**
       * Controls whether or not `update` should be called when the element requests
       * an update. By default, this method always returns `true`, but this can be
       * customized to control when to update.
       *
       * * @param _changedProperties Map of changed properties with old values
       */
      value: function shouldUpdate(_changedProperties) {
        return true;
      }
      /**
       * Updates the element. This method reflects property values to attributes.
       * It can be overridden to render and keep updated element DOM.
       * Setting properties inside this method will *not* trigger
       * another update.
       *
       * * @param _changedProperties Map of changed properties with old values
       */

    }, {
      key: "update",
      value: function update(_changedProperties) {
        var _this5 = this;

        if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
          // Use forEach so this works even if for/of loops are compiled to for
          // loops expecting arrays
          this._reflectingProperties.forEach(function (v, k) {
            return _this5._propertyToAttribute(k, _this5[k], v);
          });

          this._reflectingProperties = undefined;
        }
      }
      /**
       * Invoked whenever the element is updated. Implement to perform
       * post-updating tasks via DOM APIs, for example, focusing an element.
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * * @param _changedProperties Map of changed properties with old values
       */

    }, {
      key: "updated",
      value: function updated(_changedProperties) {}
      /**
       * Invoked when the element is first updated. Implement to perform one time
       * work on the element after update.
       *
       * Setting properties inside this method will trigger the element to update
       * again after this update cycle completes.
       *
       * * @param _changedProperties Map of changed properties with old values
       */

    }, {
      key: "firstUpdated",
      value: function firstUpdated(_changedProperties) {}
    }, {
      key: "_hasConnected",
      get: function get() {
        return this._updateState & STATE_HAS_CONNECTED;
      }
    }, {
      key: "_hasRequestedUpdate",
      get: function get() {
        return this._updateState & STATE_UPDATE_REQUESTED;
      }
    }, {
      key: "hasUpdated",
      get: function get() {
        return this._updateState & STATE_HAS_UPDATED;
      }
    }, {
      key: "updateComplete",
      get: function get() {
        return this._updatePromise;
      }
    }], [{
      key: "_ensureClassProperties",

      /**
       * Ensures the private `_classProperties` property metadata is created.
       * In addition to `finalize` this is also called in `createProperty` to
       * ensure the `@property` decorator can add property metadata.
       */

      /** @nocollapse */
      value: function _ensureClassProperties() {
        var _this6 = this;

        // ensure private storage for property declarations.
        if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
          this._classProperties = new Map(); // NOTE: Workaround IE11 not supporting Map constructor argument.

          var superProperties = Object.getPrototypeOf(this)._classProperties;

          if (superProperties !== undefined) {
            superProperties.forEach(function (v, k) {
              return _this6._classProperties.set(k, v);
            });
          }
        }
      }
      /**
       * Creates a property accessor on the element prototype if one does not exist.
       * The property setter calls the property's `hasChanged` property option
       * or uses a strict identity check to determine whether or not to request
       * an update.
       * @nocollapse
       */

    }, {
      key: "createProperty",
      value: function createProperty(name) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPropertyDeclaration;

        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure storage exists for property
        // metadata.
        this._ensureClassProperties();

        this._classProperties.set(name, options); // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it


        if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
          return;
        }

        var key = _typeof_1(name) === 'symbol' ? Symbol() : "__".concat(name);
        Object.defineProperty(this.prototype, name, {
          // tslint:disable-next-line:no-any no symbol in index
          get: function get() {
            return this[key];
          },
          set: function set(value) {
            // tslint:disable-next-line:no-any no symbol in index
            var oldValue = this[name]; // tslint:disable-next-line:no-any no symbol in index

            this[key] = value;

            this._requestUpdate(name, oldValue);
          },
          configurable: true,
          enumerable: true
        });
      }
      /**
       * Creates property accessors for registered properties and ensures
       * any superclasses are also finalized.
       * @nocollapse
       */

    }, {
      key: "finalize",
      value: function finalize() {
        if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
          return;
        } // finalize any superclasses


        var superCtor = Object.getPrototypeOf(this);

        if (typeof superCtor.finalize === 'function') {
          superCtor.finalize();
        }

        this.finalized = true;

        this._ensureClassProperties(); // initialize Map populated in observedAttributes


        this._attributeToPropertyMap = new Map(); // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.

        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
          var props = this.properties; // support symbols in properties (IE11 does not support this)

          var propKeys = [].concat(toConsumableArray(Object.getOwnPropertyNames(props)), toConsumableArray(typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : [])); // This for/of is ok because propKeys is an array

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = propKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var p = _step.value;
              // note, use of `any` is due to TypeSript lack of support for symbol in
              // index types
              // tslint:disable-next-line:no-any no symbol in index
              this.createProperty(p, props[p]);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
      /**
       * Returns the property name for the given attribute `name`.
       * @nocollapse
       */

    }, {
      key: "_attributeNameForProperty",
      value: function _attributeNameForProperty(name, options) {
        var attribute = options.attribute;
        return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
      }
      /**
       * Returns true if a property should request an update.
       * Called when a property value is set and uses the `hasChanged`
       * option for the property if present or a strict identity check.
       * @nocollapse
       */

    }, {
      key: "_valueHasChanged",
      value: function _valueHasChanged(value, old) {
        var hasChanged = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : notEqual;
        return hasChanged(value, old);
      }
      /**
       * Returns the property value for the given attribute value.
       * Called via the `attributeChangedCallback` and uses the property's
       * `converter` or `converter.fromAttribute` property option.
       * @nocollapse
       */

    }, {
      key: "_propertyValueFromAttribute",
      value: function _propertyValueFromAttribute(value, options) {
        var type = options.type;
        var converter = options.converter || defaultConverter;
        var fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
        return fromAttribute ? fromAttribute(value, type) : value;
      }
      /**
       * Returns the attribute value for the given property value. If this
       * returns undefined, the property will *not* be reflected to an attribute.
       * If this returns null, the attribute will be removed, otherwise the
       * attribute will be set to the value.
       * This uses the property's `reflect` and `type.toAttribute` property options.
       * @nocollapse
       */

    }, {
      key: "_propertyValueToAttribute",
      value: function _propertyValueToAttribute(value, options) {
        if (options.reflect === undefined) {
          return;
        }

        var type = options.type;
        var converter = options.converter;
        var toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
        return toAttribute(value, type);
      }
    }, {
      key: "observedAttributes",
      get: function get() {
        var _this7 = this;

        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        var attributes = []; // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays

        this._classProperties.forEach(function (v, p) {
          var attr = _this7._attributeNameForProperty(p, v);

          if (attr !== undefined) {
            _this7._attributeToPropertyMap.set(attr, p);

            attributes.push(attr);
          }
        });

        return attributes;
      }
    }]);

    return UpdatingElement;
  }(wrapNativeSuper(HTMLElement));
  /**
   * Marks class as having finished creating properties.
   */

  UpdatingElement.finalized = true;

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var legacyCustomElement = function legacyCustomElement(tagName, clazz) {
    window.customElements.define(tagName, clazz); // Cast as any because TS doesn't recognize the return type as being a
    // subtype of the decorated class when clazz is typed as
    // `Constructor<HTMLElement>` for some reason.
    // `Constructor<HTMLElement>` is helpful to make sure the decorator is
    // applied to elements however.
    // tslint:disable-next-line:no-any

    return clazz;
  };

  var standardCustomElement = function standardCustomElement(tagName, descriptor) {
    var kind = descriptor.kind,
        elements = descriptor.elements;
    return {
      kind: kind,
      elements: elements,
      // This callback is called once the class is otherwise fully defined
      finisher: function finisher(clazz) {
        window.customElements.define(tagName, clazz);
      }
    };
  };
  /**
   * Class decorator factory that defines the decorated class as a custom element.
   *
   * @param tagName the name of the custom element to define
   */


  var customElement = function customElement(tagName) {
    return function (classOrDescriptor) {
      return typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
    };
  };

  var standardProperty = function standardProperty(options, element) {
    // When decorating an accessor, pass it through and add property metadata.
    // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
    // stomp over the user's accessor.
    if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
      return Object.assign({}, element, {
        finisher: function finisher(clazz) {
          clazz.createProperty(element.key, options);
        }
      });
    } else {
      // createProperty() takes care of defining the property, but we still
      // must return some kind of descriptor, so return a descriptor for an
      // unused prototype field. The finisher calls createProperty().
      return {
        kind: 'field',
        key: Symbol(),
        placement: 'own',
        descriptor: {},
        // When @babel/plugin-proposal-decorators implements initializers,
        // do this instead of the initializer below. See:
        // https://github.com/babel/babel/issues/9260 extras: [
        //   {
        //     kind: 'initializer',
        //     placement: 'own',
        //     initializer: descriptor.initializer,
        //   }
        // ],
        // tslint:disable-next-line:no-any decorator
        initializer: function initializer() {
          if (typeof element.initializer === 'function') {
            this[element.key] = element.initializer.call(this);
          }
        },
        finisher: function finisher(clazz) {
          clazz.createProperty(element.key, options);
        }
      };
    }
  };

  var legacyProperty = function legacyProperty(options, proto, name) {
    proto.constructor.createProperty(name, options);
  };
  /**
   * A property decorator which creates a LitElement property which reflects a
   * corresponding attribute value. A `PropertyDeclaration` may optionally be
   * supplied to configure property features.
   *
   * @ExportDecoratedItems
   */


  function property(options) {
    // tslint:disable-next-line:no-any decorator
    return function (protoOrDescriptor, name) {
      return name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
    };
  }

  /**
  @license
  Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at
  http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
  http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
  found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
  part of the polymer project is also subject to an additional IP rights grant
  found at http://polymer.github.io/PATENTS.txt
  */
  var supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
  var constructionToken = Symbol();
  var CSSResult =
  /*#__PURE__*/
  function () {
    function CSSResult(cssText, safeToken) {
      classCallCheck(this, CSSResult);

      if (safeToken !== constructionToken) {
        throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
      }

      this.cssText = cssText;
    } // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.


    createClass(CSSResult, [{
      key: "toString",
      value: function toString() {
        return this.cssText;
      }
    }, {
      key: "styleSheet",
      get: function get() {
        if (this._styleSheet === undefined) {
          // Note, if `adoptedStyleSheets` is supported then we assume CSSStyleSheet
          // is constructable.
          if (supportsAdoptingStyleSheets) {
            this._styleSheet = new CSSStyleSheet();

            this._styleSheet.replaceSync(this.cssText);
          } else {
            this._styleSheet = null;
          }
        }

        return this._styleSheet;
      }
    }]);

    return CSSResult;
  }();

  var textFromCSSResult = function textFromCSSResult(value) {
    if (value instanceof CSSResult) {
      return value.cssText;
    } else {
      throw new Error("Value passed to 'css' function must be a 'css' function result: ".concat(value, ". Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security."));
    }
  };
  /**
   * Template tag which which can be used with LitElement's `style` property to
   * set element styles. For security reasons, only literal string values may be
   * used. To incorporate non-literal values `unsafeCSS` may be used inside a
   * template string part.
   */


  var css = function css(strings) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    var cssText = values.reduce(function (acc, v, idx) {
      return acc + textFromCSSResult(v) + strings[idx + 1];
    }, strings[0]);
    return new CSSResult(cssText, constructionToken);
  };

  // This line will be used in regexes to search for LitElement usage.
  // TODO(justinfagnani): inject version number at build time

  (window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.0.1');
  /**
   * Minimal implementation of Array.prototype.flat
   * @param arr the array to flatten
   * @param result the accumlated result
   */

  function arrayFlat(styles) {
    var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    for (var i = 0, length = styles.length; i < length; i++) {
      var value = styles[i];

      if (Array.isArray(value)) {
        arrayFlat(value, result);
      } else {
        result.push(value);
      }
    }

    return result;
  }
  /** Deeply flattens styles array. Uses native flat if available. */


  var flattenStyles = function flattenStyles(styles) {
    return styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
  };

  var LitElement =
  /*#__PURE__*/
  function (_UpdatingElement) {
    inherits(LitElement, _UpdatingElement);

    function LitElement() {
      classCallCheck(this, LitElement);

      return possibleConstructorReturn(this, getPrototypeOf(LitElement).apply(this, arguments));
    }

    createClass(LitElement, [{
      key: "initialize",

      /**
       * Performs element initialization. By default this calls `createRenderRoot`
       * to create the element `renderRoot` node and captures any pre-set values for
       * registered properties.
       */
      value: function initialize() {
        get(getPrototypeOf(LitElement.prototype), "initialize", this).call(this);

        this.renderRoot = this.createRenderRoot(); // Note, if renderRoot is not a shadowRoot, styles would/could apply to the
        // element's getRootNode(). While this could be done, we're choosing not to
        // support this now since it would require different logic around de-duping.

        if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
          this.adoptStyles();
        }
      }
      /**
       * Returns the node into which the element should render and by default
       * creates and returns an open shadowRoot. Implement to customize where the
       * element's DOM is rendered. For example, to render into the element's
       * childNodes, return `this`.
       * @returns {Element|DocumentFragment} Returns a node into which to render.
       */

    }, {
      key: "createRenderRoot",
      value: function createRenderRoot() {
        return this.attachShadow({
          mode: 'open'
        });
      }
      /**
       * Applies styling to the element shadowRoot using the `static get styles`
       * property. Styling will apply using `shadowRoot.adoptedStyleSheets` where
       * available and will fallback otherwise. When Shadow DOM is polyfilled,
       * ShadyCSS scopes styles and adds them to the document. When Shadow DOM
       * is available but `adoptedStyleSheets` is not, styles are appended to the
       * end of the `shadowRoot` to [mimic spec
       * behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
       */

    }, {
      key: "adoptStyles",
      value: function adoptStyles() {
        var styles = this.constructor._styles;

        if (styles.length === 0) {
          return;
        } // There are three separate cases here based on Shadow DOM support.
        // (1) shadowRoot polyfilled: use ShadyCSS
        // (2) shadowRoot.adoptedStyleSheets available: use it.
        // (3) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering


        if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
          window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(function (s) {
            return s.cssText;
          }), this.localName);
        } else if (supportsAdoptingStyleSheets) {
          this.renderRoot.adoptedStyleSheets = styles.map(function (s) {
            return s.styleSheet;
          });
        } else {
          // This must be done after rendering so the actual style insertion is done
          // in `update`.
          this._needsShimAdoptedStyleSheets = true;
        }
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        get(getPrototypeOf(LitElement.prototype), "connectedCallback", this).call(this); // Note, first update/render handles styleElement so we only call this if
        // connected after first update.


        if (this.hasUpdated && window.ShadyCSS !== undefined) {
          window.ShadyCSS.styleElement(this);
        }
      }
      /**
       * Updates the element. This method reflects property values to attributes
       * and calls `render` to render DOM via lit-html. Setting properties inside
       * this method will *not* trigger another update.
       * * @param _changedProperties Map of changed properties with old values
       */

    }, {
      key: "update",
      value: function update(changedProperties) {
        var _this = this;

        get(getPrototypeOf(LitElement.prototype), "update", this).call(this, changedProperties);

        var templateResult = this.render();

        if (templateResult instanceof TemplateResult) {
          this.constructor.render(templateResult, this.renderRoot, {
            scopeName: this.localName,
            eventContext: this
          });
        } // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.


        if (this._needsShimAdoptedStyleSheets) {
          this._needsShimAdoptedStyleSheets = false;

          this.constructor._styles.forEach(function (s) {
            var style = document.createElement('style');
            style.textContent = s.cssText;

            _this.renderRoot.appendChild(style);
          });
        }
      }
      /**
       * Invoked on each update to perform rendering tasks. This method must return
       * a lit-html TemplateResult. Setting properties inside this method will *not*
       * trigger the element to update.
       */

    }, {
      key: "render",
      value: function render() {}
    }], [{
      key: "finalize",

      /** @nocollapse */
      value: function finalize() {
        get(getPrototypeOf(LitElement), "finalize", this).call(this); // Prepare styling that is stamped at first render time. Styling
        // is built from user provided `styles` or is inherited from the superclass.


        this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ? this._getUniqueStyles() : this._styles || [];
      }
      /** @nocollapse */

    }, {
      key: "_getUniqueStyles",
      value: function _getUniqueStyles() {
        // Take care not to call `this.styles` multiple times since this generates
        // new CSSResults each time.
        // TODO(sorvell): Since we do not cache CSSResults by input, any
        // shared styles will generate new stylesheet objects, which is wasteful.
        // This should be addressed when a browser ships constructable
        // stylesheets.
        var userStyles = this.styles;
        var styles = [];

        if (Array.isArray(userStyles)) {
          var flatStyles = flattenStyles(userStyles); // As a performance optimization to avoid duplicated styling that can
          // occur especially when composing via subclassing, de-duplicate styles
          // preserving the last item in the list. The last item is kept to
          // try to preserve cascade order with the assumption that it's most
          // important that last added styles override previous styles.

          var styleSet = flatStyles.reduceRight(function (set, s) {
            set.add(s); // on IE set.add does not return the set.

            return set;
          }, new Set()); // Array.from does not work on Set in IE

          styleSet.forEach(function (v) {
            return styles.unshift(v);
          });
        } else if (userStyles) {
          styles.push(userStyles);
        }

        return styles;
      }
    }]);

    return LitElement;
  }(UpdatingElement);
  /**
   * Ensure this class is marked as `finalized` as an optimization ensuring
   * it will not needlessly try to `finalize`.
   */

  LitElement.finalized = true;
  /**
   * Render method used to render the lit-html TemplateResult to the element's
   * DOM.
   * @param {TemplateResult} Template to render.
   * @param {Element|DocumentFragment} Node into which to render.
   * @param {String} Element name.
   * @nocollapse
   */

  LitElement.render = render$1;

  var pfPrefix = 'pf'; // Because we're going to have a bunch of exports

  var styles = css([
    '/* stylelint-enable */\n/* stylelint-disable */\n/* stylelint-enable */\n:root {\n  --pf-global--BackgroundColor--100: #fff;\n  --pf-global--BackgroundColor--150: #f5f5f5;\n  --pf-global--BackgroundColor--200: #fafafa;\n  --pf-global--BackgroundColor--300: #ededed;\n  --pf-global--BackgroundColor--light-100: #fff;\n  --pf-global--BackgroundColor--light-200: #fafafa;\n  --pf-global--BackgroundColor--light-300: #ededed;\n  --pf-global--BackgroundColor--dark-100: #151515;\n  --pf-global--BackgroundColor--dark-200: #393f44;\n  --pf-global--BackgroundColor--dark-transparent-100: rgba(3, 3, 3, 0.62);\n  --pf-global--BackgroundColor--dark-transparent-200: rgba(3, 3, 3, 0.32);\n  --pf-global--Color--100: #151515;\n  --pf-global--Color--200: #72767b;\n  --pf-global--Color--300: #393f44;\n  --pf-global--Color--400: #8b8d8f;\n  --pf-global--Color--light-100: #fff;\n  --pf-global--Color--light-200: #ededed;\n  --pf-global--Color--dark-100: #151515;\n  --pf-global--Color--dark-200: #72767b;\n  --pf-global--active-color--100: #06c;\n  --pf-global--active-color--200: #bee1f4;\n  --pf-global--active-color--300: #73bcf7;\n  --pf-global--active-color--400: #2b9af3;\n  --pf-global--disabled-color--100: #72767b;\n  --pf-global--disabled-color--200: #d2d2d2;\n  --pf-global--disabled-color--300: #ededed;\n  --pf-global--primary-color--100: #06c;\n  --pf-global--primary-color--200: #004080;\n  --pf-global--primary-color--light-100: #73bcf7;\n  --pf-global--primary-color--dark-100: #06c;\n  --pf-global--secondary-color--100: #72767b;\n  --pf-global--default-color--100: #73c5c5;\n  --pf-global--default-color--200: #009596;\n  --pf-global--default-color--300: #003737;\n  --pf-global--success-color--100: #92d400;\n  --pf-global--success-color--200: #486b00;\n  --pf-global--info-color--100: #73bcf7;\n  --pf-global--info-color--200: #004368;\n  --pf-global--warning-color--100: #f0ab00;\n  --pf-global--warning-color--200: #795600;\n  --pf-global--danger-color--100: #c9190b;\n  --pf-global--danger-color--200: #a30000;\n  --pf-global--danger-color--300: #470000;\n  --pf-global--BoxShadow--sm: 0 0.0625rem 0.125rem 0 rgba(3, 3, 3, 0.2);\n  --pf-global--BoxShadow--sm-right: 0.25rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-left: -0.25rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-bottom: 0 0.25rem 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-top: 0 -0.25rem 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--md: 0 0.0625rem 0.0625rem 0rem rgba(3, 3, 3, 0.05), 0 0.25rem 0.5rem 0.25rem rgba(3, 3, 3, 0.06);\n  --pf-global--BoxShadow--md-right: 0.3125rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-left: -0.3125rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-bottom: 0 0.3125rem 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-top: 0 -0.3125rem 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--lg: 0 0.1875rem 0.4375rem 0.1875rem rgba(3, 3, 3, 0.13), 0 0.6875rem 1.5rem 1rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--lg-right: 0.75rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-left: -0.75rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-bottom: 0 0.75rem 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-top: 0 -0.75rem 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--inset: inset 0 0 0.625rem 0 rgba(3, 3, 3, 0.25);\n  --pf-global--font-path: ./assets/fonts;\n  --pf-global--fonticon-path: ./assets/pficon;\n  --pf-global--spacer--xs: 0.25rem;\n  --pf-global--spacer--sm: 0.5rem;\n  --pf-global--spacer--md: 1rem;\n  --pf-global--spacer--lg: 1.5rem;\n  --pf-global--spacer--xl: 2rem;\n  --pf-global--spacer--2xl: 3rem;\n  --pf-global--spacer--3xl: 4rem;\n  --pf-global--spacer--form-element: 0.375rem;\n  --pf-global--gutter: 1.5rem;\n  --pf-global--gutter--md: 1rem;\n  --pf-global--golden-ratio: 1.681;\n  --pf-global--ZIndex--xs: 100;\n  --pf-global--ZIndex--sm: 200;\n  --pf-global--ZIndex--md: 300;\n  --pf-global--ZIndex--lg: 400;\n  --pf-global--ZIndex--xl: 500;\n  --pf-global--ZIndex--2xl: 600;\n  --pf-global--breakpoint--xs: 0;\n  --pf-global--breakpoint--sm: 576px;\n  --pf-global--breakpoint--md: 768px;\n  --pf-global--breakpoint--lg: 992px;\n  --pf-global--breakpoint--xl: 1200px;\n  --pf-global--breakpoint--2xl: 1450px;\n  --pf-global--link--Color: #06c;\n  --pf-global--link--Color--hover: #004080;\n  --pf-global--link--Color--light: #73bcf7;\n  --pf-global--link--Color--light--hover: #2b9af3;\n  --pf-global--link--Color--dark: #06c;\n  --pf-global--link--Color--dark--hover: #004080;\n  --pf-global--link--FontWeight: 500;\n  --pf-global--link--TextDecoration: none;\n  --pf-global--link--TextDecoration--hover: underline;\n  --pf-global--BorderWidth--sm: 1px;\n  --pf-global--BorderWidth--md: 2px;\n  --pf-global--BorderWidth--lg: 3px;\n  --pf-global--BorderColor--100: #d2d2d2;\n  --pf-global--BorderColor--200: #8b8d8f;\n  --pf-global--BorderColor--300: #ededed;\n  --pf-global--BorderColor--dark-100: #d2d2d2;\n  --pf-global--BorderColor--light-100: #bbb;\n  --pf-global--BorderRadius--sm: 3px;\n  --pf-global--BorderRadius--lg: 30em;\n  --pf-global--icon--Color--light: #72767b;\n  --pf-global--icon--Color--dark: #151515;\n  --pf-global--icon--FontSize--sm: 0.625rem;\n  --pf-global--icon--FontSize--md: 1.125rem;\n  --pf-global--icon--FontSize--lg: 1.5rem;\n  --pf-global--icon--FontSize--xl: 3.375rem;\n  --pf-global--FontFamily--sans-serif: overpass, overpass, open sans, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  --pf-global--FontFamily--heading--sans-serif: overpass, overpass, open sans, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  --pf-global--FontFamily--monospace: overpass-mono, overpass-mono, SFMono-Regular, menlo, monaco, consolas, Liberation Mono, Courier New, monospace;\n  --pf-global--FontFamily--redhatfont--sans-serif: RedHatText, Overpass, overpass, helvetica, arial, sans-serif;\n  --pf-global--FontFamily--redhatfont--heading--sans-serif: RedHatDisplay, Overpass, overpass, helvetica, arial, sans-serif;\n  --pf-global--FontSize--4xl: 2.25rem;\n  --pf-global--FontSize--3xl: 1.75rem;\n  --pf-global--FontSize--2xl: 1.5rem;\n  --pf-global--FontSize--xl: 1.25rem;\n  --pf-global--FontSize--lg: 1.125rem;\n  --pf-global--FontSize--md: 1rem;\n  --pf-global--FontSize--sm: 0.875rem;\n  --pf-global--FontSize--xs: 0.75rem;\n  --pf-global--FontWeight--light: 300;\n  --pf-global--FontWeight--normal: 400;\n  --pf-global--FontWeight--semi-bold: 500;\n  --pf-global--FontWeight--bold: 600;\n  --pf-global--FontWeight--redhatfont--bold: 700;\n  --pf-global--LineHeight--sm: 1.3;\n  --pf-global--LineHeight--md: 1.5;\n  --pf-global--ListStyle: disc outside;\n  --pf-global--Transition: all 250ms cubic-bezier(0.42, 0, 0.58, 1);\n  --pf-global--TimingFunction: cubic-bezier(0.645, 0.045, 0.355, 1);\n  --pf-global--TransitionDuration: 250ms;\n  --pf-global--arrow--width: 0.9375rem;\n  --pf-global--arrow--width-lg: 1.5625rem;\n  --pf-global--target-size--MinWidth: 44px;\n  --pf-global--target-size--MinHeight: 44px; }\n\n.pf-m-redhat-font {\n  --pf-global--FontFamily--sans-serif: var(--pf-global--FontFamily--redhatfont--sans-serif);\n  --pf-global--FontFamily--heading--sans-serif: var(--pf-global--FontFamily--redhatfont--heading--sans-serif);\n  --pf-global--FontWeight--semi-bold: var(--pf-global--FontWeight--redhatfont--bold);\n  --pf-global--FontWeight--bold: var(--pf-global--FontWeight--redhatfont--bold);\n  --pf-global--link--FontWeight: var(--pf-global--FontWeight--normal); }\n\n.pf-c-button {\n  --pf-c-button--PaddingTop: var(--pf-global--spacer--form-element);\n  --pf-c-button--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-button--PaddingBottom: var(--pf-global--spacer--form-element);\n  --pf-c-button--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-button--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-button--FontWeight: var(--pf-global--FontWeight--semi-bold);\n  --pf-c-button--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-button--BorderRadius: var(--pf-global--BorderRadius--sm);\n  --pf-c-button--BorderColor: transparent;\n  --pf-c-button--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-button--hover--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-button--focus--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-button--active--BorderWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-button--disabled--Color: var(--pf-global--disabled-color--100);\n  --pf-c-button--disabled--BackgroundColor: var(--pf-global--disabled-color--200);\n  --pf-c-button--disabled--BorderColor: transparent;\n  --pf-c-button--m-primary--BackgroundColor: var(--pf-global--primary-color--100);\n  --pf-c-button--m-primary--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-primary--hover--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-button--m-primary--hover--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-primary--focus--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-button--m-primary--focus--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-primary--active--BackgroundColor: var(--pf-global--primary-color--200);\n  --pf-c-button--m-primary--active--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-secondary--BackgroundColor: transparent;\n  --pf-c-button--m-secondary--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-button--m-secondary--Color: var(--pf-global--primary-color--100);\n  --pf-c-button--m-secondary--hover--BackgroundColor: transparent;\n  --pf-c-button--m-secondary--hover--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-button--m-secondary--hover--Color: var(--pf-global--primary-color--100);\n  --pf-c-button--m-secondary--focus--BackgroundColor: transparent;\n  --pf-c-button--m-secondary--focus--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-button--m-secondary--focus--Color: var(--pf-global--primary-color--100);\n  --pf-c-button--m-secondary--active--BackgroundColor: transparent;\n  --pf-c-button--m-secondary--active--BorderColor: var(--pf-global--primary-color--100);\n  --pf-c-button--m-secondary--active--Color: var(--pf-global--primary-color--100);\n  --pf-c-button--m-tertiary--BackgroundColor: transparent;\n  --pf-c-button--m-tertiary--BorderColor: var(--pf-global--Color--100);\n  --pf-c-button--m-tertiary--Color: var(--pf-global--Color--100);\n  --pf-c-button--m-tertiary--hover--BackgroundColor: transparent;\n  --pf-c-button--m-tertiary--hover--BorderColor: var(--pf-global--Color--100);\n  --pf-c-button--m-tertiary--hover--Color: var(--pf-global--Color--100);\n  --pf-c-button--m-tertiary--focus--BackgroundColor: transparent;\n  --pf-c-button--m-tertiary--focus--BorderColor: var(--pf-global--Color--100);\n  --pf-c-button--m-tertiary--focus--Color: var(--pf-global--Color--100);\n  --pf-c-button--m-tertiary--active--BackgroundColor: transparent;\n  --pf-c-button--m-tertiary--active--BorderColor: var(--pf-global--Color--100);\n  --pf-c-button--m-tertiary--active--Color: var(--pf-global--Color--100);\n  --pf-c-button--m-danger--BackgroundColor: var(--pf-global--danger-color--100);\n  --pf-c-button--m-danger--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-danger--hover--BackgroundColor: var(--pf-global--danger-color--200);\n  --pf-c-button--m-danger--hover--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-danger--focus--BackgroundColor: var(--pf-global--danger-color--200);\n  --pf-c-button--m-danger--focus--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-danger--active--BackgroundColor: var(--pf-global--danger-color--200);\n  --pf-c-button--m-danger--active--Color: var(--pf-global--Color--light-100);\n  --pf-c-button--m-link--Color: var(--pf-global--link--Color);\n  --pf-c-button--m-link--hover--Color: var(--pf-global--link--Color--hover);\n  --pf-c-button--m-link--focus--Color: var(--pf-global--link--Color--hover);\n  --pf-c-button--m-link--active--Color: var(--pf-global--link--Color--hover);\n  --pf-c-button--m-link--disabled--BackgroundColor: transparent;\n  --pf-c-button--m-link--m-inline--hover--TextDecoration: var(--pf-global--link--TextDecoration--hover);\n  --pf-c-button--m-link--m-inline--hover--Color: var(--pf-global--link--Color--hover);\n  --pf-c-button--m-plain--Color: var(--pf-global--Color--200);\n  --pf-c-button--m-plain--hover--Color: var(--pf-global--Color--100);\n  --pf-c-button--m-plain--focus--Color: var(--pf-global--Color--100);\n  --pf-c-button--m-plain--active--Color: var(--pf-global--Color--100);\n  --pf-c-button--m-plain--disabled--Color: var(--pf-global--disabled-color--200);\n  --pf-c-button--m-plain--disabled--BackgroundColor: transparent;\n  --pf-c-button__icon--MarginRight: var(--pf-global--spacer--xs);\n  position: relative;\n  display: inline-block;\n  padding: var(--pf-c-button--PaddingTop) var(--pf-c-button--PaddingRight) var(--pf-c-button--PaddingBottom) var(--pf-c-button--PaddingLeft);\n  font-size: var(--pf-c-button--FontSize);\n  font-weight: var(--pf-c-button--FontWeight);\n  line-height: var(--pf-c-button--LineHeight);\n  text-align: center;\n  white-space: nowrap;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 0;\n  border-radius: var(--pf-c-button--BorderRadius); }\n  .pf-c-button .pf-c-button__icon {\n    margin-right: var(--pf-c-button__icon--MarginRight); }\n  .pf-c-button::after {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    content: "";\n    border: var(--pf-c-button--BorderWidth) solid var(--pf-c-button--BorderColor);\n    border-radius: var(--pf-c-button--BorderRadius); }\n  .pf-c-button:hover, .pf-c-button.pf-m-hover {\n    text-decoration: none; }\n    .pf-c-button:hover::after, .pf-c-button.pf-m-hover::after {\n      --pf-c-button--BorderWidth: var(--pf-c-button--hover--BorderWidth); }\n  .pf-c-button:active::after, .pf-c-button.pf-m-active::after {\n    --pf-c-button--BorderWidth: var(--pf-c-button--active--BorderWidth); }\n  .pf-c-button:focus::after, .pf-c-button.pf-m-focus::after {\n    --pf-c-button--BorderWidth: var(--pf-c-button--focus--BorderWidth); }\n  .pf-c-button.pf-m-block {\n    display: block;\n    width: 100%; }\n  .pf-c-button.pf-m-primary {\n    color: var(--pf-c-button--m-primary--Color);\n    background-color: var(--pf-c-button--m-primary--BackgroundColor); }\n    .pf-c-button.pf-m-primary:hover, .pf-c-button.pf-m-primary.pf-m-hover {\n      --pf-c-button--m-primary--Color: var(--pf-c-button--m-primary--hover--Color);\n      --pf-c-button--m-primary--BackgroundColor: var(--pf-c-button--m-primary--hover--BackgroundColor); }\n    .pf-c-button.pf-m-primary:active, .pf-c-button.pf-m-primary.pf-m-active {\n      --pf-c-button--m-primary--Color: var(--pf-c-button--m-primary--active--Color);\n      --pf-c-button--m-primary--BackgroundColor: var(--pf-c-button--m-primary--active--BackgroundColor); }\n    .pf-c-button.pf-m-primary:focus, .pf-c-button.pf-m-primary.pf-m-focus {\n      --pf-c-button--m-primary--Color: var(--pf-c-button--m-primary--focus--Color);\n      --pf-c-button--m-primary--BackgroundColor: var(--pf-c-button--m-primary--focus--BackgroundColor); }\n  .pf-c-button.pf-m-secondary {\n    color: var(--pf-c-button--m-secondary--Color);\n    background-color: var(--pf-c-button--m-secondary--BackgroundColor); }\n    .pf-c-button.pf-m-secondary::after {\n      --pf-c-button--BorderColor: var(--pf-c-button--m-secondary--BorderColor); }\n    .pf-c-button.pf-m-secondary:hover, .pf-c-button.pf-m-secondary.pf-m-hover {\n      --pf-c-button--m-secondary--Color: var(--pf-c-button--m-secondary--hover--Color);\n      --pf-c-button--m-secondary--BackgroundColor: var(--pf-c-button--m-secondary--hover--BackgroundColor); }\n      .pf-c-button.pf-m-secondary:hover::after, .pf-c-button.pf-m-secondary.pf-m-hover::after {\n        --pf-c-button--BorderColor: var(--pf-c-button--m-secondary--hover--BorderColor); }\n    .pf-c-button.pf-m-secondary:active, .pf-c-button.pf-m-secondary.pf-m-active {\n      --pf-c-button--m-secondary--Color: var(--pf-c-button--m-secondary--active--Color);\n      --pf-c-button--m-secondary--BackgroundColor: var(--pf-c-button--m-secondary--active--BackgroundColor); }\n      .pf-c-button.pf-m-secondary:active::after, .pf-c-button.pf-m-secondary.pf-m-active::after {\n        --pf-c-button--BorderColor: var(--pf-c-button--m-secondary--active--BorderColor); }\n    .pf-c-button.pf-m-secondary:focus, .pf-c-button.pf-m-secondary.pf-m-focus {\n      --pf-c-button--m-secondary--Color: var(--pf-c-button--m-secondary--focus--Color);\n      --pf-c-button--m-secondary--BackgroundColor: var(--pf-c-button--m-secondary--focus--BackgroundColor); }\n      .pf-c-button.pf-m-secondary:focus::after, .pf-c-button.pf-m-secondary.pf-m-focus::after {\n        --pf-c-button--BorderColor: var(--pf-c-button--m-secondary--focus--BorderColor); }\n  .pf-c-button.pf-m-tertiary {\n    color: var(--pf-c-button--m-tertiary--Color);\n    background-color: var(--pf-c-button--m-tertiary--BackgroundColor); }\n    .pf-c-button.pf-m-tertiary::after {\n      --pf-c-button--BorderColor: var(--pf-c-button--m-tertiary--BorderColor); }\n    .pf-c-button.pf-m-tertiary:hover, .pf-c-button.pf-m-tertiary.pf-m-hover {\n      --pf-c-button--m-tertiary--Color: var(--pf-c-button--m-tertiary--hover--Color);\n      --pf-c-button--m-tertiary--BackgroundColor: var(--pf-c-button--m-tertiary--hover--BackgroundColor); }\n      .pf-c-button.pf-m-tertiary:hover::after, .pf-c-button.pf-m-tertiary.pf-m-hover::after {\n        --pf-c-button--BorderColor: var(--pf-c-button--m-tertiary--hover--BorderColor); }\n    .pf-c-button.pf-m-tertiary:active, .pf-c-button.pf-m-tertiary.pf-m-active {\n      --pf-c-button--m-tertiary--Color: var(--pf-c-button--m-tertiary--active--Color);\n      --pf-c-button--m-tertiary--BackgroundColor: var(--pf-c-button--m-tertiary--active--BackgroundColor); }\n      .pf-c-button.pf-m-tertiary:active::after, .pf-c-button.pf-m-tertiary.pf-m-active::after {\n        --pf-c-button--BorderColor: var(--pf-c-button--m-tertiary--active--BorderColor); }\n    .pf-c-button.pf-m-tertiary:focus, .pf-c-button.pf-m-tertiary.pf-m-focus {\n      --pf-c-button--m-tertiary--Color: var(--pf-c-button--m-tertiary--focus--Color);\n      --pf-c-button--m-tertiary--BackgroundColor: var(--pf-c-button--m-tertiary--focus--BackgroundColor); }\n      .pf-c-button.pf-m-tertiary:focus::after, .pf-c-button.pf-m-tertiary.pf-m-focus::after {\n        --pf-c-button--BorderColor: var(--pf-c-button--m-tertiary--focus--BorderColor); }\n  .pf-c-button.pf-m-danger {\n    color: var(--pf-c-button--m-danger--Color);\n    background-color: var(--pf-c-button--m-danger--BackgroundColor); }\n    .pf-c-button.pf-m-danger:hover, .pf-c-button.pf-m-danger.pf-m-hover {\n      --pf-c-button--m-danger--Color: var(--pf-c-button--m-danger--hover--Color);\n      --pf-c-button--m-danger--BackgroundColor: var(--pf-c-button--m-danger--hover--BackgroundColor); }\n    .pf-c-button.pf-m-danger:active, .pf-c-button.pf-m-danger.pf-m-active {\n      --pf-c-button--m-danger--Color: var(--pf-c-button--m-danger--active--Color);\n      --pf-c-button--m-danger--BackgroundColor: var(--pf-c-button--m-danger--active--BackgroundColor); }\n    .pf-c-button.pf-m-danger:focus, .pf-c-button.pf-m-danger.pf-m-focus {\n      --pf-c-button--m-danger--Color: var(--pf-c-button--m-danger--focus--Color);\n      --pf-c-button--m-danger--BackgroundColor: var(--pf-c-button--m-danger--focus--BackgroundColor); }\n  .pf-c-button.pf-m-link {\n    color: var(--pf-c-button--m-link--Color); }\n    .pf-c-button.pf-m-link:not(.pf-m-inline):hover, .pf-c-button.pf-m-link:not(.pf-m-inline).pf-m-hover {\n      --pf-c-button--m-link--Color: var(--pf-c-button--m-link--hover--Color); }\n    .pf-c-button.pf-m-link:not(.pf-m-inline):active, .pf-c-button.pf-m-link:not(.pf-m-inline).pf-m-active {\n      --pf-c-button--m-link--Color: var(--pf-c-button--m-link--active--Color); }\n    .pf-c-button.pf-m-link:not(.pf-m-inline):focus, .pf-c-button.pf-m-link:not(.pf-m-inline).pf-m-focus {\n      --pf-c-button--m-link--Color: var(--pf-c-button--m-link--focus--Color); }\n    .pf-c-button.pf-m-link:disabled, .pf-c-button.pf-m-link.pf-m-disabled {\n      background-color: var(--pf-c-button--m-link--disabled--BackgroundColor); }\n    .pf-c-button.pf-m-link.pf-m-inline {\n      display: inline;\n      padding: 0; }\n      .pf-c-button.pf-m-link.pf-m-inline:hover {\n        --pf-c-button--m-link--Color: var(--pf-c-button--m-link--m-inline--hover--Color);\n        -webkit-text-decoration: var(--pf-c-button--m-link--m-inline--hover--TextDecoration);\n                text-decoration: var(--pf-c-button--m-link--m-inline--hover--TextDecoration); }\n  .pf-c-button:disabled, .pf-c-button.pf-m-disabled {\n    color: var(--pf-c-button--disabled--Color);\n    pointer-events: none;\n    background-color: var(--pf-c-button--disabled--BackgroundColor); }\n    .pf-c-button:disabled::after, .pf-c-button.pf-m-disabled::after {\n      --pf-c-button--BorderColor: var(--pf-c-button--disabled--BorderColor); }\n  .pf-c-button.pf-m-plain {\n    color: var(--pf-c-button--m-plain--Color); }\n    .pf-c-button.pf-m-plain:hover, .pf-c-button.pf-m-plain.pf-m-hover {\n      --pf-c-button--m-plain--Color: var(--pf-c-button--m-plain--hover--Color); }\n    .pf-c-button.pf-m-plain:active, .pf-c-button.pf-m-plain.pf-m-active {\n      --pf-c-button--m-plain--Color: var(--pf-c-button--m-plain--active--Color); }\n    .pf-c-button.pf-m-plain:focus, .pf-c-button.pf-m-plain.pf-m-focus {\n      --pf-c-button--m-plain--Color: var(--pf-c-button--m-plain--focus--Color); }\n    .pf-c-button.pf-m-plain:disabled, .pf-c-button.pf-m-plain.pf-m-disabled {\n      --pf-c-button--m-plain--Color: var(--pf-c-button--m-plain--disabled--Color);\n      background-color: var(--pf-c-button--m-plain--disabled--BackgroundColor); }\n\n.pf-m-redhat-font .pf-c-button {\n  --pf-c-button--FontWeight: var(--pf-global--FontWeight--normal); }\n\n:host(pf-btn) {\n  display: inline-flex; }\n',
  ]);

  function _templateObject() {
    var data = taggedTemplateLiteral(["\n      <button id=\"button\" class=\"", "\" ?disabled=", "><slot></slot></button>\n    "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Button kinds.
   */

  var BUTTON_KIND;
  /**
   * Button.
   */

  (function (BUTTON_KIND) {
    BUTTON_KIND["PRIMARY"] = "primary";
    BUTTON_KIND["SECONDARY"] = "secondary";
    BUTTON_KIND["TERTIARY"] = "tertiary";
    BUTTON_KIND["DANGER"] = "danger";
    BUTTON_KIND["LINK"] = "link";
    BUTTON_KIND["PLAIN"] = "plain";
    BUTTON_KIND["INLINE"] = "inline";
  })(BUTTON_KIND || (BUTTON_KIND = {}));

  var PFButton = decorate([customElement("".concat(pfPrefix, "-btn"))], function (_initialize, _LitElement) {
    var PFButton =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFButton, _LitElement2);

      function PFButton() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFButton);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFButton;
    }(_LitElement);

    return {
      F: PFButton,
      d: [{
        kind: "field",
        decorators: [property({
          type: Boolean,
          reflect: true
        })],
        key: "disabled",
        value: function value() {
          return false;
        }
      }, {
        kind: "field",
        decorators: [property({
          reflect: true
        })],
        key: "kind",
        value: function value() {
          return BUTTON_KIND.PRIMARY;
        }
      }, {
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * `true` if the button should be disabled. Corresponds to the attribute with the same name.
         */

        /**
         * Button kind. Corresponds to the attribute with the same name.
         */

        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var disabled = this.disabled,
              kind = this.kind,
              additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-button"), defineProperty({}, "".concat(pfPrefix, "-m-").concat(kind), kind));
          return html(_templateObject(), classes, disabled);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles;
        }
      }]
    };
  }, LitElement);

  var styles$1 = css([
    '/* stylelint-enable */\n/* stylelint-disable */\n/* stylelint-enable */\n:root {\n  --pf-global--BackgroundColor--100: #fff;\n  --pf-global--BackgroundColor--150: #f5f5f5;\n  --pf-global--BackgroundColor--200: #fafafa;\n  --pf-global--BackgroundColor--300: #ededed;\n  --pf-global--BackgroundColor--light-100: #fff;\n  --pf-global--BackgroundColor--light-200: #fafafa;\n  --pf-global--BackgroundColor--light-300: #ededed;\n  --pf-global--BackgroundColor--dark-100: #151515;\n  --pf-global--BackgroundColor--dark-200: #393f44;\n  --pf-global--BackgroundColor--dark-transparent-100: rgba(3, 3, 3, 0.62);\n  --pf-global--BackgroundColor--dark-transparent-200: rgba(3, 3, 3, 0.32);\n  --pf-global--Color--100: #151515;\n  --pf-global--Color--200: #72767b;\n  --pf-global--Color--300: #393f44;\n  --pf-global--Color--400: #8b8d8f;\n  --pf-global--Color--light-100: #fff;\n  --pf-global--Color--light-200: #ededed;\n  --pf-global--Color--dark-100: #151515;\n  --pf-global--Color--dark-200: #72767b;\n  --pf-global--active-color--100: #06c;\n  --pf-global--active-color--200: #bee1f4;\n  --pf-global--active-color--300: #73bcf7;\n  --pf-global--active-color--400: #2b9af3;\n  --pf-global--disabled-color--100: #72767b;\n  --pf-global--disabled-color--200: #d2d2d2;\n  --pf-global--disabled-color--300: #ededed;\n  --pf-global--primary-color--100: #06c;\n  --pf-global--primary-color--200: #004080;\n  --pf-global--primary-color--light-100: #73bcf7;\n  --pf-global--primary-color--dark-100: #06c;\n  --pf-global--secondary-color--100: #72767b;\n  --pf-global--default-color--100: #73c5c5;\n  --pf-global--default-color--200: #009596;\n  --pf-global--default-color--300: #003737;\n  --pf-global--success-color--100: #92d400;\n  --pf-global--success-color--200: #486b00;\n  --pf-global--info-color--100: #73bcf7;\n  --pf-global--info-color--200: #004368;\n  --pf-global--warning-color--100: #f0ab00;\n  --pf-global--warning-color--200: #795600;\n  --pf-global--danger-color--100: #c9190b;\n  --pf-global--danger-color--200: #a30000;\n  --pf-global--danger-color--300: #470000;\n  --pf-global--BoxShadow--sm: 0 0.0625rem 0.125rem 0 rgba(3, 3, 3, 0.2);\n  --pf-global--BoxShadow--sm-right: 0.25rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-left: -0.25rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-bottom: 0 0.25rem 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-top: 0 -0.25rem 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--md: 0 0.0625rem 0.0625rem 0rem rgba(3, 3, 3, 0.05), 0 0.25rem 0.5rem 0.25rem rgba(3, 3, 3, 0.06);\n  --pf-global--BoxShadow--md-right: 0.3125rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-left: -0.3125rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-bottom: 0 0.3125rem 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-top: 0 -0.3125rem 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--lg: 0 0.1875rem 0.4375rem 0.1875rem rgba(3, 3, 3, 0.13), 0 0.6875rem 1.5rem 1rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--lg-right: 0.75rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-left: -0.75rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-bottom: 0 0.75rem 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-top: 0 -0.75rem 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--inset: inset 0 0 0.625rem 0 rgba(3, 3, 3, 0.25);\n  --pf-global--font-path: ./assets/fonts;\n  --pf-global--fonticon-path: ./assets/pficon;\n  --pf-global--spacer--xs: 0.25rem;\n  --pf-global--spacer--sm: 0.5rem;\n  --pf-global--spacer--md: 1rem;\n  --pf-global--spacer--lg: 1.5rem;\n  --pf-global--spacer--xl: 2rem;\n  --pf-global--spacer--2xl: 3rem;\n  --pf-global--spacer--3xl: 4rem;\n  --pf-global--spacer--form-element: 0.375rem;\n  --pf-global--gutter: 1.5rem;\n  --pf-global--gutter--md: 1rem;\n  --pf-global--golden-ratio: 1.681;\n  --pf-global--ZIndex--xs: 100;\n  --pf-global--ZIndex--sm: 200;\n  --pf-global--ZIndex--md: 300;\n  --pf-global--ZIndex--lg: 400;\n  --pf-global--ZIndex--xl: 500;\n  --pf-global--ZIndex--2xl: 600;\n  --pf-global--breakpoint--xs: 0;\n  --pf-global--breakpoint--sm: 576px;\n  --pf-global--breakpoint--md: 768px;\n  --pf-global--breakpoint--lg: 992px;\n  --pf-global--breakpoint--xl: 1200px;\n  --pf-global--breakpoint--2xl: 1450px;\n  --pf-global--link--Color: #06c;\n  --pf-global--link--Color--hover: #004080;\n  --pf-global--link--Color--light: #73bcf7;\n  --pf-global--link--Color--light--hover: #2b9af3;\n  --pf-global--link--Color--dark: #06c;\n  --pf-global--link--Color--dark--hover: #004080;\n  --pf-global--link--FontWeight: 500;\n  --pf-global--link--TextDecoration: none;\n  --pf-global--link--TextDecoration--hover: underline;\n  --pf-global--BorderWidth--sm: 1px;\n  --pf-global--BorderWidth--md: 2px;\n  --pf-global--BorderWidth--lg: 3px;\n  --pf-global--BorderColor--100: #d2d2d2;\n  --pf-global--BorderColor--200: #8b8d8f;\n  --pf-global--BorderColor--300: #ededed;\n  --pf-global--BorderColor--dark-100: #d2d2d2;\n  --pf-global--BorderColor--light-100: #bbb;\n  --pf-global--BorderRadius--sm: 3px;\n  --pf-global--BorderRadius--lg: 30em;\n  --pf-global--icon--Color--light: #72767b;\n  --pf-global--icon--Color--dark: #151515;\n  --pf-global--icon--FontSize--sm: 0.625rem;\n  --pf-global--icon--FontSize--md: 1.125rem;\n  --pf-global--icon--FontSize--lg: 1.5rem;\n  --pf-global--icon--FontSize--xl: 3.375rem;\n  --pf-global--FontFamily--sans-serif: overpass, overpass, open sans, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  --pf-global--FontFamily--heading--sans-serif: overpass, overpass, open sans, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  --pf-global--FontFamily--monospace: overpass-mono, overpass-mono, SFMono-Regular, menlo, monaco, consolas, Liberation Mono, Courier New, monospace;\n  --pf-global--FontFamily--redhatfont--sans-serif: RedHatText, Overpass, overpass, helvetica, arial, sans-serif;\n  --pf-global--FontFamily--redhatfont--heading--sans-serif: RedHatDisplay, Overpass, overpass, helvetica, arial, sans-serif;\n  --pf-global--FontSize--4xl: 2.25rem;\n  --pf-global--FontSize--3xl: 1.75rem;\n  --pf-global--FontSize--2xl: 1.5rem;\n  --pf-global--FontSize--xl: 1.25rem;\n  --pf-global--FontSize--lg: 1.125rem;\n  --pf-global--FontSize--md: 1rem;\n  --pf-global--FontSize--sm: 0.875rem;\n  --pf-global--FontSize--xs: 0.75rem;\n  --pf-global--FontWeight--light: 300;\n  --pf-global--FontWeight--normal: 400;\n  --pf-global--FontWeight--semi-bold: 500;\n  --pf-global--FontWeight--bold: 600;\n  --pf-global--FontWeight--redhatfont--bold: 700;\n  --pf-global--LineHeight--sm: 1.3;\n  --pf-global--LineHeight--md: 1.5;\n  --pf-global--ListStyle: disc outside;\n  --pf-global--Transition: all 250ms cubic-bezier(0.42, 0, 0.58, 1);\n  --pf-global--TimingFunction: cubic-bezier(0.645, 0.045, 0.355, 1);\n  --pf-global--TransitionDuration: 250ms;\n  --pf-global--arrow--width: 0.9375rem;\n  --pf-global--arrow--width-lg: 1.5625rem;\n  --pf-global--target-size--MinWidth: 44px;\n  --pf-global--target-size--MinHeight: 44px; }\n\n.pf-m-redhat-font {\n  --pf-global--FontFamily--sans-serif: var(--pf-global--FontFamily--redhatfont--sans-serif);\n  --pf-global--FontFamily--heading--sans-serif: var(--pf-global--FontFamily--redhatfont--heading--sans-serif);\n  --pf-global--FontWeight--semi-bold: var(--pf-global--FontWeight--redhatfont--bold);\n  --pf-global--FontWeight--bold: var(--pf-global--FontWeight--redhatfont--bold);\n  --pf-global--link--FontWeight: var(--pf-global--FontWeight--normal); }\n\n.pf-c-dropdown {\n  --pf-c-dropdown__toggle--PaddingTop: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--PaddingBottom: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--MinWidth: var(--pf-global--target-size--MinWidth);\n  --pf-c-dropdown__toggle--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-dropdown__toggle--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-dropdown__toggle--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__toggle--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-dropdown__toggle--BackgroundColor: transparent;\n  --pf-c-dropdown__toggle--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-dropdown__toggle--BorderTopColor: var(--pf-global--BorderColor--300);\n  --pf-c-dropdown__toggle--BorderRightColor: var(--pf-global--BorderColor--300);\n  --pf-c-dropdown__toggle--BorderBottomColor: var(--pf-global--BorderColor--200);\n  --pf-c-dropdown__toggle--BorderLeftColor: var(--pf-global--BorderColor--300);\n  --pf-c-dropdown__toggle--hover--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown__toggle--active--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--active--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown__toggle--focus--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--focus--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown__toggle--expanded--BorderBottomWidth: var(--pf-global--BorderWidth--md);\n  --pf-c-dropdown__toggle--expanded--BorderBottomColor: var(--pf-global--active-color--100);\n  --pf-c-dropdown__toggle--disabled--BackgroundColor: var(--pf-global--disabled-color--300);\n  --pf-c-dropdown__toggle--m-plain--BorderColor: transparent;\n  --pf-c-dropdown__toggle--m-plain--Color: var(--pf-global--Color--200);\n  --pf-c-dropdown__toggle--m-plain--hover--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__toggle--m-plain--disabled--Color: var(--pf-global--disabled-color--200);\n  --pf-c-dropdown__toggle-button--Color: var(--pf-global--Color--100);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingTop: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingRight: var(--pf-global--spacer--xs);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingBottom: var(--pf-global--spacer--form-element);\n  --pf-c-dropdown__toggle--m-split-button--child--PaddingLeft: var(--pf-global--spacer--xs);\n  --pf-c-dropdown__toggle--m-split-button--child--BackgroundColor: transparent;\n  --pf-c-dropdown__toggle--m-split-button--first-child--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--m-split-button--last-child--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle--m-split-button__toggle-check__input--Transform: translateY(-0.0625rem);\n  --pf-c-dropdown__toggle-icon--MarginRight: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__toggle-icon--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-dropdown--m-top--m-expanded__toggle-icon--Transform: rotate(180deg);\n  --pf-c-dropdown__menu--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-dropdown__menu--BorderWidth: var(--pf-global--BorderWidth--sm);\n  --pf-c-dropdown__menu--BoxShadow: var(--pf-global--BoxShadow--md);\n  --pf-c-dropdown__menu--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu--Top: calc(100% + var(--pf-global--spacer--xs));\n  --pf-c-dropdown__menu--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-dropdown--m-top__menu--Top: 0;\n  --pf-c-dropdown--m-top__menu--Transform: translateY(calc(-100% - var(--pf-global--spacer--xs)));\n  --pf-c-dropdown__menu-item--BackgroundColor: transparent;\n  --pf-c-dropdown__menu-item--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu-item--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-dropdown__menu-item--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__menu-item--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-dropdown__menu-item--FontSize: var(--pf-global--FontSize--md);\n  --pf-c-dropdown__menu-item--FontWeight: var(--pf-global--FontWeight--normal);\n  --pf-c-dropdown__menu-item--LineHeight: var(--pf-global--LineHeight--md);\n  --pf-c-dropdown__menu-item--Color: var(--pf-global--Color--dark-100);\n  --pf-c-dropdown__menu-item--hover--Color: var(--pf-global--Color--dark-100);\n  --pf-c-dropdown__menu-item--disabled--Color: var(--pf-global--Color--dark-200);\n  --pf-c-dropdown__menu-item--hover--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-dropdown__menu-item--disabled--BackgroundColor: transparent;\n  --pf-c-dropdown__c-divider--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__c-divider--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__separator--Height: var(--pf-global--BorderWidth--sm);\n  --pf-c-dropdown__separator--BackgroundColor: var(--pf-global--BorderColor--100);\n  --pf-c-dropdown__separator--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__separator--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__group--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-dropdown__group--first-child--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-dropdown__group-title--PaddingRight: var(--pf-c-dropdown__menu-item--PaddingRight);\n  --pf-c-dropdown__group-title--PaddingBottom: var(--pf-c-dropdown__menu-item--PaddingBottom);\n  --pf-c-dropdown__group-title--PaddingLeft: var(--pf-c-dropdown__menu-item--PaddingLeft);\n  --pf-c-dropdown__group-title--FontSize: var(--pf-global--FontSize--sm);\n  --pf-c-dropdown__group-title--FontWeight: var(--pf-global--FontWeight--semi-bold);\n  --pf-c-dropdown__group-title--Color: var(--pf-global--Color--dark-200);\n  position: relative;\n  display: inline-block;\n  max-width: 100%; }\n  .pf-c-dropdown .pf-c-divider {\n    margin-top: var(--pf-c-dropdown__c-divider--MarginTop);\n    margin-bottom: var(--pf-c-dropdown__c-divider--MarginBottom); }\n\n.pf-c-dropdown__toggle {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  min-width: var(--pf-c-dropdown__toggle--MinWidth);\n  max-width: 100%;\n  padding: var(--pf-c-dropdown__toggle--PaddingTop) var(--pf-c-dropdown__toggle--PaddingRight) var(--pf-c-dropdown__toggle--PaddingBottom) var(--pf-c-dropdown__toggle--PaddingLeft);\n  font-size: var(--pf-c-dropdown__toggle--FontSize);\n  font-weight: var(--pf-c-dropdown__toggle--FontWeight);\n  line-height: var(--pf-c-dropdown__toggle--LineHeight);\n  color: var(--pf-c-dropdown__toggle--Color);\n  background-color: var(--pf-c-dropdown__toggle--BackgroundColor);\n  border: none; }\n  .pf-c-dropdown__toggle.pf-m-disabled, .pf-c-dropdown__toggle:disabled {\n    pointer-events: none; }\n    .pf-c-dropdown__toggle.pf-m-disabled:not(.pf-m-plain), .pf-c-dropdown__toggle:disabled:not(.pf-m-plain) {\n      --pf-c-dropdown__toggle--BackgroundColor: var(--pf-c-dropdown__toggle--disabled--BackgroundColor); }\n      .pf-c-dropdown__toggle.pf-m-disabled:not(.pf-m-plain)::before, .pf-c-dropdown__toggle:disabled:not(.pf-m-plain)::before {\n        border: 0; }\n  .pf-c-dropdown__toggle.pf-m-split-button {\n    padding: 0; }\n    .pf-c-dropdown__toggle.pf-m-split-button > * {\n      position: relative;\n      padding-top: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingTop);\n      padding-right: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingRight);\n      padding-bottom: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingBottom);\n      padding-left: var(--pf-c-dropdown__toggle--m-split-button--child--PaddingLeft);\n      background-color: var(--pf-c-dropdown__toggle--m-split-button--child--BackgroundColor); }\n      .pf-c-dropdown__toggle.pf-m-split-button > *:first-child {\n        --pf-c-dropdown__toggle--m-split-button--child--PaddingLeft: var(--pf-c-dropdown__toggle--m-split-button--first-child--PaddingLeft); }\n      .pf-c-dropdown__toggle.pf-m-split-button > *:last-child {\n        --pf-c-dropdown__toggle--m-split-button--child--PaddingRight: var(--pf-c-dropdown__toggle--m-split-button--last-child--PaddingRight); }\n    .pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-check {\n      cursor: pointer;\n      /* stylelint-disable-next-line */ }\n      .pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-check input {\n        -webkit-transform: var(--pf-c-dropdown__toggle--m-split-button__toggle-check__input--Transform);\n                transform: var(--pf-c-dropdown__toggle--m-split-button__toggle-check__input--Transform); }\n    .pf-c-dropdown__toggle.pf-m-split-button .pf-c-dropdown__toggle-button {\n      color: var(--pf-c-dropdown__toggle-button--Color);\n      border: 0; }\n  .pf-c-dropdown__toggle::before {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    content: "";\n    border: var(--pf-c-dropdown__toggle--BorderWidth) solid;\n    border-color: var(--pf-c-dropdown__toggle--BorderTopColor) var(--pf-c-dropdown__toggle--BorderRightColor) var(--pf-c-dropdown__toggle--BorderBottomColor) var(--pf-c-dropdown__toggle--BorderLeftColor); }\n  .pf-c-dropdown__toggle:hover::before, .pf-c-dropdown__toggle.pf-m-hover::before {\n    --pf-c-dropdown__toggle--BorderBottomColor: var(--pf-c-dropdown__toggle--hover--BorderBottomColor); }\n  .pf-c-dropdown__toggle:active::before, .pf-c-dropdown__toggle.pf-m-active::before {\n    --pf-c-dropdown__toggle--BorderBottomColor: var(--pf-c-dropdown__toggle--active--BorderBottomColor);\n    border-bottom-width: var(--pf-c-dropdown__toggle--active--BorderBottomWidth); }\n  .pf-c-dropdown__toggle:focus::before, .pf-c-dropdown__toggle.pf-m-focus::before {\n    --pf-c-dropdown__toggle--BorderBottomColor: var(--pf-c-dropdown__toggle--focus--BorderBottomColor);\n    border-bottom-width: var(--pf-c-dropdown__toggle--focus--BorderBottomWidth); }\n  .pf-m-expanded > .pf-c-dropdown__toggle::before {\n    --pf-c-dropdown__toggle--BorderBottomColor: var(--pf-c-dropdown__toggle--expanded--BorderBottomColor);\n    border-bottom-width: var(--pf-c-dropdown__toggle--expanded--BorderBottomWidth); }\n  .pf-c-dropdown__toggle.pf-m-plain {\n    justify-content: center;\n    color: var(--pf-c-dropdown__toggle--m-plain--Color); }\n    .pf-c-dropdown__toggle.pf-m-plain > * {\n      line-height: var(--pf-c-dropdown__toggle--LineHeight); }\n    .pf-c-dropdown__toggle.pf-m-plain::before {\n      border-color: var(--pf-c-dropdown__toggle--m-plain--BorderColor); }\n    .pf-c-dropdown__toggle.pf-m-plain:hover, .pf-c-dropdown__toggle.pf-m-plain.pf-m-hover, .pf-c-dropdown__toggle.pf-m-plain:active, .pf-c-dropdown__toggle.pf-m-plain.pf-m-active, .pf-c-dropdown__toggle.pf-m-plain:focus, .pf-c-dropdown__toggle.pf-m-plain.pf-m-focus,\n    .pf-m-expanded > .pf-c-dropdown__toggle.pf-m-plain {\n      --pf-c-dropdown__toggle--m-plain--Color: var(--pf-c-dropdown__toggle--m-plain--hover--Color); }\n      .pf-c-dropdown__toggle.pf-m-plain:hover::before, .pf-c-dropdown__toggle.pf-m-plain.pf-m-hover::before, .pf-c-dropdown__toggle.pf-m-plain:active::before, .pf-c-dropdown__toggle.pf-m-plain.pf-m-active::before, .pf-c-dropdown__toggle.pf-m-plain:focus::before, .pf-c-dropdown__toggle.pf-m-plain.pf-m-focus::before,\n      .pf-m-expanded > .pf-c-dropdown__toggle.pf-m-plain::before {\n        border-color: var(--pf-c-dropdown__toggle--m-plain--BorderColor); }\n    .pf-c-dropdown__toggle.pf-m-plain.pf-m-disabled, .pf-c-dropdown__toggle.pf-m-plain:disabled {\n      --pf-c-dropdown__toggle--m-plain--Color: var(--pf-c-dropdown__toggle--m-plain--disabled--Color); }\n  .pf-c-dropdown__toggle .pf-c-dropdown__toggle-text {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap; }\n  .pf-c-dropdown__toggle .pf-c-dropdown__toggle-icon {\n    margin-right: var(--pf-c-dropdown__toggle-icon--MarginRight);\n    margin-left: var(--pf-c-dropdown__toggle-icon--MarginLeft);\n    line-height: var(--pf-c-dropdown__toggle--LineHeight);\n    /* stylelint-disable-next-line */ }\n    .pf-c-dropdown.pf-m-top.pf-m-expanded > .pf-c-dropdown__toggle .pf-c-dropdown__toggle-icon {\n      -webkit-transform: var(--pf-c-dropdown--m-top--m-expanded__toggle-icon--Transform);\n              transform: var(--pf-c-dropdown--m-top--m-expanded__toggle-icon--Transform); }\n\n.pf-c-dropdown__menu {\n  position: absolute;\n  top: var(--pf-c-dropdown__menu--Top);\n  z-index: var(--pf-c-dropdown__menu--ZIndex);\n  min-width: 100%;\n  padding-top: var(--pf-c-dropdown__menu--PaddingTop);\n  padding-bottom: var(--pf-c-dropdown__menu--PaddingBottom);\n  background: var(--pf-c-dropdown__menu--BackgroundColor);\n  background-clip: padding-box;\n  border: var(--pf-c-dropdown__menu--BorderWidth) solid transparent;\n  box-shadow: var(--pf-c-dropdown__menu--BoxShadow); }\n  .pf-c-dropdown__menu.pf-m-align-right {\n    right: 0; }\n  .pf-c-dropdown.pf-m-top .pf-c-dropdown__menu {\n    --pf-c-dropdown__menu--Top: var(--pf-c-dropdown--m-top__menu--Top);\n    -webkit-transform: var(--pf-c-dropdown--m-top__menu--Transform);\n            transform: var(--pf-c-dropdown--m-top__menu--Transform); }\n\n.pf-c-dropdown__menu-item {\n  display: block;\n  width: 100%;\n  padding: var(--pf-c-dropdown__menu-item--PaddingTop) var(--pf-c-dropdown__menu-item--PaddingRight) var(--pf-c-dropdown__menu-item--PaddingBottom) var(--pf-c-dropdown__menu-item--PaddingLeft);\n  font-size: var(--pf-c-dropdown__menu-item--FontSize);\n  font-weight: var(--pf-c-dropdown__menu-item--FontWeight);\n  line-height: var(--pf-c-dropdown__menu-item--LineHeight);\n  color: var(--pf-c-dropdown__menu-item--Color);\n  text-align: left;\n  white-space: nowrap;\n  background-color: var(--pf-c-dropdown__menu-item--BackgroundColor);\n  border: none; }\n  .pf-c-dropdown__menu-item:hover, .pf-c-dropdown__menu-item.pf-m-hover, .pf-c-dropdown__menu-item:focus, .pf-c-dropdown__menu-item.pf-m-focus {\n    --pf-c-dropdown__menu-item--Color: var(--pf-c-dropdown__menu-item--hover--Color);\n    --pf-c-dropdown__menu-item--BackgroundColor: var(--pf-c-dropdown__menu-item--hover--BackgroundColor);\n    text-decoration: none; }\n  .pf-c-dropdown__menu-item:disabled, .pf-c-dropdown__menu-item.pf-m-disabled {\n    --pf-c-dropdown__menu-item--Color: var(--pf-c-dropdown__menu-item--disabled--Color);\n    --pf-c-dropdown__menu-item--BackgroundColor: var(--pf-c-dropdown__menu-item--disabled--BackgroundColor);\n    pointer-events: none; }\n\n.pf-c-dropdown__separator {\n  height: var(--pf-c-dropdown__separator--Height);\n  margin-top: var(--pf-c-dropdown__separator--MarginTop);\n  margin-bottom: var(--pf-c-dropdown__separator--MarginBottom);\n  background-color: var(--pf-c-dropdown__separator--BackgroundColor); }\n\n.pf-c-dropdown__group {\n  padding-top: var(--pf-c-dropdown__group--PaddingTop); }\n  .pf-c-dropdown__group:first-child {\n    --pf-c-dropdown__group--PaddingTop: var(--pf-c-dropdown__group--first-child--PaddingTop); }\n\n.pf-c-dropdown__group-title {\n  padding-right: var(--pf-c-dropdown__group-title--PaddingRight);\n  padding-bottom: var(--pf-c-dropdown__group-title--PaddingBottom);\n  padding-left: var(--pf-c-dropdown__group-title--PaddingLeft);\n  font-size: var(--pf-c-dropdown__group-title--FontSize);\n  font-weight: var(--pf-c-dropdown__group-title--FontWeight);\n  color: var(--pf-c-dropdown__group-title--Color); }\n',
  ]);

  function _templateObject$1() {
    var data = taggedTemplateLiteral(["\n      <div class=\"", "\"><slot></slot></div>\n    "]);

    _templateObject$1 = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Dropdown.
   */

  var PFDropdown = decorate([customElement("".concat(pfPrefix, "-dropdown"))], function (_initialize, _LitElement) {
    var PFDropdown =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFDropdown, _LitElement2);

      function PFDropdown() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFDropdown);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFDropdown)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFDropdown;
    }(_LitElement);

    return {
      F: PFDropdown,
      d: [{
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-dropdown"));
          return html(_templateObject$1(), classes);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles$1;
        }
      }]
    };
  }, LitElement);

  var styles$2 = css([
    '/* stylelint-enable */\n:host(pf-page) .pf-c-page__header, :host(pf-page) .pf-c-page__main-section[class*="pf-m-dark-"], :host(pf-page-header) .pf-c-page__header, :host(pf-page-header) .pf-c-page__main-section[class*="pf-m-dark-"], :host(pf-page-header-brand) .pf-c-page__header, :host(pf-page-header-brand) .pf-c-page__main-section[class*="pf-m-dark-"], :host(pf-page-header-brand-toggle) .pf-c-page__header, :host(pf-page-header-brand-toggle) .pf-c-page__main-section[class*="pf-m-dark-"], :host(pf-page-header-brand-link) .pf-c-page__header, :host(pf-page-header-brand-link) .pf-c-page__main-section[class*="pf-m-dark-"], :host(pf-page-header-tools) .pf-c-page__header, :host(pf-page-header-tools) .pf-c-page__main-section[class*="pf-m-dark-"] {\n  --pf-global--Color--100: var(--pf-global--Color--light-100);\n  --pf-global--Color--200: var(--pf-global--Color--light-200);\n  --pf-global--BorderColor--100: var(--pf-global--BorderColor--light-100);\n  --pf-global--primary-color--100: var(--pf-global--primary-color--light-100);\n  --pf-global--link--Color: var(--pf-global--link--Color--light);\n  --pf-global--link--Color--hover: var(--pf-global--link--Color--light);\n  --pf-global--BackgroundColor--100: var(--pf-global--BackgroundColor--dark-100); }\n  :host(pf-page) .pf-c-page__header .pf-c-card, :host(pf-page) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-card, :host(pf-page-header) .pf-c-page__header .pf-c-card, :host(pf-page-header) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-card, :host(pf-page-header-brand) .pf-c-page__header .pf-c-card, :host(pf-page-header-brand) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-card, :host(pf-page-header-brand-toggle) .pf-c-page__header .pf-c-card, :host(pf-page-header-brand-toggle) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-card, :host(pf-page-header-brand-link) .pf-c-page__header .pf-c-card, :host(pf-page-header-brand-link) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-card, :host(pf-page-header-tools) .pf-c-page__header .pf-c-card, :host(pf-page-header-tools) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-card {\n    --pf-c-card--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-200); }\n  :host(pf-page) .pf-c-page__header .pf-c-button, :host(pf-page) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-button, :host(pf-page-header) .pf-c-page__header .pf-c-button, :host(pf-page-header) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-button, :host(pf-page-header-brand) .pf-c-page__header .pf-c-button, :host(pf-page-header-brand) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-button, :host(pf-page-header-brand-toggle) .pf-c-page__header .pf-c-button, :host(pf-page-header-brand-toggle) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-button, :host(pf-page-header-brand-link) .pf-c-page__header .pf-c-button, :host(pf-page-header-brand-link) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-button, :host(pf-page-header-tools) .pf-c-page__header .pf-c-button, :host(pf-page-header-tools) .pf-c-page__main-section[class*="pf-m-dark-"] .pf-c-button {\n    --pf-c-button--m-primary--Color: var(--pf-global--primary-color--dark-100);\n    --pf-c-button--m-primary--hover--Color: var(--pf-global--primary-color--dark-100);\n    --pf-c-button--m-primary--focus--Color: var(--pf-global--primary-color--dark-100);\n    --pf-c-button--m-primary--active--Color: var(--pf-global--primary-color--dark-100);\n    --pf-c-button--m-primary--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n    --pf-c-button--m-primary--hover--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n    --pf-c-button--m-primary--focus--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n    --pf-c-button--m-primary--active--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n    --pf-c-button--m-secondary--Color: var(--pf-global--Color--light-100);\n    --pf-c-button--m-secondary--hover--Color: var(--pf-global--Color--light-100);\n    --pf-c-button--m-secondary--focus--Color: var(--pf-global--Color--light-100);\n    --pf-c-button--m-secondary--active--Color: var(--pf-global--Color--light-100);\n    --pf-c-button--m-secondary--BorderColor: var(--pf-global--Color--light-100);\n    --pf-c-button--m-secondary--hover--BorderColor: var(--pf-global--Color--light-100);\n    --pf-c-button--m-secondary--focus--BorderColor: var(--pf-global--Color--light-100);\n    --pf-c-button--m-secondary--active--BorderColor: var(--pf-global--Color--light-100); }\n\n/* stylelint-disable */\n/* stylelint-enable */\n:root {\n  --pf-global--BackgroundColor--100: #fff;\n  --pf-global--BackgroundColor--150: #f5f5f5;\n  --pf-global--BackgroundColor--200: #fafafa;\n  --pf-global--BackgroundColor--300: #ededed;\n  --pf-global--BackgroundColor--light-100: #fff;\n  --pf-global--BackgroundColor--light-200: #fafafa;\n  --pf-global--BackgroundColor--light-300: #ededed;\n  --pf-global--BackgroundColor--dark-100: #151515;\n  --pf-global--BackgroundColor--dark-200: #393f44;\n  --pf-global--BackgroundColor--dark-transparent-100: rgba(3, 3, 3, 0.62);\n  --pf-global--BackgroundColor--dark-transparent-200: rgba(3, 3, 3, 0.32);\n  --pf-global--Color--100: #151515;\n  --pf-global--Color--200: #72767b;\n  --pf-global--Color--300: #393f44;\n  --pf-global--Color--400: #8b8d8f;\n  --pf-global--Color--light-100: #fff;\n  --pf-global--Color--light-200: #ededed;\n  --pf-global--Color--dark-100: #151515;\n  --pf-global--Color--dark-200: #72767b;\n  --pf-global--active-color--100: #06c;\n  --pf-global--active-color--200: #bee1f4;\n  --pf-global--active-color--300: #73bcf7;\n  --pf-global--active-color--400: #2b9af3;\n  --pf-global--disabled-color--100: #72767b;\n  --pf-global--disabled-color--200: #d2d2d2;\n  --pf-global--disabled-color--300: #ededed;\n  --pf-global--primary-color--100: #06c;\n  --pf-global--primary-color--200: #004080;\n  --pf-global--primary-color--light-100: #73bcf7;\n  --pf-global--primary-color--dark-100: #06c;\n  --pf-global--secondary-color--100: #72767b;\n  --pf-global--default-color--100: #73c5c5;\n  --pf-global--default-color--200: #009596;\n  --pf-global--default-color--300: #003737;\n  --pf-global--success-color--100: #92d400;\n  --pf-global--success-color--200: #486b00;\n  --pf-global--info-color--100: #73bcf7;\n  --pf-global--info-color--200: #004368;\n  --pf-global--warning-color--100: #f0ab00;\n  --pf-global--warning-color--200: #795600;\n  --pf-global--danger-color--100: #c9190b;\n  --pf-global--danger-color--200: #a30000;\n  --pf-global--danger-color--300: #470000;\n  --pf-global--BoxShadow--sm: 0 0.0625rem 0.125rem 0 rgba(3, 3, 3, 0.2);\n  --pf-global--BoxShadow--sm-right: 0.25rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-left: -0.25rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-bottom: 0 0.25rem 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--sm-top: 0 -0.25rem 0.625rem -0.25rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--md: 0 0.0625rem 0.0625rem 0rem rgba(3, 3, 3, 0.05), 0 0.25rem 0.5rem 0.25rem rgba(3, 3, 3, 0.06);\n  --pf-global--BoxShadow--md-right: 0.3125rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-left: -0.3125rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-bottom: 0 0.3125rem 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--md-top: 0 -0.3125rem 0.625rem -0.25rem rgba(3, 3, 3, 0.25);\n  --pf-global--BoxShadow--lg: 0 0.1875rem 0.4375rem 0.1875rem rgba(3, 3, 3, 0.13), 0 0.6875rem 1.5rem 1rem rgba(3, 3, 3, 0.12);\n  --pf-global--BoxShadow--lg-right: 0.75rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-left: -0.75rem 0 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-bottom: 0 0.75rem 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--lg-top: 0 -0.75rem 0.625rem -0.25rem rgba(3, 3, 3, 0.07);\n  --pf-global--BoxShadow--inset: inset 0 0 0.625rem 0 rgba(3, 3, 3, 0.25);\n  --pf-global--font-path: ./assets/fonts;\n  --pf-global--fonticon-path: ./assets/pficon;\n  --pf-global--spacer--xs: 0.25rem;\n  --pf-global--spacer--sm: 0.5rem;\n  --pf-global--spacer--md: 1rem;\n  --pf-global--spacer--lg: 1.5rem;\n  --pf-global--spacer--xl: 2rem;\n  --pf-global--spacer--2xl: 3rem;\n  --pf-global--spacer--3xl: 4rem;\n  --pf-global--spacer--form-element: 0.375rem;\n  --pf-global--gutter: 1.5rem;\n  --pf-global--gutter--md: 1rem;\n  --pf-global--golden-ratio: 1.681;\n  --pf-global--ZIndex--xs: 100;\n  --pf-global--ZIndex--sm: 200;\n  --pf-global--ZIndex--md: 300;\n  --pf-global--ZIndex--lg: 400;\n  --pf-global--ZIndex--xl: 500;\n  --pf-global--ZIndex--2xl: 600;\n  --pf-global--breakpoint--xs: 0;\n  --pf-global--breakpoint--sm: 576px;\n  --pf-global--breakpoint--md: 768px;\n  --pf-global--breakpoint--lg: 992px;\n  --pf-global--breakpoint--xl: 1200px;\n  --pf-global--breakpoint--2xl: 1450px;\n  --pf-global--link--Color: #06c;\n  --pf-global--link--Color--hover: #004080;\n  --pf-global--link--Color--light: #73bcf7;\n  --pf-global--link--Color--light--hover: #2b9af3;\n  --pf-global--link--Color--dark: #06c;\n  --pf-global--link--Color--dark--hover: #004080;\n  --pf-global--link--FontWeight: 500;\n  --pf-global--link--TextDecoration: none;\n  --pf-global--link--TextDecoration--hover: underline;\n  --pf-global--BorderWidth--sm: 1px;\n  --pf-global--BorderWidth--md: 2px;\n  --pf-global--BorderWidth--lg: 3px;\n  --pf-global--BorderColor--100: #d2d2d2;\n  --pf-global--BorderColor--200: #8b8d8f;\n  --pf-global--BorderColor--300: #ededed;\n  --pf-global--BorderColor--dark-100: #d2d2d2;\n  --pf-global--BorderColor--light-100: #bbb;\n  --pf-global--BorderRadius--sm: 3px;\n  --pf-global--BorderRadius--lg: 30em;\n  --pf-global--icon--Color--light: #72767b;\n  --pf-global--icon--Color--dark: #151515;\n  --pf-global--icon--FontSize--sm: 0.625rem;\n  --pf-global--icon--FontSize--md: 1.125rem;\n  --pf-global--icon--FontSize--lg: 1.5rem;\n  --pf-global--icon--FontSize--xl: 3.375rem;\n  --pf-global--FontFamily--sans-serif: overpass, overpass, open sans, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  --pf-global--FontFamily--heading--sans-serif: overpass, overpass, open sans, -apple-system, blinkmacsystemfont, Segoe UI, roboto, Helvetica Neue, arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;\n  --pf-global--FontFamily--monospace: overpass-mono, overpass-mono, SFMono-Regular, menlo, monaco, consolas, Liberation Mono, Courier New, monospace;\n  --pf-global--FontFamily--redhatfont--sans-serif: RedHatText, Overpass, overpass, helvetica, arial, sans-serif;\n  --pf-global--FontFamily--redhatfont--heading--sans-serif: RedHatDisplay, Overpass, overpass, helvetica, arial, sans-serif;\n  --pf-global--FontSize--4xl: 2.25rem;\n  --pf-global--FontSize--3xl: 1.75rem;\n  --pf-global--FontSize--2xl: 1.5rem;\n  --pf-global--FontSize--xl: 1.25rem;\n  --pf-global--FontSize--lg: 1.125rem;\n  --pf-global--FontSize--md: 1rem;\n  --pf-global--FontSize--sm: 0.875rem;\n  --pf-global--FontSize--xs: 0.75rem;\n  --pf-global--FontWeight--light: 300;\n  --pf-global--FontWeight--normal: 400;\n  --pf-global--FontWeight--semi-bold: 500;\n  --pf-global--FontWeight--bold: 600;\n  --pf-global--FontWeight--redhatfont--bold: 700;\n  --pf-global--LineHeight--sm: 1.3;\n  --pf-global--LineHeight--md: 1.5;\n  --pf-global--ListStyle: disc outside;\n  --pf-global--Transition: all 250ms cubic-bezier(0.42, 0, 0.58, 1);\n  --pf-global--TimingFunction: cubic-bezier(0.645, 0.045, 0.355, 1);\n  --pf-global--TransitionDuration: 250ms;\n  --pf-global--arrow--width: 0.9375rem;\n  --pf-global--arrow--width-lg: 1.5625rem;\n  --pf-global--target-size--MinWidth: 44px;\n  --pf-global--target-size--MinHeight: 44px; }\n\n.pf-m-redhat-font {\n  --pf-global--FontFamily--sans-serif: var(--pf-global--FontFamily--redhatfont--sans-serif);\n  --pf-global--FontFamily--heading--sans-serif: var(--pf-global--FontFamily--redhatfont--heading--sans-serif);\n  --pf-global--FontWeight--semi-bold: var(--pf-global--FontWeight--redhatfont--bold);\n  --pf-global--FontWeight--bold: var(--pf-global--FontWeight--redhatfont--bold);\n  --pf-global--link--FontWeight: var(--pf-global--FontWeight--normal); }\n\n:host(pf-page) .pf-c-page {\n  --pf-c-page--BackgroundColor: var(--pf-global--BackgroundColor--dark-100);\n  --pf-c-page__header--ZIndex: var(--pf-global--ZIndex--md);\n  --pf-c-page__header--MinHeight: 4.75rem;\n  --pf-c-page__header-brand--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-brand--md--PaddingRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-brand--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft: calc(var(--pf-global--spacer--sm) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--FontSize: var(--pf-global--FontSize--2xl);\n  --pf-c-page__header-brand-link--c-brand--MaxHeight: 3.75rem;\n  --pf-c-page__header-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-nav--lg--PaddingLeft: 0;\n  --pf-c-page__header-nav--lg--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--lg--MarginRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--BackgroundColor: #242424;\n  --pf-c-page__header-nav--lg--BackgroundColor: transparent;\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left: 0;\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor: var(--pf-c-page__header-nav--BackgroundColor);\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--Top: 0;\n  --pf-c-page__header-tools--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--md--MarginRight: var(--pf-global--spacer--lg);\n  --pf-c-page__header-tools--c-avatar--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools-group--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__sidebar--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-page__sidebar--Width: 80%;\n  --pf-c-page__sidebar--md--Width: 18.125rem;\n  --pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__sidebar--BoxShadow: var(--pf-global--BoxShadow--lg-right);\n  --pf-c-page__sidebar--Transition: var(--pf-global--Transition);\n  --pf-c-page__sidebar--Transform: translate3d(-100%, 0, 0);\n  --pf-c-page__sidebar--m-expanded--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar--md--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar-body--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__sidebar-body--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingBottom: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft: 0;\n  --pf-c-page__main-section--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-page__main--ZIndex: var(--pf-global--ZIndex--xs);\n  --pf-c-page__main-nav--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-nav--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__main-nav--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-breadcrumb--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingBottom: 0;\n  --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--main-breadcrumb--PaddingTop: 0;\n  --pf-c-page__main-section--m-light--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-section--m-dark-100--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-100);\n  --pf-c-page__main-section--m-dark-200--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-200);\n  display: grid;\n  height: 100%;\n  grid-template-columns: 1fr;\n  grid-template-rows: -webkit-max-content 1fr;\n  grid-template-rows: max-content 1fr;\n  grid-template-areas: "header" "main";\n  background-color: var(--pf-c-page--BackgroundColor); }\n  @media (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__header-brand--PaddingLeft: var(--pf-c-page__header-brand--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: var(--pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--md--PaddingLeft);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left); } }\n  @media screen and (min-width: 992px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--lg--PaddingLeft);\n      --pf-c-page__header-nav--BackgroundColor: var(--pf-c-page__header-nav--lg--BackgroundColor);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__header-tools--MarginRight: var(--pf-c-page__header-tools--md--MarginRight); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__sidebar--Width: var(--pf-c-page__sidebar--md--Width);\n      --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--md--Transform); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--md--PaddingLeft); } }\n  @media screen and (max-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left);\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__main-nav--PaddingRight: var(--pf-c-page__main-nav--md--PaddingRight);\n      --pf-c-page__main-nav--PaddingLeft: var(--pf-c-page__main-nav--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-breadcrumb--md--PaddingTop);\n      --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-c-page__main-breadcrumb--md--PaddingRight);\n      --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-c-page__main-breadcrumb--md--PaddingLeft); } }\n  @media (min-width: 768px) {\n    :host(pf-page) .pf-c-page {\n      grid-template-columns: -webkit-max-content 1fr;\n      grid-template-columns: max-content 1fr;\n      grid-template-areas: "header header" "nav main"; } }\n\n:host(pf-page) .pf-c-page__header {\n  color: var(--pf-global--Color--100);\n  z-index: var(--pf-c-page__header--ZIndex);\n  grid-template-columns: auto auto;\n  display: grid;\n  grid-area: header;\n  align-items: center;\n  min-width: 0;\n  min-height: var(--pf-c-page__header--MinHeight); }\n  :host(pf-page) .pf-c-page__header > * {\n    display: flex;\n    align-items: center; }\n  @media screen and (min-width: 992px) {\n    :host(pf-page) .pf-c-page__header {\n      grid-template-columns: auto 1fr auto; } }\n\n:host(pf-page) .pf-c-page__header-brand {\n  grid-column: 1 / 2;\n  padding-left: var(--pf-c-page__header-brand--PaddingLeft); }\n  @media (min-width: 768px) {\n    :host(pf-page) .pf-c-page__header-brand {\n      padding-right: var(--pf-c-page__header-brand--md--PaddingRight); } }\n\n:host(pf-page) .pf-c-page__header-brand-link {\n  display: flex;\n  flex: 1;\n  align-items: center; }\n  :host(pf-page) .pf-c-page__header-brand-link .pf-c-brand {\n    max-height: var(--pf-c-page__header-brand-link--c-brand--MaxHeight); }\n\n:host(pf-page) .pf-c-page__header-brand-toggle .pf-c-button {\n  padding: var(--pf-c-page__header-sidebar-toggle__c-button--PaddingTop) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingRight) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingLeft);\n  margin-right: var(--pf-c-page__header-sidebar-toggle__c-button--MarginRight);\n  margin-left: var(--pf-c-page__header-sidebar-toggle__c-button--MarginLeft);\n  font-size: var(--pf-c-page__header-sidebar-toggle__c-button--FontSize);\n  line-height: 1; }\n\n:host(pf-page) .pf-c-page__header-nav {\n  grid-column: 1 / -1;\n  grid-row: 2 / 3;\n  min-width: 0;\n  padding-left: var(--pf-c-page__header-nav--PaddingLeft);\n  background-color: var(--pf-c-page__header-nav--BackgroundColor); }\n  :host(pf-page) .pf-c-page__header-nav > .pf-c-nav {\n    min-width: 0; }\n    @media screen and (max-width: 991px) {\n      :host(pf-page) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button {\n        top: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--Top);\n        background-color: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor); } }\n    :host(pf-page) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n      left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page) .pf-c-page__header-nav {\n      grid-column: 2 / 3;\n      grid-row: 1 / 2;\n      flex: 1;\n      align-self: flex-end;\n      order: initial;\n      width: auto;\n      margin-right: var(--pf-c-page__header-nav--lg--MarginRight);\n      margin-left: var(--pf-c-page__header-nav--lg--MarginLeft); } }\n\n:host(pf-page) .pf-c-page__header-tools {\n  grid-column: 2 / 3;\n  align-items: center;\n  margin-top: var(--pf-c-page__header-tools--MarginTop);\n  margin-right: var(--pf-c-page__header-tools--MarginRight);\n  margin-bottom: var(--pf-c-page__header-tools--MarginBottom);\n  margin-left: auto; }\n  :host(pf-page) .pf-c-page__header-tools .pf-m-icons {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page) .pf-c-page__header-tools .pf-m-icons {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page) .pf-c-page__header-tools .pf-m-mobile {\n    margin-right: 0; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page) .pf-c-page__header-tools .pf-m-mobile {\n        display: none;\n        visibility: hidden; } }\n  :host(pf-page) .pf-c-page__header-tools .pf-m-user {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 768px) {\n      :host(pf-page) .pf-c-page__header-tools .pf-m-user {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page) .pf-c-page__header-tools .pf-c-avatar {\n    margin-left: var(--pf-c-page__header-tools--c-avatar--MarginLeft); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page) .pf-c-page__header-tools {\n      grid-column: 3 / 4; } }\n\n:host(pf-page) .pf-c-page__header-tools-group {\n  display: flex; }\n  :host(pf-page) .pf-c-page__header-tools-group + :host(pf-page) .pf-c-page__header-tools-group {\n    margin-left: var(--pf-c-page__header-tools-group--MarginLeft); }\n\n:host(pf-page) .pf-c-page__sidebar {\n  grid-area: nav;\n  grid-row-start: 2;\n  grid-column-start: 1;\n  z-index: var(--pf-c-page__sidebar--ZIndex);\n  width: var(--pf-c-page__sidebar--Width);\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background-color: var(--pf-c-page__sidebar--BackgroundColor);\n  transition: var(--pf-c-page__sidebar--Transition);\n  -webkit-transform: var(--pf-c-page__sidebar--Transform);\n          transform: var(--pf-c-page__sidebar--Transform); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page__sidebar {\n      max-width: var(--pf-c-page__sidebar--md--Width);\n      box-shadow: var(--pf-c-page__sidebar--BoxShadow); } }\n  :host(pf-page) .pf-c-page__sidebar.pf-m-expanded {\n    --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--m-expanded--Transform);\n    box-shadow: var(--pf-c-page__sidebar--BoxShadow); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page) .pf-c-page__sidebar.pf-m-collapsed {\n      max-width: 0;\n      overflow: hidden; } }\n\n:host(pf-page) .pf-c-page__sidebar-body {\n  padding-top: var(--pf-c-page__sidebar-body--PaddingTop);\n  padding-bottom: var(--pf-c-page__sidebar-body--PaddingBottom); }\n\n:host(pf-page) .pf-c-page__main,\n:host(pf-page) .pf-c-page__drawer {\n  grid-area: main;\n  z-index: var(--pf-c-page__main--ZIndex);\n  display: flex;\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  :host(pf-page) .pf-c-page__main:focus,\n  :host(pf-page) .pf-c-page__drawer:focus {\n    outline: 0; }\n\n:host(pf-page) .pf-c-page__main-nav {\n  padding: var(--pf-c-page__main-nav--PaddingTop) var(--pf-c-page__main-nav--PaddingRight) var(--pf-c-page__main-nav--PaddingBottom) var(--pf-c-page__main-nav--PaddingLeft);\n  background-color: var(--pf-c-page__main-nav--BackgroundColor); }\n  :host(pf-page) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n    left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  :host(pf-page) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(2) {\n    right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right); }\n\n:host(pf-page) .pf-c-page__main-breadcrumb {\n  padding: var(--pf-c-page__main-breadcrumb--PaddingTop) var(--pf-c-page__main-breadcrumb--PaddingRight) var(--pf-c-page__main-breadcrumb--PaddingBottom) var(--pf-c-page__main-breadcrumb--PaddingLeft);\n  background-color: var(--pf-c-page__main-breadcrumb--BackgroundColor); }\n  .pf-c-page__main-nav + :host(pf-page) .pf-c-page__main-breadcrumb {\n    --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-nav--main-breadcrumb--PaddingTop); }\n\n:host(pf-page) .pf-c-page__main-section {\n  padding: var(--pf-c-page__main-section--PaddingTop) var(--pf-c-page__main-section--PaddingRight) var(--pf-c-page__main-section--PaddingBottom) var(--pf-c-page__main-section--PaddingLeft);\n  background-color: var(--pf-c-page__main-section--BackgroundColor); }\n  :host(pf-page) .pf-c-page__main-section:last-of-type, :host(pf-page) .pf-c-page__main-section:only-child, :host(pf-page) .pf-c-page__main-section.pf-m-fill {\n    flex: 1 0 auto; }\n  :host(pf-page) .pf-c-page__main-section.pf-m-no-fill {\n    flex: 0 0 auto; }\n  :host(pf-page) .pf-c-page__main-section.pf-m-light {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-light--BackgroundColor); }\n  :host(pf-page) .pf-c-page__main-section[class*="pf-m-dark-"] {\n    color: var(--pf-global--Color--100); }\n  :host(pf-page) .pf-c-page__main-section.pf-m-dark-100 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-100--BackgroundColor); }\n  :host(pf-page) .pf-c-page__main-section.pf-m-dark-200 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-200--BackgroundColor); }\n  :host(pf-page) .pf-c-page__main-section.pf-m-no-padding {\n    padding: 0; }\n  @media screen and (max-width: 768px) {\n    :host(pf-page) .pf-c-page__main-section.pf-m-no-padding-mobile {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft); } }\n\n:host(pf-page) .pf-c-page__drawer > .pf-c-drawer {\n  flex: 1 0 auto; }\n  :host(pf-page) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content {\n    display: flex;\n    flex-direction: column; }\n    :host(pf-page) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content .pf-c-page__main {\n      --pf-c-page__main--ZIndex: auto;\n      grid-area: auto;\n      flex: 1 0 auto; }\n\n:host(pf-page-header) .pf-c-page {\n  --pf-c-page--BackgroundColor: var(--pf-global--BackgroundColor--dark-100);\n  --pf-c-page__header--ZIndex: var(--pf-global--ZIndex--md);\n  --pf-c-page__header--MinHeight: 4.75rem;\n  --pf-c-page__header-brand--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-brand--md--PaddingRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-brand--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft: calc(var(--pf-global--spacer--sm) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--FontSize: var(--pf-global--FontSize--2xl);\n  --pf-c-page__header-brand-link--c-brand--MaxHeight: 3.75rem;\n  --pf-c-page__header-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-nav--lg--PaddingLeft: 0;\n  --pf-c-page__header-nav--lg--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--lg--MarginRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--BackgroundColor: #242424;\n  --pf-c-page__header-nav--lg--BackgroundColor: transparent;\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left: 0;\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor: var(--pf-c-page__header-nav--BackgroundColor);\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--Top: 0;\n  --pf-c-page__header-tools--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--md--MarginRight: var(--pf-global--spacer--lg);\n  --pf-c-page__header-tools--c-avatar--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools-group--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__sidebar--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-page__sidebar--Width: 80%;\n  --pf-c-page__sidebar--md--Width: 18.125rem;\n  --pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__sidebar--BoxShadow: var(--pf-global--BoxShadow--lg-right);\n  --pf-c-page__sidebar--Transition: var(--pf-global--Transition);\n  --pf-c-page__sidebar--Transform: translate3d(-100%, 0, 0);\n  --pf-c-page__sidebar--m-expanded--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar--md--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar-body--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__sidebar-body--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingBottom: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft: 0;\n  --pf-c-page__main-section--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-page__main--ZIndex: var(--pf-global--ZIndex--xs);\n  --pf-c-page__main-nav--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-nav--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__main-nav--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-breadcrumb--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingBottom: 0;\n  --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--main-breadcrumb--PaddingTop: 0;\n  --pf-c-page__main-section--m-light--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-section--m-dark-100--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-100);\n  --pf-c-page__main-section--m-dark-200--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-200);\n  display: grid;\n  height: 100%;\n  grid-template-columns: 1fr;\n  grid-template-rows: -webkit-max-content 1fr;\n  grid-template-rows: max-content 1fr;\n  grid-template-areas: "header" "main";\n  background-color: var(--pf-c-page--BackgroundColor); }\n  @media (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__header-brand--PaddingLeft: var(--pf-c-page__header-brand--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: var(--pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--md--PaddingLeft);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left); } }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--lg--PaddingLeft);\n      --pf-c-page__header-nav--BackgroundColor: var(--pf-c-page__header-nav--lg--BackgroundColor);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__header-tools--MarginRight: var(--pf-c-page__header-tools--md--MarginRight); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__sidebar--Width: var(--pf-c-page__sidebar--md--Width);\n      --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--md--Transform); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--md--PaddingLeft); } }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left);\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__main-nav--PaddingRight: var(--pf-c-page__main-nav--md--PaddingRight);\n      --pf-c-page__main-nav--PaddingLeft: var(--pf-c-page__main-nav--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-breadcrumb--md--PaddingTop);\n      --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-c-page__main-breadcrumb--md--PaddingRight);\n      --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-c-page__main-breadcrumb--md--PaddingLeft); } }\n  @media (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page {\n      grid-template-columns: -webkit-max-content 1fr;\n      grid-template-columns: max-content 1fr;\n      grid-template-areas: "header header" "nav main"; } }\n\n:host(pf-page-header) .pf-c-page__header {\n  color: var(--pf-global--Color--100);\n  z-index: var(--pf-c-page__header--ZIndex);\n  grid-template-columns: auto auto;\n  display: grid;\n  grid-area: header;\n  align-items: center;\n  min-width: 0;\n  min-height: var(--pf-c-page__header--MinHeight); }\n  :host(pf-page-header) .pf-c-page__header > * {\n    display: flex;\n    align-items: center; }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header) .pf-c-page__header {\n      grid-template-columns: auto 1fr auto; } }\n\n:host(pf-page-header) .pf-c-page__header-brand {\n  grid-column: 1 / 2;\n  padding-left: var(--pf-c-page__header-brand--PaddingLeft); }\n  @media (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page__header-brand {\n      padding-right: var(--pf-c-page__header-brand--md--PaddingRight); } }\n\n:host(pf-page-header) .pf-c-page__header-brand-link {\n  display: flex;\n  flex: 1;\n  align-items: center; }\n  :host(pf-page-header) .pf-c-page__header-brand-link .pf-c-brand {\n    max-height: var(--pf-c-page__header-brand-link--c-brand--MaxHeight); }\n\n:host(pf-page-header) .pf-c-page__header-brand-toggle .pf-c-button {\n  padding: var(--pf-c-page__header-sidebar-toggle__c-button--PaddingTop) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingRight) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingLeft);\n  margin-right: var(--pf-c-page__header-sidebar-toggle__c-button--MarginRight);\n  margin-left: var(--pf-c-page__header-sidebar-toggle__c-button--MarginLeft);\n  font-size: var(--pf-c-page__header-sidebar-toggle__c-button--FontSize);\n  line-height: 1; }\n\n:host(pf-page-header) .pf-c-page__header-nav {\n  grid-column: 1 / -1;\n  grid-row: 2 / 3;\n  min-width: 0;\n  padding-left: var(--pf-c-page__header-nav--PaddingLeft);\n  background-color: var(--pf-c-page__header-nav--BackgroundColor); }\n  :host(pf-page-header) .pf-c-page__header-nav > .pf-c-nav {\n    min-width: 0; }\n    @media screen and (max-width: 991px) {\n      :host(pf-page-header) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button {\n        top: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--Top);\n        background-color: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor); } }\n    :host(pf-page-header) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n      left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header) .pf-c-page__header-nav {\n      grid-column: 2 / 3;\n      grid-row: 1 / 2;\n      flex: 1;\n      align-self: flex-end;\n      order: initial;\n      width: auto;\n      margin-right: var(--pf-c-page__header-nav--lg--MarginRight);\n      margin-left: var(--pf-c-page__header-nav--lg--MarginLeft); } }\n\n:host(pf-page-header) .pf-c-page__header-tools {\n  grid-column: 2 / 3;\n  align-items: center;\n  margin-top: var(--pf-c-page__header-tools--MarginTop);\n  margin-right: var(--pf-c-page__header-tools--MarginRight);\n  margin-bottom: var(--pf-c-page__header-tools--MarginBottom);\n  margin-left: auto; }\n  :host(pf-page-header) .pf-c-page__header-tools .pf-m-icons {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header) .pf-c-page__header-tools .pf-m-icons {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header) .pf-c-page__header-tools .pf-m-mobile {\n    margin-right: 0; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header) .pf-c-page__header-tools .pf-m-mobile {\n        display: none;\n        visibility: hidden; } }\n  :host(pf-page-header) .pf-c-page__header-tools .pf-m-user {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 768px) {\n      :host(pf-page-header) .pf-c-page__header-tools .pf-m-user {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header) .pf-c-page__header-tools .pf-c-avatar {\n    margin-left: var(--pf-c-page__header-tools--c-avatar--MarginLeft); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header) .pf-c-page__header-tools {\n      grid-column: 3 / 4; } }\n\n:host(pf-page-header) .pf-c-page__header-tools-group {\n  display: flex; }\n  :host(pf-page-header) .pf-c-page__header-tools-group + :host(pf-page-header) .pf-c-page__header-tools-group {\n    margin-left: var(--pf-c-page__header-tools-group--MarginLeft); }\n\n:host(pf-page-header) .pf-c-page__sidebar {\n  grid-area: nav;\n  grid-row-start: 2;\n  grid-column-start: 1;\n  z-index: var(--pf-c-page__sidebar--ZIndex);\n  width: var(--pf-c-page__sidebar--Width);\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background-color: var(--pf-c-page__sidebar--BackgroundColor);\n  transition: var(--pf-c-page__sidebar--Transition);\n  -webkit-transform: var(--pf-c-page__sidebar--Transform);\n          transform: var(--pf-c-page__sidebar--Transform); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page__sidebar {\n      max-width: var(--pf-c-page__sidebar--md--Width);\n      box-shadow: var(--pf-c-page__sidebar--BoxShadow); } }\n  :host(pf-page-header) .pf-c-page__sidebar.pf-m-expanded {\n    --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--m-expanded--Transform);\n    box-shadow: var(--pf-c-page__sidebar--BoxShadow); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header) .pf-c-page__sidebar.pf-m-collapsed {\n      max-width: 0;\n      overflow: hidden; } }\n\n:host(pf-page-header) .pf-c-page__sidebar-body {\n  padding-top: var(--pf-c-page__sidebar-body--PaddingTop);\n  padding-bottom: var(--pf-c-page__sidebar-body--PaddingBottom); }\n\n:host(pf-page-header) .pf-c-page__main,\n:host(pf-page-header) .pf-c-page__drawer {\n  grid-area: main;\n  z-index: var(--pf-c-page__main--ZIndex);\n  display: flex;\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  :host(pf-page-header) .pf-c-page__main:focus,\n  :host(pf-page-header) .pf-c-page__drawer:focus {\n    outline: 0; }\n\n:host(pf-page-header) .pf-c-page__main-nav {\n  padding: var(--pf-c-page__main-nav--PaddingTop) var(--pf-c-page__main-nav--PaddingRight) var(--pf-c-page__main-nav--PaddingBottom) var(--pf-c-page__main-nav--PaddingLeft);\n  background-color: var(--pf-c-page__main-nav--BackgroundColor); }\n  :host(pf-page-header) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n    left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  :host(pf-page-header) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(2) {\n    right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right); }\n\n:host(pf-page-header) .pf-c-page__main-breadcrumb {\n  padding: var(--pf-c-page__main-breadcrumb--PaddingTop) var(--pf-c-page__main-breadcrumb--PaddingRight) var(--pf-c-page__main-breadcrumb--PaddingBottom) var(--pf-c-page__main-breadcrumb--PaddingLeft);\n  background-color: var(--pf-c-page__main-breadcrumb--BackgroundColor); }\n  .pf-c-page__main-nav + :host(pf-page-header) .pf-c-page__main-breadcrumb {\n    --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-nav--main-breadcrumb--PaddingTop); }\n\n:host(pf-page-header) .pf-c-page__main-section {\n  padding: var(--pf-c-page__main-section--PaddingTop) var(--pf-c-page__main-section--PaddingRight) var(--pf-c-page__main-section--PaddingBottom) var(--pf-c-page__main-section--PaddingLeft);\n  background-color: var(--pf-c-page__main-section--BackgroundColor); }\n  :host(pf-page-header) .pf-c-page__main-section:last-of-type, :host(pf-page-header) .pf-c-page__main-section:only-child, :host(pf-page-header) .pf-c-page__main-section.pf-m-fill {\n    flex: 1 0 auto; }\n  :host(pf-page-header) .pf-c-page__main-section.pf-m-no-fill {\n    flex: 0 0 auto; }\n  :host(pf-page-header) .pf-c-page__main-section.pf-m-light {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-light--BackgroundColor); }\n  :host(pf-page-header) .pf-c-page__main-section[class*="pf-m-dark-"] {\n    color: var(--pf-global--Color--100); }\n  :host(pf-page-header) .pf-c-page__main-section.pf-m-dark-100 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-100--BackgroundColor); }\n  :host(pf-page-header) .pf-c-page__main-section.pf-m-dark-200 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-200--BackgroundColor); }\n  :host(pf-page-header) .pf-c-page__main-section.pf-m-no-padding {\n    padding: 0; }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header) .pf-c-page__main-section.pf-m-no-padding-mobile {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft); } }\n\n:host(pf-page-header) .pf-c-page__drawer > .pf-c-drawer {\n  flex: 1 0 auto; }\n  :host(pf-page-header) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content {\n    display: flex;\n    flex-direction: column; }\n    :host(pf-page-header) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content .pf-c-page__main {\n      --pf-c-page__main--ZIndex: auto;\n      grid-area: auto;\n      flex: 1 0 auto; }\n\n:host(pf-page-header-brand) .pf-c-page {\n  --pf-c-page--BackgroundColor: var(--pf-global--BackgroundColor--dark-100);\n  --pf-c-page__header--ZIndex: var(--pf-global--ZIndex--md);\n  --pf-c-page__header--MinHeight: 4.75rem;\n  --pf-c-page__header-brand--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-brand--md--PaddingRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-brand--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft: calc(var(--pf-global--spacer--sm) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--FontSize: var(--pf-global--FontSize--2xl);\n  --pf-c-page__header-brand-link--c-brand--MaxHeight: 3.75rem;\n  --pf-c-page__header-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-nav--lg--PaddingLeft: 0;\n  --pf-c-page__header-nav--lg--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--lg--MarginRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--BackgroundColor: #242424;\n  --pf-c-page__header-nav--lg--BackgroundColor: transparent;\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left: 0;\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor: var(--pf-c-page__header-nav--BackgroundColor);\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--Top: 0;\n  --pf-c-page__header-tools--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--md--MarginRight: var(--pf-global--spacer--lg);\n  --pf-c-page__header-tools--c-avatar--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools-group--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__sidebar--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-page__sidebar--Width: 80%;\n  --pf-c-page__sidebar--md--Width: 18.125rem;\n  --pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__sidebar--BoxShadow: var(--pf-global--BoxShadow--lg-right);\n  --pf-c-page__sidebar--Transition: var(--pf-global--Transition);\n  --pf-c-page__sidebar--Transform: translate3d(-100%, 0, 0);\n  --pf-c-page__sidebar--m-expanded--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar--md--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar-body--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__sidebar-body--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingBottom: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft: 0;\n  --pf-c-page__main-section--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-page__main--ZIndex: var(--pf-global--ZIndex--xs);\n  --pf-c-page__main-nav--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-nav--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__main-nav--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-breadcrumb--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingBottom: 0;\n  --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--main-breadcrumb--PaddingTop: 0;\n  --pf-c-page__main-section--m-light--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-section--m-dark-100--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-100);\n  --pf-c-page__main-section--m-dark-200--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-200);\n  display: grid;\n  height: 100%;\n  grid-template-columns: 1fr;\n  grid-template-rows: -webkit-max-content 1fr;\n  grid-template-rows: max-content 1fr;\n  grid-template-areas: "header" "main";\n  background-color: var(--pf-c-page--BackgroundColor); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__header-brand--PaddingLeft: var(--pf-c-page__header-brand--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: var(--pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--md--PaddingLeft);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left); } }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--lg--PaddingLeft);\n      --pf-c-page__header-nav--BackgroundColor: var(--pf-c-page__header-nav--lg--BackgroundColor);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__header-tools--MarginRight: var(--pf-c-page__header-tools--md--MarginRight); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__sidebar--Width: var(--pf-c-page__sidebar--md--Width);\n      --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--md--Transform); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--md--PaddingLeft); } }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left);\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__main-nav--PaddingRight: var(--pf-c-page__main-nav--md--PaddingRight);\n      --pf-c-page__main-nav--PaddingLeft: var(--pf-c-page__main-nav--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-breadcrumb--md--PaddingTop);\n      --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-c-page__main-breadcrumb--md--PaddingRight);\n      --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-c-page__main-breadcrumb--md--PaddingLeft); } }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page {\n      grid-template-columns: -webkit-max-content 1fr;\n      grid-template-columns: max-content 1fr;\n      grid-template-areas: "header header" "nav main"; } }\n\n:host(pf-page-header-brand) .pf-c-page__header {\n  color: var(--pf-global--Color--100);\n  z-index: var(--pf-c-page__header--ZIndex);\n  grid-template-columns: auto auto;\n  display: grid;\n  grid-area: header;\n  align-items: center;\n  min-width: 0;\n  min-height: var(--pf-c-page__header--MinHeight); }\n  :host(pf-page-header-brand) .pf-c-page__header > * {\n    display: flex;\n    align-items: center; }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand) .pf-c-page__header {\n      grid-template-columns: auto 1fr auto; } }\n\n:host(pf-page-header-brand) .pf-c-page__header-brand {\n  grid-column: 1 / 2;\n  padding-left: var(--pf-c-page__header-brand--PaddingLeft); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page__header-brand {\n      padding-right: var(--pf-c-page__header-brand--md--PaddingRight); } }\n\n:host(pf-page-header-brand) .pf-c-page__header-brand-link {\n  display: flex;\n  flex: 1;\n  align-items: center; }\n  :host(pf-page-header-brand) .pf-c-page__header-brand-link .pf-c-brand {\n    max-height: var(--pf-c-page__header-brand-link--c-brand--MaxHeight); }\n\n:host(pf-page-header-brand) .pf-c-page__header-brand-toggle .pf-c-button {\n  padding: var(--pf-c-page__header-sidebar-toggle__c-button--PaddingTop) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingRight) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingLeft);\n  margin-right: var(--pf-c-page__header-sidebar-toggle__c-button--MarginRight);\n  margin-left: var(--pf-c-page__header-sidebar-toggle__c-button--MarginLeft);\n  font-size: var(--pf-c-page__header-sidebar-toggle__c-button--FontSize);\n  line-height: 1; }\n\n:host(pf-page-header-brand) .pf-c-page__header-nav {\n  grid-column: 1 / -1;\n  grid-row: 2 / 3;\n  min-width: 0;\n  padding-left: var(--pf-c-page__header-nav--PaddingLeft);\n  background-color: var(--pf-c-page__header-nav--BackgroundColor); }\n  :host(pf-page-header-brand) .pf-c-page__header-nav > .pf-c-nav {\n    min-width: 0; }\n    @media screen and (max-width: 991px) {\n      :host(pf-page-header-brand) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button {\n        top: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--Top);\n        background-color: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor); } }\n    :host(pf-page-header-brand) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n      left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand) .pf-c-page__header-nav {\n      grid-column: 2 / 3;\n      grid-row: 1 / 2;\n      flex: 1;\n      align-self: flex-end;\n      order: initial;\n      width: auto;\n      margin-right: var(--pf-c-page__header-nav--lg--MarginRight);\n      margin-left: var(--pf-c-page__header-nav--lg--MarginLeft); } }\n\n:host(pf-page-header-brand) .pf-c-page__header-tools {\n  grid-column: 2 / 3;\n  align-items: center;\n  margin-top: var(--pf-c-page__header-tools--MarginTop);\n  margin-right: var(--pf-c-page__header-tools--MarginRight);\n  margin-bottom: var(--pf-c-page__header-tools--MarginBottom);\n  margin-left: auto; }\n  :host(pf-page-header-brand) .pf-c-page__header-tools .pf-m-icons {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-brand) .pf-c-page__header-tools .pf-m-icons {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-brand) .pf-c-page__header-tools .pf-m-mobile {\n    margin-right: 0; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-brand) .pf-c-page__header-tools .pf-m-mobile {\n        display: none;\n        visibility: hidden; } }\n  :host(pf-page-header-brand) .pf-c-page__header-tools .pf-m-user {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 768px) {\n      :host(pf-page-header-brand) .pf-c-page__header-tools .pf-m-user {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-brand) .pf-c-page__header-tools .pf-c-avatar {\n    margin-left: var(--pf-c-page__header-tools--c-avatar--MarginLeft); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand) .pf-c-page__header-tools {\n      grid-column: 3 / 4; } }\n\n:host(pf-page-header-brand) .pf-c-page__header-tools-group {\n  display: flex; }\n  :host(pf-page-header-brand) .pf-c-page__header-tools-group + :host(pf-page-header-brand) .pf-c-page__header-tools-group {\n    margin-left: var(--pf-c-page__header-tools-group--MarginLeft); }\n\n:host(pf-page-header-brand) .pf-c-page__sidebar {\n  grid-area: nav;\n  grid-row-start: 2;\n  grid-column-start: 1;\n  z-index: var(--pf-c-page__sidebar--ZIndex);\n  width: var(--pf-c-page__sidebar--Width);\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background-color: var(--pf-c-page__sidebar--BackgroundColor);\n  transition: var(--pf-c-page__sidebar--Transition);\n  -webkit-transform: var(--pf-c-page__sidebar--Transform);\n          transform: var(--pf-c-page__sidebar--Transform); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page__sidebar {\n      max-width: var(--pf-c-page__sidebar--md--Width);\n      box-shadow: var(--pf-c-page__sidebar--BoxShadow); } }\n  :host(pf-page-header-brand) .pf-c-page__sidebar.pf-m-expanded {\n    --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--m-expanded--Transform);\n    box-shadow: var(--pf-c-page__sidebar--BoxShadow); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page__sidebar.pf-m-collapsed {\n      max-width: 0;\n      overflow: hidden; } }\n\n:host(pf-page-header-brand) .pf-c-page__sidebar-body {\n  padding-top: var(--pf-c-page__sidebar-body--PaddingTop);\n  padding-bottom: var(--pf-c-page__sidebar-body--PaddingBottom); }\n\n:host(pf-page-header-brand) .pf-c-page__main,\n:host(pf-page-header-brand) .pf-c-page__drawer {\n  grid-area: main;\n  z-index: var(--pf-c-page__main--ZIndex);\n  display: flex;\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  :host(pf-page-header-brand) .pf-c-page__main:focus,\n  :host(pf-page-header-brand) .pf-c-page__drawer:focus {\n    outline: 0; }\n\n:host(pf-page-header-brand) .pf-c-page__main-nav {\n  padding: var(--pf-c-page__main-nav--PaddingTop) var(--pf-c-page__main-nav--PaddingRight) var(--pf-c-page__main-nav--PaddingBottom) var(--pf-c-page__main-nav--PaddingLeft);\n  background-color: var(--pf-c-page__main-nav--BackgroundColor); }\n  :host(pf-page-header-brand) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n    left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  :host(pf-page-header-brand) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(2) {\n    right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right); }\n\n:host(pf-page-header-brand) .pf-c-page__main-breadcrumb {\n  padding: var(--pf-c-page__main-breadcrumb--PaddingTop) var(--pf-c-page__main-breadcrumb--PaddingRight) var(--pf-c-page__main-breadcrumb--PaddingBottom) var(--pf-c-page__main-breadcrumb--PaddingLeft);\n  background-color: var(--pf-c-page__main-breadcrumb--BackgroundColor); }\n  .pf-c-page__main-nav + :host(pf-page-header-brand) .pf-c-page__main-breadcrumb {\n    --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-nav--main-breadcrumb--PaddingTop); }\n\n:host(pf-page-header-brand) .pf-c-page__main-section {\n  padding: var(--pf-c-page__main-section--PaddingTop) var(--pf-c-page__main-section--PaddingRight) var(--pf-c-page__main-section--PaddingBottom) var(--pf-c-page__main-section--PaddingLeft);\n  background-color: var(--pf-c-page__main-section--BackgroundColor); }\n  :host(pf-page-header-brand) .pf-c-page__main-section:last-of-type, :host(pf-page-header-brand) .pf-c-page__main-section:only-child, :host(pf-page-header-brand) .pf-c-page__main-section.pf-m-fill {\n    flex: 1 0 auto; }\n  :host(pf-page-header-brand) .pf-c-page__main-section.pf-m-no-fill {\n    flex: 0 0 auto; }\n  :host(pf-page-header-brand) .pf-c-page__main-section.pf-m-light {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-light--BackgroundColor); }\n  :host(pf-page-header-brand) .pf-c-page__main-section[class*="pf-m-dark-"] {\n    color: var(--pf-global--Color--100); }\n  :host(pf-page-header-brand) .pf-c-page__main-section.pf-m-dark-100 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-100--BackgroundColor); }\n  :host(pf-page-header-brand) .pf-c-page__main-section.pf-m-dark-200 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-200--BackgroundColor); }\n  :host(pf-page-header-brand) .pf-c-page__main-section.pf-m-no-padding {\n    padding: 0; }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-brand) .pf-c-page__main-section.pf-m-no-padding-mobile {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft); } }\n\n:host(pf-page-header-brand) .pf-c-page__drawer > .pf-c-drawer {\n  flex: 1 0 auto; }\n  :host(pf-page-header-brand) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content {\n    display: flex;\n    flex-direction: column; }\n    :host(pf-page-header-brand) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content .pf-c-page__main {\n      --pf-c-page__main--ZIndex: auto;\n      grid-area: auto;\n      flex: 1 0 auto; }\n\n:host(pf-page-header-brand-toggle) .pf-c-page {\n  --pf-c-page--BackgroundColor: var(--pf-global--BackgroundColor--dark-100);\n  --pf-c-page__header--ZIndex: var(--pf-global--ZIndex--md);\n  --pf-c-page__header--MinHeight: 4.75rem;\n  --pf-c-page__header-brand--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-brand--md--PaddingRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-brand--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft: calc(var(--pf-global--spacer--sm) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--FontSize: var(--pf-global--FontSize--2xl);\n  --pf-c-page__header-brand-link--c-brand--MaxHeight: 3.75rem;\n  --pf-c-page__header-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-nav--lg--PaddingLeft: 0;\n  --pf-c-page__header-nav--lg--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--lg--MarginRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--BackgroundColor: #242424;\n  --pf-c-page__header-nav--lg--BackgroundColor: transparent;\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left: 0;\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor: var(--pf-c-page__header-nav--BackgroundColor);\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--Top: 0;\n  --pf-c-page__header-tools--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--md--MarginRight: var(--pf-global--spacer--lg);\n  --pf-c-page__header-tools--c-avatar--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools-group--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__sidebar--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-page__sidebar--Width: 80%;\n  --pf-c-page__sidebar--md--Width: 18.125rem;\n  --pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__sidebar--BoxShadow: var(--pf-global--BoxShadow--lg-right);\n  --pf-c-page__sidebar--Transition: var(--pf-global--Transition);\n  --pf-c-page__sidebar--Transform: translate3d(-100%, 0, 0);\n  --pf-c-page__sidebar--m-expanded--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar--md--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar-body--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__sidebar-body--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingBottom: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft: 0;\n  --pf-c-page__main-section--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-page__main--ZIndex: var(--pf-global--ZIndex--xs);\n  --pf-c-page__main-nav--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-nav--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__main-nav--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-breadcrumb--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingBottom: 0;\n  --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--main-breadcrumb--PaddingTop: 0;\n  --pf-c-page__main-section--m-light--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-section--m-dark-100--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-100);\n  --pf-c-page__main-section--m-dark-200--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-200);\n  display: grid;\n  height: 100%;\n  grid-template-columns: 1fr;\n  grid-template-rows: -webkit-max-content 1fr;\n  grid-template-rows: max-content 1fr;\n  grid-template-areas: "header" "main";\n  background-color: var(--pf-c-page--BackgroundColor); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__header-brand--PaddingLeft: var(--pf-c-page__header-brand--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: var(--pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--md--PaddingLeft);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left); } }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--lg--PaddingLeft);\n      --pf-c-page__header-nav--BackgroundColor: var(--pf-c-page__header-nav--lg--BackgroundColor);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__header-tools--MarginRight: var(--pf-c-page__header-tools--md--MarginRight); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__sidebar--Width: var(--pf-c-page__sidebar--md--Width);\n      --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--md--Transform); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--md--PaddingLeft); } }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left);\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__main-nav--PaddingRight: var(--pf-c-page__main-nav--md--PaddingRight);\n      --pf-c-page__main-nav--PaddingLeft: var(--pf-c-page__main-nav--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-breadcrumb--md--PaddingTop);\n      --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-c-page__main-breadcrumb--md--PaddingRight);\n      --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-c-page__main-breadcrumb--md--PaddingLeft); } }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page {\n      grid-template-columns: -webkit-max-content 1fr;\n      grid-template-columns: max-content 1fr;\n      grid-template-areas: "header header" "nav main"; } }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__header {\n  color: var(--pf-global--Color--100);\n  z-index: var(--pf-c-page__header--ZIndex);\n  grid-template-columns: auto auto;\n  display: grid;\n  grid-area: header;\n  align-items: center;\n  min-width: 0;\n  min-height: var(--pf-c-page__header--MinHeight); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header > * {\n    display: flex;\n    align-items: center; }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page__header {\n      grid-template-columns: auto 1fr auto; } }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__header-brand {\n  grid-column: 1 / 2;\n  padding-left: var(--pf-c-page__header-brand--PaddingLeft); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page__header-brand {\n      padding-right: var(--pf-c-page__header-brand--md--PaddingRight); } }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__header-brand-link {\n  display: flex;\n  flex: 1;\n  align-items: center; }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header-brand-link .pf-c-brand {\n    max-height: var(--pf-c-page__header-brand-link--c-brand--MaxHeight); }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__header-brand-toggle .pf-c-button {\n  padding: var(--pf-c-page__header-sidebar-toggle__c-button--PaddingTop) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingRight) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingLeft);\n  margin-right: var(--pf-c-page__header-sidebar-toggle__c-button--MarginRight);\n  margin-left: var(--pf-c-page__header-sidebar-toggle__c-button--MarginLeft);\n  font-size: var(--pf-c-page__header-sidebar-toggle__c-button--FontSize);\n  line-height: 1; }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__header-nav {\n  grid-column: 1 / -1;\n  grid-row: 2 / 3;\n  min-width: 0;\n  padding-left: var(--pf-c-page__header-nav--PaddingLeft);\n  background-color: var(--pf-c-page__header-nav--BackgroundColor); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header-nav > .pf-c-nav {\n    min-width: 0; }\n    @media screen and (max-width: 991px) {\n      :host(pf-page-header-brand-toggle) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button {\n        top: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--Top);\n        background-color: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor); } }\n    :host(pf-page-header-brand-toggle) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n      left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page__header-nav {\n      grid-column: 2 / 3;\n      grid-row: 1 / 2;\n      flex: 1;\n      align-self: flex-end;\n      order: initial;\n      width: auto;\n      margin-right: var(--pf-c-page__header-nav--lg--MarginRight);\n      margin-left: var(--pf-c-page__header-nav--lg--MarginLeft); } }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__header-tools {\n  grid-column: 2 / 3;\n  align-items: center;\n  margin-top: var(--pf-c-page__header-tools--MarginTop);\n  margin-right: var(--pf-c-page__header-tools--MarginRight);\n  margin-bottom: var(--pf-c-page__header-tools--MarginBottom);\n  margin-left: auto; }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header-tools .pf-m-icons {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-brand-toggle) .pf-c-page__header-tools .pf-m-icons {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header-tools .pf-m-mobile {\n    margin-right: 0; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-brand-toggle) .pf-c-page__header-tools .pf-m-mobile {\n        display: none;\n        visibility: hidden; } }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header-tools .pf-m-user {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 768px) {\n      :host(pf-page-header-brand-toggle) .pf-c-page__header-tools .pf-m-user {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header-tools .pf-c-avatar {\n    margin-left: var(--pf-c-page__header-tools--c-avatar--MarginLeft); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page__header-tools {\n      grid-column: 3 / 4; } }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__header-tools-group {\n  display: flex; }\n  :host(pf-page-header-brand-toggle) .pf-c-page__header-tools-group + :host(pf-page-header-brand-toggle) .pf-c-page__header-tools-group {\n    margin-left: var(--pf-c-page__header-tools-group--MarginLeft); }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__sidebar {\n  grid-area: nav;\n  grid-row-start: 2;\n  grid-column-start: 1;\n  z-index: var(--pf-c-page__sidebar--ZIndex);\n  width: var(--pf-c-page__sidebar--Width);\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background-color: var(--pf-c-page__sidebar--BackgroundColor);\n  transition: var(--pf-c-page__sidebar--Transition);\n  -webkit-transform: var(--pf-c-page__sidebar--Transform);\n          transform: var(--pf-c-page__sidebar--Transform); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page__sidebar {\n      max-width: var(--pf-c-page__sidebar--md--Width);\n      box-shadow: var(--pf-c-page__sidebar--BoxShadow); } }\n  :host(pf-page-header-brand-toggle) .pf-c-page__sidebar.pf-m-expanded {\n    --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--m-expanded--Transform);\n    box-shadow: var(--pf-c-page__sidebar--BoxShadow); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page__sidebar.pf-m-collapsed {\n      max-width: 0;\n      overflow: hidden; } }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__sidebar-body {\n  padding-top: var(--pf-c-page__sidebar-body--PaddingTop);\n  padding-bottom: var(--pf-c-page__sidebar-body--PaddingBottom); }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__main,\n:host(pf-page-header-brand-toggle) .pf-c-page__drawer {\n  grid-area: main;\n  z-index: var(--pf-c-page__main--ZIndex);\n  display: flex;\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main:focus,\n  :host(pf-page-header-brand-toggle) .pf-c-page__drawer:focus {\n    outline: 0; }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__main-nav {\n  padding: var(--pf-c-page__main-nav--PaddingTop) var(--pf-c-page__main-nav--PaddingRight) var(--pf-c-page__main-nav--PaddingBottom) var(--pf-c-page__main-nav--PaddingLeft);\n  background-color: var(--pf-c-page__main-nav--BackgroundColor); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n    left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(2) {\n    right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right); }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__main-breadcrumb {\n  padding: var(--pf-c-page__main-breadcrumb--PaddingTop) var(--pf-c-page__main-breadcrumb--PaddingRight) var(--pf-c-page__main-breadcrumb--PaddingBottom) var(--pf-c-page__main-breadcrumb--PaddingLeft);\n  background-color: var(--pf-c-page__main-breadcrumb--BackgroundColor); }\n  .pf-c-page__main-nav + :host(pf-page-header-brand-toggle) .pf-c-page__main-breadcrumb {\n    --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-nav--main-breadcrumb--PaddingTop); }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__main-section {\n  padding: var(--pf-c-page__main-section--PaddingTop) var(--pf-c-page__main-section--PaddingRight) var(--pf-c-page__main-section--PaddingBottom) var(--pf-c-page__main-section--PaddingLeft);\n  background-color: var(--pf-c-page__main-section--BackgroundColor); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-section:last-of-type, :host(pf-page-header-brand-toggle) .pf-c-page__main-section:only-child, :host(pf-page-header-brand-toggle) .pf-c-page__main-section.pf-m-fill {\n    flex: 1 0 auto; }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-section.pf-m-no-fill {\n    flex: 0 0 auto; }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-section.pf-m-light {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-light--BackgroundColor); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-section[class*="pf-m-dark-"] {\n    color: var(--pf-global--Color--100); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-section.pf-m-dark-100 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-100--BackgroundColor); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-section.pf-m-dark-200 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-200--BackgroundColor); }\n  :host(pf-page-header-brand-toggle) .pf-c-page__main-section.pf-m-no-padding {\n    padding: 0; }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-brand-toggle) .pf-c-page__main-section.pf-m-no-padding-mobile {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft); } }\n\n:host(pf-page-header-brand-toggle) .pf-c-page__drawer > .pf-c-drawer {\n  flex: 1 0 auto; }\n  :host(pf-page-header-brand-toggle) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content {\n    display: flex;\n    flex-direction: column; }\n    :host(pf-page-header-brand-toggle) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content .pf-c-page__main {\n      --pf-c-page__main--ZIndex: auto;\n      grid-area: auto;\n      flex: 1 0 auto; }\n\n:host(pf-page-header-brand-link) .pf-c-page {\n  --pf-c-page--BackgroundColor: var(--pf-global--BackgroundColor--dark-100);\n  --pf-c-page__header--ZIndex: var(--pf-global--ZIndex--md);\n  --pf-c-page__header--MinHeight: 4.75rem;\n  --pf-c-page__header-brand--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-brand--md--PaddingRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-brand--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft: calc(var(--pf-global--spacer--sm) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--FontSize: var(--pf-global--FontSize--2xl);\n  --pf-c-page__header-brand-link--c-brand--MaxHeight: 3.75rem;\n  --pf-c-page__header-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-nav--lg--PaddingLeft: 0;\n  --pf-c-page__header-nav--lg--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--lg--MarginRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--BackgroundColor: #242424;\n  --pf-c-page__header-nav--lg--BackgroundColor: transparent;\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left: 0;\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor: var(--pf-c-page__header-nav--BackgroundColor);\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--Top: 0;\n  --pf-c-page__header-tools--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--md--MarginRight: var(--pf-global--spacer--lg);\n  --pf-c-page__header-tools--c-avatar--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools-group--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__sidebar--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-page__sidebar--Width: 80%;\n  --pf-c-page__sidebar--md--Width: 18.125rem;\n  --pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__sidebar--BoxShadow: var(--pf-global--BoxShadow--lg-right);\n  --pf-c-page__sidebar--Transition: var(--pf-global--Transition);\n  --pf-c-page__sidebar--Transform: translate3d(-100%, 0, 0);\n  --pf-c-page__sidebar--m-expanded--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar--md--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar-body--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__sidebar-body--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingBottom: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft: 0;\n  --pf-c-page__main-section--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-page__main--ZIndex: var(--pf-global--ZIndex--xs);\n  --pf-c-page__main-nav--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-nav--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__main-nav--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-breadcrumb--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingBottom: 0;\n  --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--main-breadcrumb--PaddingTop: 0;\n  --pf-c-page__main-section--m-light--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-section--m-dark-100--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-100);\n  --pf-c-page__main-section--m-dark-200--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-200);\n  display: grid;\n  height: 100%;\n  grid-template-columns: 1fr;\n  grid-template-rows: -webkit-max-content 1fr;\n  grid-template-rows: max-content 1fr;\n  grid-template-areas: "header" "main";\n  background-color: var(--pf-c-page--BackgroundColor); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__header-brand--PaddingLeft: var(--pf-c-page__header-brand--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: var(--pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--md--PaddingLeft);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left); } }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--lg--PaddingLeft);\n      --pf-c-page__header-nav--BackgroundColor: var(--pf-c-page__header-nav--lg--BackgroundColor);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__header-tools--MarginRight: var(--pf-c-page__header-tools--md--MarginRight); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__sidebar--Width: var(--pf-c-page__sidebar--md--Width);\n      --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--md--Transform); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--md--PaddingLeft); } }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left);\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__main-nav--PaddingRight: var(--pf-c-page__main-nav--md--PaddingRight);\n      --pf-c-page__main-nav--PaddingLeft: var(--pf-c-page__main-nav--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-breadcrumb--md--PaddingTop);\n      --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-c-page__main-breadcrumb--md--PaddingRight);\n      --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-c-page__main-breadcrumb--md--PaddingLeft); } }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page {\n      grid-template-columns: -webkit-max-content 1fr;\n      grid-template-columns: max-content 1fr;\n      grid-template-areas: "header header" "nav main"; } }\n\n:host(pf-page-header-brand-link) .pf-c-page__header {\n  color: var(--pf-global--Color--100);\n  z-index: var(--pf-c-page__header--ZIndex);\n  grid-template-columns: auto auto;\n  display: grid;\n  grid-area: header;\n  align-items: center;\n  min-width: 0;\n  min-height: var(--pf-c-page__header--MinHeight); }\n  :host(pf-page-header-brand-link) .pf-c-page__header > * {\n    display: flex;\n    align-items: center; }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-link) .pf-c-page__header {\n      grid-template-columns: auto 1fr auto; } }\n\n:host(pf-page-header-brand-link) .pf-c-page__header-brand {\n  grid-column: 1 / 2;\n  padding-left: var(--pf-c-page__header-brand--PaddingLeft); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page__header-brand {\n      padding-right: var(--pf-c-page__header-brand--md--PaddingRight); } }\n\n:host(pf-page-header-brand-link) .pf-c-page__header-brand-link {\n  display: flex;\n  flex: 1;\n  align-items: center; }\n  :host(pf-page-header-brand-link) .pf-c-page__header-brand-link .pf-c-brand {\n    max-height: var(--pf-c-page__header-brand-link--c-brand--MaxHeight); }\n\n:host(pf-page-header-brand-link) .pf-c-page__header-brand-toggle .pf-c-button {\n  padding: var(--pf-c-page__header-sidebar-toggle__c-button--PaddingTop) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingRight) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingLeft);\n  margin-right: var(--pf-c-page__header-sidebar-toggle__c-button--MarginRight);\n  margin-left: var(--pf-c-page__header-sidebar-toggle__c-button--MarginLeft);\n  font-size: var(--pf-c-page__header-sidebar-toggle__c-button--FontSize);\n  line-height: 1; }\n\n:host(pf-page-header-brand-link) .pf-c-page__header-nav {\n  grid-column: 1 / -1;\n  grid-row: 2 / 3;\n  min-width: 0;\n  padding-left: var(--pf-c-page__header-nav--PaddingLeft);\n  background-color: var(--pf-c-page__header-nav--BackgroundColor); }\n  :host(pf-page-header-brand-link) .pf-c-page__header-nav > .pf-c-nav {\n    min-width: 0; }\n    @media screen and (max-width: 991px) {\n      :host(pf-page-header-brand-link) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button {\n        top: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--Top);\n        background-color: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor); } }\n    :host(pf-page-header-brand-link) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n      left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-link) .pf-c-page__header-nav {\n      grid-column: 2 / 3;\n      grid-row: 1 / 2;\n      flex: 1;\n      align-self: flex-end;\n      order: initial;\n      width: auto;\n      margin-right: var(--pf-c-page__header-nav--lg--MarginRight);\n      margin-left: var(--pf-c-page__header-nav--lg--MarginLeft); } }\n\n:host(pf-page-header-brand-link) .pf-c-page__header-tools {\n  grid-column: 2 / 3;\n  align-items: center;\n  margin-top: var(--pf-c-page__header-tools--MarginTop);\n  margin-right: var(--pf-c-page__header-tools--MarginRight);\n  margin-bottom: var(--pf-c-page__header-tools--MarginBottom);\n  margin-left: auto; }\n  :host(pf-page-header-brand-link) .pf-c-page__header-tools .pf-m-icons {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-brand-link) .pf-c-page__header-tools .pf-m-icons {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-brand-link) .pf-c-page__header-tools .pf-m-mobile {\n    margin-right: 0; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-brand-link) .pf-c-page__header-tools .pf-m-mobile {\n        display: none;\n        visibility: hidden; } }\n  :host(pf-page-header-brand-link) .pf-c-page__header-tools .pf-m-user {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 768px) {\n      :host(pf-page-header-brand-link) .pf-c-page__header-tools .pf-m-user {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-brand-link) .pf-c-page__header-tools .pf-c-avatar {\n    margin-left: var(--pf-c-page__header-tools--c-avatar--MarginLeft); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-brand-link) .pf-c-page__header-tools {\n      grid-column: 3 / 4; } }\n\n:host(pf-page-header-brand-link) .pf-c-page__header-tools-group {\n  display: flex; }\n  :host(pf-page-header-brand-link) .pf-c-page__header-tools-group + :host(pf-page-header-brand-link) .pf-c-page__header-tools-group {\n    margin-left: var(--pf-c-page__header-tools-group--MarginLeft); }\n\n:host(pf-page-header-brand-link) .pf-c-page__sidebar {\n  grid-area: nav;\n  grid-row-start: 2;\n  grid-column-start: 1;\n  z-index: var(--pf-c-page__sidebar--ZIndex);\n  width: var(--pf-c-page__sidebar--Width);\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background-color: var(--pf-c-page__sidebar--BackgroundColor);\n  transition: var(--pf-c-page__sidebar--Transition);\n  -webkit-transform: var(--pf-c-page__sidebar--Transform);\n          transform: var(--pf-c-page__sidebar--Transform); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page__sidebar {\n      max-width: var(--pf-c-page__sidebar--md--Width);\n      box-shadow: var(--pf-c-page__sidebar--BoxShadow); } }\n  :host(pf-page-header-brand-link) .pf-c-page__sidebar.pf-m-expanded {\n    --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--m-expanded--Transform);\n    box-shadow: var(--pf-c-page__sidebar--BoxShadow); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page__sidebar.pf-m-collapsed {\n      max-width: 0;\n      overflow: hidden; } }\n\n:host(pf-page-header-brand-link) .pf-c-page__sidebar-body {\n  padding-top: var(--pf-c-page__sidebar-body--PaddingTop);\n  padding-bottom: var(--pf-c-page__sidebar-body--PaddingBottom); }\n\n:host(pf-page-header-brand-link) .pf-c-page__main,\n:host(pf-page-header-brand-link) .pf-c-page__drawer {\n  grid-area: main;\n  z-index: var(--pf-c-page__main--ZIndex);\n  display: flex;\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  :host(pf-page-header-brand-link) .pf-c-page__main:focus,\n  :host(pf-page-header-brand-link) .pf-c-page__drawer:focus {\n    outline: 0; }\n\n:host(pf-page-header-brand-link) .pf-c-page__main-nav {\n  padding: var(--pf-c-page__main-nav--PaddingTop) var(--pf-c-page__main-nav--PaddingRight) var(--pf-c-page__main-nav--PaddingBottom) var(--pf-c-page__main-nav--PaddingLeft);\n  background-color: var(--pf-c-page__main-nav--BackgroundColor); }\n  :host(pf-page-header-brand-link) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n    left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  :host(pf-page-header-brand-link) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(2) {\n    right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right); }\n\n:host(pf-page-header-brand-link) .pf-c-page__main-breadcrumb {\n  padding: var(--pf-c-page__main-breadcrumb--PaddingTop) var(--pf-c-page__main-breadcrumb--PaddingRight) var(--pf-c-page__main-breadcrumb--PaddingBottom) var(--pf-c-page__main-breadcrumb--PaddingLeft);\n  background-color: var(--pf-c-page__main-breadcrumb--BackgroundColor); }\n  .pf-c-page__main-nav + :host(pf-page-header-brand-link) .pf-c-page__main-breadcrumb {\n    --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-nav--main-breadcrumb--PaddingTop); }\n\n:host(pf-page-header-brand-link) .pf-c-page__main-section {\n  padding: var(--pf-c-page__main-section--PaddingTop) var(--pf-c-page__main-section--PaddingRight) var(--pf-c-page__main-section--PaddingBottom) var(--pf-c-page__main-section--PaddingLeft);\n  background-color: var(--pf-c-page__main-section--BackgroundColor); }\n  :host(pf-page-header-brand-link) .pf-c-page__main-section:last-of-type, :host(pf-page-header-brand-link) .pf-c-page__main-section:only-child, :host(pf-page-header-brand-link) .pf-c-page__main-section.pf-m-fill {\n    flex: 1 0 auto; }\n  :host(pf-page-header-brand-link) .pf-c-page__main-section.pf-m-no-fill {\n    flex: 0 0 auto; }\n  :host(pf-page-header-brand-link) .pf-c-page__main-section.pf-m-light {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-light--BackgroundColor); }\n  :host(pf-page-header-brand-link) .pf-c-page__main-section[class*="pf-m-dark-"] {\n    color: var(--pf-global--Color--100); }\n  :host(pf-page-header-brand-link) .pf-c-page__main-section.pf-m-dark-100 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-100--BackgroundColor); }\n  :host(pf-page-header-brand-link) .pf-c-page__main-section.pf-m-dark-200 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-200--BackgroundColor); }\n  :host(pf-page-header-brand-link) .pf-c-page__main-section.pf-m-no-padding {\n    padding: 0; }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-brand-link) .pf-c-page__main-section.pf-m-no-padding-mobile {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft); } }\n\n:host(pf-page-header-brand-link) .pf-c-page__drawer > .pf-c-drawer {\n  flex: 1 0 auto; }\n  :host(pf-page-header-brand-link) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content {\n    display: flex;\n    flex-direction: column; }\n    :host(pf-page-header-brand-link) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content .pf-c-page__main {\n      --pf-c-page__main--ZIndex: auto;\n      grid-area: auto;\n      flex: 1 0 auto; }\n\n:host(pf-page-header-tools) .pf-c-page {\n  --pf-c-page--BackgroundColor: var(--pf-global--BackgroundColor--dark-100);\n  --pf-c-page__header--ZIndex: var(--pf-global--ZIndex--md);\n  --pf-c-page__header--MinHeight: 4.75rem;\n  --pf-c-page__header-brand--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-brand--md--PaddingRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-brand--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingRight: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--PaddingLeft: var(--pf-global--spacer--sm);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: calc(var(--pf-global--spacer--xs) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft: calc(var(--pf-global--spacer--sm) * -1);\n  --pf-c-page__header-sidebar-toggle__c-button--FontSize: var(--pf-global--FontSize--2xl);\n  --pf-c-page__header-brand-link--c-brand--MaxHeight: 3.75rem;\n  --pf-c-page__header-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__header-nav--lg--PaddingLeft: 0;\n  --pf-c-page__header-nav--lg--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--lg--MarginRight: var(--pf-global--spacer--xl);\n  --pf-c-page__header-nav--BackgroundColor: #242424;\n  --pf-c-page__header-nav--lg--BackgroundColor: transparent;\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left: 0;\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor: var(--pf-c-page__header-nav--BackgroundColor);\n  --pf-c-page__header-nav--c-nav__scroll-button--lg--Top: 0;\n  --pf-c-page__header-tools--MarginTop: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--MarginRight: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools--MarginBottom: var(--pf-global--spacer--sm);\n  --pf-c-page__header-tools--md--MarginRight: var(--pf-global--spacer--lg);\n  --pf-c-page__header-tools--c-avatar--MarginLeft: var(--pf-global--spacer--md);\n  --pf-c-page__header-tools-group--MarginLeft: var(--pf-global--spacer--xl);\n  --pf-c-page__sidebar--ZIndex: var(--pf-global--ZIndex--sm);\n  --pf-c-page__sidebar--Width: 80%;\n  --pf-c-page__sidebar--md--Width: 18.125rem;\n  --pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__sidebar--BoxShadow: var(--pf-global--BoxShadow--lg-right);\n  --pf-c-page__sidebar--Transition: var(--pf-global--Transition);\n  --pf-c-page__sidebar--Transform: translate3d(-100%, 0, 0);\n  --pf-c-page__sidebar--m-expanded--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar--md--Transform: translate3d(0, 0, 0);\n  --pf-c-page__sidebar-body--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__sidebar-body--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-section--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingBottom: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom: 0;\n  --pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft: 0;\n  --pf-c-page__main-section--BackgroundColor: var(--pf-global--BackgroundColor--light-300);\n  --pf-c-page__main--ZIndex: var(--pf-global--ZIndex--xs);\n  --pf-c-page__main-nav--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-nav--PaddingTop: var(--pf-global--spacer--sm);\n  --pf-c-page__main-nav--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingBottom: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-nav--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: calc(-1 * (var(--pf-global--spacer--lg) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right: calc(-1 * (var(--pf-global--spacer--md) - var(--pf-global--spacer--xs)));\n  --pf-c-page__main-breadcrumb--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--PaddingBottom: 0;\n  --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-global--spacer--md);\n  --pf-c-page__main-breadcrumb--md--PaddingTop: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingRight: var(--pf-global--spacer--lg);\n  --pf-c-page__main-breadcrumb--md--PaddingLeft: var(--pf-global--spacer--lg);\n  --pf-c-page__main-nav--main-breadcrumb--PaddingTop: 0;\n  --pf-c-page__main-section--m-light--BackgroundColor: var(--pf-global--BackgroundColor--light-100);\n  --pf-c-page__main-section--m-dark-100--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-100);\n  --pf-c-page__main-section--m-dark-200--BackgroundColor: var(--pf-global--BackgroundColor--dark-transparent-200);\n  display: grid;\n  height: 100%;\n  grid-template-columns: 1fr;\n  grid-template-rows: -webkit-max-content 1fr;\n  grid-template-rows: max-content 1fr;\n  grid-template-areas: "header" "main";\n  background-color: var(--pf-c-page--BackgroundColor); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__header-brand--PaddingLeft: var(--pf-c-page__header-brand--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__header-sidebar-toggle__c-button--MarginLeft: var(--pf-c-page__header-sidebar-toggle__c-button--md--MarginLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--md--PaddingLeft);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--md--Left); } }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__header-nav--PaddingLeft: var(--pf-c-page__header-nav--lg--PaddingLeft);\n      --pf-c-page__header-nav--BackgroundColor: var(--pf-c-page__header-nav--lg--BackgroundColor);\n      --pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--lg--Left); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__header-tools--MarginRight: var(--pf-c-page__header-tools--md--MarginRight); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__sidebar--Width: var(--pf-c-page__sidebar--md--Width);\n      --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--md--Transform); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--md--PaddingLeft); } }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--md--Left);\n      --pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--md--Right); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__main-nav--PaddingRight: var(--pf-c-page__main-nav--md--PaddingRight);\n      --pf-c-page__main-nav--PaddingLeft: var(--pf-c-page__main-nav--md--PaddingLeft); } }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-breadcrumb--md--PaddingTop);\n      --pf-c-page__main-breadcrumb--PaddingRight: var(--pf-c-page__main-breadcrumb--md--PaddingRight);\n      --pf-c-page__main-breadcrumb--PaddingLeft: var(--pf-c-page__main-breadcrumb--md--PaddingLeft); } }\n  @media (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page {\n      grid-template-columns: -webkit-max-content 1fr;\n      grid-template-columns: max-content 1fr;\n      grid-template-areas: "header header" "nav main"; } }\n\n:host(pf-page-header-tools) .pf-c-page__header {\n  color: var(--pf-global--Color--100);\n  z-index: var(--pf-c-page__header--ZIndex);\n  grid-template-columns: auto auto;\n  display: grid;\n  grid-area: header;\n  align-items: center;\n  min-width: 0;\n  min-height: var(--pf-c-page__header--MinHeight); }\n  :host(pf-page-header-tools) .pf-c-page__header > * {\n    display: flex;\n    align-items: center; }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-tools) .pf-c-page__header {\n      grid-template-columns: auto 1fr auto; } }\n\n:host(pf-page-header-tools) .pf-c-page__header-brand {\n  grid-column: 1 / 2;\n  padding-left: var(--pf-c-page__header-brand--PaddingLeft); }\n  @media (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page__header-brand {\n      padding-right: var(--pf-c-page__header-brand--md--PaddingRight); } }\n\n:host(pf-page-header-tools) .pf-c-page__header-brand-link {\n  display: flex;\n  flex: 1;\n  align-items: center; }\n  :host(pf-page-header-tools) .pf-c-page__header-brand-link .pf-c-brand {\n    max-height: var(--pf-c-page__header-brand-link--c-brand--MaxHeight); }\n\n:host(pf-page-header-tools) .pf-c-page__header-brand-toggle .pf-c-button {\n  padding: var(--pf-c-page__header-sidebar-toggle__c-button--PaddingTop) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingRight) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingBottom) var(--pf-c-page__header-sidebar-toggle__c-button--PaddingLeft);\n  margin-right: var(--pf-c-page__header-sidebar-toggle__c-button--MarginRight);\n  margin-left: var(--pf-c-page__header-sidebar-toggle__c-button--MarginLeft);\n  font-size: var(--pf-c-page__header-sidebar-toggle__c-button--FontSize);\n  line-height: 1; }\n\n:host(pf-page-header-tools) .pf-c-page__header-nav {\n  grid-column: 1 / -1;\n  grid-row: 2 / 3;\n  min-width: 0;\n  padding-left: var(--pf-c-page__header-nav--PaddingLeft);\n  background-color: var(--pf-c-page__header-nav--BackgroundColor); }\n  :host(pf-page-header-tools) .pf-c-page__header-nav > .pf-c-nav {\n    min-width: 0; }\n    @media screen and (max-width: 991px) {\n      :host(pf-page-header-tools) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button {\n        top: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--Top);\n        background-color: var(--pf-c-page__header-nav--c-nav__scroll-button--lg--BackgroundColor); } }\n    :host(pf-page-header-tools) .pf-c-page__header-nav > .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n      left: var(--pf-c-page__header-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-tools) .pf-c-page__header-nav {\n      grid-column: 2 / 3;\n      grid-row: 1 / 2;\n      flex: 1;\n      align-self: flex-end;\n      order: initial;\n      width: auto;\n      margin-right: var(--pf-c-page__header-nav--lg--MarginRight);\n      margin-left: var(--pf-c-page__header-nav--lg--MarginLeft); } }\n\n:host(pf-page-header-tools) .pf-c-page__header-tools {\n  grid-column: 2 / 3;\n  align-items: center;\n  margin-top: var(--pf-c-page__header-tools--MarginTop);\n  margin-right: var(--pf-c-page__header-tools--MarginRight);\n  margin-bottom: var(--pf-c-page__header-tools--MarginBottom);\n  margin-left: auto; }\n  :host(pf-page-header-tools) .pf-c-page__header-tools .pf-m-icons {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-tools) .pf-c-page__header-tools .pf-m-icons {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-tools) .pf-c-page__header-tools .pf-m-mobile {\n    margin-right: 0; }\n    @media screen and (min-width: 992px) {\n      :host(pf-page-header-tools) .pf-c-page__header-tools .pf-m-mobile {\n        display: none;\n        visibility: hidden; } }\n  :host(pf-page-header-tools) .pf-c-page__header-tools .pf-m-user {\n    display: none;\n    visibility: hidden; }\n    @media screen and (min-width: 768px) {\n      :host(pf-page-header-tools) .pf-c-page__header-tools .pf-m-user {\n        display: block;\n        visibility: visible; } }\n  :host(pf-page-header-tools) .pf-c-page__header-tools .pf-c-avatar {\n    margin-left: var(--pf-c-page__header-tools--c-avatar--MarginLeft); }\n  @media screen and (min-width: 992px) {\n    :host(pf-page-header-tools) .pf-c-page__header-tools {\n      grid-column: 3 / 4; } }\n\n:host(pf-page-header-tools) .pf-c-page__header-tools-group {\n  display: flex; }\n  :host(pf-page-header-tools) .pf-c-page__header-tools-group + :host(pf-page-header-tools) .pf-c-page__header-tools-group {\n    margin-left: var(--pf-c-page__header-tools-group--MarginLeft); }\n\n:host(pf-page-header-tools) .pf-c-page__sidebar {\n  grid-area: nav;\n  grid-row-start: 2;\n  grid-column-start: 1;\n  z-index: var(--pf-c-page__sidebar--ZIndex);\n  width: var(--pf-c-page__sidebar--Width);\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  background-color: var(--pf-c-page__sidebar--BackgroundColor);\n  transition: var(--pf-c-page__sidebar--Transition);\n  -webkit-transform: var(--pf-c-page__sidebar--Transform);\n          transform: var(--pf-c-page__sidebar--Transform); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page__sidebar {\n      max-width: var(--pf-c-page__sidebar--md--Width);\n      box-shadow: var(--pf-c-page__sidebar--BoxShadow); } }\n  :host(pf-page-header-tools) .pf-c-page__sidebar.pf-m-expanded {\n    --pf-c-page__sidebar--Transform: var(--pf-c-page__sidebar--m-expanded--Transform);\n    box-shadow: var(--pf-c-page__sidebar--BoxShadow); }\n  @media screen and (min-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page__sidebar.pf-m-collapsed {\n      max-width: 0;\n      overflow: hidden; } }\n\n:host(pf-page-header-tools) .pf-c-page__sidebar-body {\n  padding-top: var(--pf-c-page__sidebar-body--PaddingTop);\n  padding-bottom: var(--pf-c-page__sidebar-body--PaddingBottom); }\n\n:host(pf-page-header-tools) .pf-c-page__main,\n:host(pf-page-header-tools) .pf-c-page__drawer {\n  grid-area: main;\n  z-index: var(--pf-c-page__main--ZIndex);\n  display: flex;\n  flex-direction: column;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch; }\n  :host(pf-page-header-tools) .pf-c-page__main:focus,\n  :host(pf-page-header-tools) .pf-c-page__drawer:focus {\n    outline: 0; }\n\n:host(pf-page-header-tools) .pf-c-page__main-nav {\n  padding: var(--pf-c-page__main-nav--PaddingTop) var(--pf-c-page__main-nav--PaddingRight) var(--pf-c-page__main-nav--PaddingBottom) var(--pf-c-page__main-nav--PaddingLeft);\n  background-color: var(--pf-c-page__main-nav--BackgroundColor); }\n  :host(pf-page-header-tools) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(1) {\n    left: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-1--Left); }\n  :host(pf-page-header-tools) .pf-c-page__main-nav .pf-c-nav .pf-c-nav__scroll-button:nth-of-type(2) {\n    right: var(--pf-c-page__main-nav--c-nav__scroll-button--nth-of-type-2--Right); }\n\n:host(pf-page-header-tools) .pf-c-page__main-breadcrumb {\n  padding: var(--pf-c-page__main-breadcrumb--PaddingTop) var(--pf-c-page__main-breadcrumb--PaddingRight) var(--pf-c-page__main-breadcrumb--PaddingBottom) var(--pf-c-page__main-breadcrumb--PaddingLeft);\n  background-color: var(--pf-c-page__main-breadcrumb--BackgroundColor); }\n  .pf-c-page__main-nav + :host(pf-page-header-tools) .pf-c-page__main-breadcrumb {\n    --pf-c-page__main-breadcrumb--PaddingTop: var(--pf-c-page__main-nav--main-breadcrumb--PaddingTop); }\n\n:host(pf-page-header-tools) .pf-c-page__main-section {\n  padding: var(--pf-c-page__main-section--PaddingTop) var(--pf-c-page__main-section--PaddingRight) var(--pf-c-page__main-section--PaddingBottom) var(--pf-c-page__main-section--PaddingLeft);\n  background-color: var(--pf-c-page__main-section--BackgroundColor); }\n  :host(pf-page-header-tools) .pf-c-page__main-section:last-of-type, :host(pf-page-header-tools) .pf-c-page__main-section:only-child, :host(pf-page-header-tools) .pf-c-page__main-section.pf-m-fill {\n    flex: 1 0 auto; }\n  :host(pf-page-header-tools) .pf-c-page__main-section.pf-m-no-fill {\n    flex: 0 0 auto; }\n  :host(pf-page-header-tools) .pf-c-page__main-section.pf-m-light {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-light--BackgroundColor); }\n  :host(pf-page-header-tools) .pf-c-page__main-section[class*="pf-m-dark-"] {\n    color: var(--pf-global--Color--100); }\n  :host(pf-page-header-tools) .pf-c-page__main-section.pf-m-dark-100 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-100--BackgroundColor); }\n  :host(pf-page-header-tools) .pf-c-page__main-section.pf-m-dark-200 {\n    --pf-c-page__main-section--BackgroundColor: var(--pf-c-page__main-section--m-dark-200--BackgroundColor); }\n  :host(pf-page-header-tools) .pf-c-page__main-section.pf-m-no-padding {\n    padding: 0; }\n  @media screen and (max-width: 768px) {\n    :host(pf-page-header-tools) .pf-c-page__main-section.pf-m-no-padding-mobile {\n      --pf-c-page__main-section--PaddingTop: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingTop);\n      --pf-c-page__main-section--PaddingRight: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingRight);\n      --pf-c-page__main-section--PaddingBottom: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingBottom);\n      --pf-c-page__main-section--PaddingLeft: var(--pf-c-page__main-section--m-no-padding-mobile--md--PaddingLeft); } }\n\n:host(pf-page-header-tools) .pf-c-page__drawer > .pf-c-drawer {\n  flex: 1 0 auto; }\n  :host(pf-page-header-tools) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content {\n    display: flex;\n    flex-direction: column; }\n    :host(pf-page-header-tools) .pf-c-page__drawer > .pf-c-drawer > .pf-c-drawer__content .pf-c-page__main {\n      --pf-c-page__main--ZIndex: auto;\n      grid-area: auto;\n      flex: 1 0 auto; }\n',
  ]);

  function _templateObject$2() {
    var data = taggedTemplateLiteral(["\n      <div class=\"", "\"><slot></slot></div>\n    "]);

    _templateObject$2 = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Page.
   */

  var PFPage = decorate([customElement("".concat(pfPrefix, "-page"))], function (_initialize, _LitElement) {
    var PFPage =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFPage, _LitElement2);

      function PFPage() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFPage);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFPage)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFPage;
    }(_LitElement);

    return {
      F: PFPage,
      d: [{
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-page"));
          return html(_templateObject$2(), classes);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles$2;
        }
      }]
    };
  }, LitElement);

  function _templateObject$3() {
    var data = taggedTemplateLiteral(["\n      <header role=\"banner\" class=\"", "\"><slot></slot></header>\n    "]);

    _templateObject$3 = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Page Header.
   */

  var PFPageHeader = decorate([customElement("".concat(pfPrefix, "-page-header"))], function (_initialize, _LitElement) {
    var PFPageHeader =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFPageHeader, _LitElement2);

      function PFPageHeader() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFPageHeader);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFPageHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFPageHeader;
    }(_LitElement);

    return {
      F: PFPageHeader,
      d: [{
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-page__header"));
          return html(_templateObject$3(), classes);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles$2;
        }
      }]
    };
  }, LitElement);

  function _templateObject$4() {
    var data = taggedTemplateLiteral(["\n      <div class=\"", "\"><slot></slot></div>\n    "]);

    _templateObject$4 = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Page Header Brand.
   */

  var PFPageHeaderBrand = decorate([customElement("".concat(pfPrefix, "-page-header-brand"))], function (_initialize, _LitElement) {
    var PFPageHeaderBrand =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFPageHeaderBrand, _LitElement2);

      function PFPageHeaderBrand() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFPageHeaderBrand);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFPageHeaderBrand)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFPageHeaderBrand;
    }(_LitElement);

    return {
      F: PFPageHeaderBrand,
      d: [{
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-page__header-brand"));
          return html(_templateObject$4(), classes);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles$2;
        }
      }]
    };
  }, LitElement);

  function _templateObject$5() {
    var data = taggedTemplateLiteral(["\n      <a class=\"", "\"><slot></slot></a>\n    "]);

    _templateObject$5 = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Page Header Brand Link.
   */

  var PFPageHeaderBrandLink = decorate([customElement("".concat(pfPrefix, "-page-header-brand-link"))], function (_initialize, _LitElement) {
    var PFPageHeaderBrandLink =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFPageHeaderBrandLink, _LitElement2);

      function PFPageHeaderBrandLink() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFPageHeaderBrandLink);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFPageHeaderBrandLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFPageHeaderBrandLink;
    }(_LitElement);

    return {
      F: PFPageHeaderBrandLink,
      d: [{
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-page__header-brand-link"));
          return html(_templateObject$5(), classes);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles$2;
        }
      }]
    };
  }, LitElement);

  function _templateObject$6() {
    var data = taggedTemplateLiteral(["\n      <div class=\"", "\"><slot></slot></div>\n    "]);

    _templateObject$6 = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Page Header Brand.
   */

  var PFPageHeaderBrandToggle = decorate([customElement("".concat(pfPrefix, "-page-header-brand-toggle"))], function (_initialize, _LitElement) {
    var PFPageHeaderBrandToggle =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFPageHeaderBrandToggle, _LitElement2);

      function PFPageHeaderBrandToggle() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFPageHeaderBrandToggle);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFPageHeaderBrandToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFPageHeaderBrandToggle;
    }(_LitElement);

    return {
      F: PFPageHeaderBrandToggle,
      d: [{
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-page__header-brand-toggle"));
          return html(_templateObject$6(), classes);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles$2;
        }
      }]
    };
  }, LitElement);

  function _templateObject$7() {
    var data = taggedTemplateLiteral(["\n      <div class=\"", "\"><slot></slot></div>\n    "]);

    _templateObject$7 = function _templateObject() {
      return data;
    };

    return data;
  }
  /**
   * Page Header Tools.
   */

  var PFPageHeaderTools = decorate([customElement("".concat(pfPrefix, "-page-header-tools"))], function (_initialize, _LitElement) {
    var PFPageHeaderTools =
    /*#__PURE__*/
    function (_LitElement2) {
      inherits(PFPageHeaderTools, _LitElement2);

      function PFPageHeaderTools() {
        var _getPrototypeOf2;

        var _this;

        classCallCheck(this, PFPageHeaderTools);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(PFPageHeaderTools)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _initialize(assertThisInitialized(assertThisInitialized(_this)));

        return _this;
      }

      return PFPageHeaderTools;
    }(_LitElement);

    return {
      F: PFPageHeaderTools,
      d: [{
        kind: "field",
        decorators: [property({
          reflect: false
        })],
        key: "class",
        value: function value() {
          return '';
        }
      }, {
        kind: "method",
        key: "createRenderRoot",
        value:
        /**
         * Additional button classes
         */
        function createRenderRoot() {
          return this.attachShadow({
            mode: 'open',
            delegatesFocus: true
          });
        }
      }, {
        kind: "method",
        key: "render",
        value: function render() {
          var additionalClass = this.class;
          var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-page__header-tools"));
          return html(_templateObject$7(), classes);
        }
      }, {
        kind: "field",
        static: true,
        key: "styles",
        value: function value() {
          return styles$2;
        }
      }]
    };
  }, LitElement);

  exports.PFButton = PFButton;
  exports.PFDropdown = PFDropdown;
  exports.PFHeader = PFPageHeader;
  exports.PFHeaderBrand = PFPageHeaderBrand;
  exports.PFHeaderBrandLink = PFPageHeaderBrandLink;
  exports.PFHeaderBrandToggle = PFPageHeaderBrandToggle;
  exports.PFHeaderTools = PFPageHeaderTools;
  exports.PFPage = PFPage;

  return exports;

}({}));
