var CarbonCustomElements = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';
	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == O && globalThis) ||
	  check(typeof window == O && window) ||
	  check(typeof self == O && self) ||
	  check(typeof commonjsGlobal == O && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings



	var split = ''.split;

	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// 7.1.1 ToPrimitive(input [, PreferredType])
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var exist = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return exist ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.1.3',
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap$1 = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(functionToString.call(WeakMap$1));

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$2 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store = new WeakMap$2();
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(functionToString).split('toString');

	shared('inspectSource', function (it) {
	  return functionToString.call(it);
	});

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else hide(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
	});
	});

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	// false -> Array#indexOf
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	// true  -> Array#includes
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	var arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIndexOf = arrayIncludes(false);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)



	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	var Reflect$1 = global_1.Reflect;

	// all object keys, includes non-enumerable and symbols
	var ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      hide(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var Symbol$1 = global_1.Symbol;
	var store$1 = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
	    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	// 0 -> Array#forEach
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	// 1 -> Array#map
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// 2 -> Array#filter
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// 3 -> Array#some
	// https://tc39.github.io/ecma262/#sec-array.prototype.some
	// 4 -> Array#every
	// https://tc39.github.io/ecma262/#sec-array.prototype.every
	// 5 -> Array#find
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	// 6 -> Array#findIndex
	// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	var arrayMethods = function (TYPE, specificCreate) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = specificCreate || arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: target.push(value);       // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var key;
	  while (length > i) objectDefineProperty.f(O, key = keys[i++], Properties[key]);
	  return O;
	};

	var document$2 = global_1.document;

	var html = document$2 && document$2.documentElement;

	var IE_PROTO = sharedKey('IE_PROTO');

	var PROTOTYPE = 'prototype';
	var Empty = function () { /* empty */ };

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
	  return createDict();
	};

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO] = true;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  hide(ArrayPrototype, UNSCOPABLES, objectCreate(null));
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var internalFind = arrayMethods(5);
	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return internalFind(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	// `Math.sign` method implementation
	// https://tc39.github.io/ecma262/#sec-math.sign
	var mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// `Math.sign` method
	// https://tc39.github.io/ecma262/#sec-math.sign
	_export({ target: 'Math', stat: true }, {
	  sign: mathSign
	});

	var defineProperty = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var f$5 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$5
	};

	var path = global_1;

	var defineProperty$1 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	// all enumerable object keys, includes symbols
	var enumKeys = function (it) {
	  var result = objectKeys(it);
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  if (getOwnPropertySymbols) {
	    var symbols = getOwnPropertySymbols(it);
	    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (propertyIsEnumerable.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$6
	};

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(SYMBOL);
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var $Symbol = global_1.Symbol;
	var JSON$1 = global_1.JSON;
	var nativeJSONStringify = JSON$1 && JSON$1.stringify;
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var WellKnownSymbolsStore = shared('wks');
	var ObjectPrototype = Object[PROTOTYPE$1];
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, key);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[key];
	  nativeDefineProperty$1(it, key, D);
	  if (ObjectPrototypeDescriptor && it !== ObjectPrototype) {
	    nativeDefineProperty$1(ObjectPrototype, key, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) nativeDefineProperty$1(it, HIDDEN, createPropertyDescriptor(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = objectCreate(D, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(it, key, D);
	  } return nativeDefineProperty$1(it, key, D);
	};

	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIndexedObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};

	var $create = function create(it, P) {
	  return P === undefined ? objectCreate(it) : $defineProperties(objectCreate(it), P);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = nativePropertyIsEnumerable$1.call(this, key = toPrimitive(key, true));
	  if (this === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIndexedObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var D = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && !has(hiddenKeys, key)) result.push(key);
	  } return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames$1(IS_OP ? ObjectPrototypeSymbols : toIndexedObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectPrototype, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };
	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }

	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	for (var wellKnownSymbols = objectKeys(WellKnownSymbolsStore), k = 0; wellKnownSymbols.length > k;) {
	  defineWellKnownSymbol(wellKnownSymbols[k++]);
	}

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	JSON$1 && _export({ target: 'JSON', stat: true, forced: !nativeSymbol || fails(function () {
	  var symbol = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  return nativeJSONStringify([symbol]) != '[null]'
	    // WebKit converts symbol values to JSON as null
	    || nativeJSONStringify({ a: symbol }) != '{}'
	    // V8 throws on boxed symbols
	    || nativeJSONStringify(Object(symbol)) != '{}';
	}) }, {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return nativeJSONStringify.apply(JSON$1, args);
	  }
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var internalIncludes = arrayIncludes(true);

	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return internalIncludes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype$1 = Object.prototype;

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype$1 : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  return IteratorConstructor;
	};

	var validateSetPrototypeOfArguments = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) {
	    throw TypeError("Can't set " + String(proto) + ' as a prototype');
	  }
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var correctSetter = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    correctSetter = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    validateSetPrototypeOfArguments(O, proto);
	    if (correctSetter) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$1);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    hide(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// TO_ENTRIES: true  -> Object.entries
	// TO_ENTRIES: false -> Object.values
	var objectToArray = function (it, TO_ENTRIES) {
	  var O = toIndexedObject(it);
	  var keys = objectKeys(O);
	  var length = keys.length;
	  var i = 0;
	  var result = [];
	  var key;
	  while (length > i) {
	    key = keys[i++];
	    if (!descriptors || propertyIsEnumerable.call(O, key)) {
	      result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	    }
	  }
	  return result;
	};

	// `Object.values` method
	// https://tc39.github.io/ecma262/#sec-object.values
	_export({ target: 'Object', stat: true }, {
	  values: function values(O) {
	    return objectToArray(O);
	  }
	});

	if (typeof Element.prototype.closest !== 'function') {
	  Element.prototype.closest = function closestElement(selector) {
	    var doc = this.ownerDocument;

	    for (var traverse = this; traverse && traverse !== doc; traverse = traverse.parentNode) {
	      if (traverse.nodeType === Node.ELEMENT_NODE && traverse.matches(selector)) {
	        return traverse;
	      }
	    }

	    return null;
	  };
	}

	var matchesFuncName = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(function (name) {
	  return typeof Element.prototype[name] === 'function';
	})[0];

	if (matchesFuncName !== 'matches') {
	  Element.prototype.matches = Element.prototype[matchesFuncName];
	}

	if (!Element.prototype.toggleAttribute) {
	  Element.prototype.toggleAttribute = function toggleAttribute(name, force) {
	    var oldState = Boolean(this.hasAttribute(name));
	    var newState = typeof force !== 'undefined' ? Boolean(force) : !oldState;

	    if (oldState !== newState) {
	      if (newState) {
	        this.setAttribute(name, '');
	      } else {
	        this.removeAttribute(name);
	      }
	    }

	    return newState;
	  };
	}

	var missingNativeDOMTokenListToggleForce = function () {
	  var elem = document.createElement('div');
	  var randomClass = "_random_class_".concat(Math.random().toString(36).slice(2));
	  elem.classList.toggle(randomClass, false);
	  return elem.classList.contains(randomClass);
	}();

	if (missingNativeDOMTokenListToggleForce) {
	  (function () {
	    var origToggle = DOMTokenList.prototype.toggle;

	    DOMTokenList.prototype.toggle = function toggleDOMTokenList(name, add) {
	      return arguments.length < 2 || this.contains(name) === !add ? origToggle.call(this, name) : add;
	    };
	  })();
	}

	var es6Promise = createCommonjsModule(function (module, exports) {
	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   v4.2.5+7f2b526d
	 */

	(function (global, factory) {
		 module.exports = factory() ;
	}(commonjsGlobal, (function () {
	function objectOrFunction(x) {
	  var type = typeof x;
	  return x !== null && (type === 'object' || type === 'function');
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}



	var _isArray = void 0;
	if (Array.isArray) {
	  _isArray = Array.isArray;
	} else {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	}

	var isArray = _isArray;

	var len = 0;
	var vertxNext = void 0;
	var customSchedulerFn = void 0;

	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};

	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}

	function setAsap(asapFn) {
	  asap = asapFn;
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }

	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}

	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];

	    callback(arg);

	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertx() {
	  try {
	    var vertx = Function('return this')().require('vertx');
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush = void 0;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}

	function then(onFulfillment, onRejection) {
	  var parent = this;

	  var child = new this.constructor(noop);

	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }

	  var _state = parent._state;


	  if (_state) {
	    var callback = arguments[_state - 1];
	    asap(function () {
	      return invokeCallback(_state, child, callback, parent._result);
	    });
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop);
	  resolve(promise, object);
	  return promise;
	}

	var PROMISE_ID = Math.random().toString(36).substring(2);

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var TRY_CATCH_ERROR = { error: null };

	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}

	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    TRY_CATCH_ERROR.error = error;
	    return TRY_CATCH_ERROR;
	  }
	}

	function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then$$1.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then$$1) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then$$1, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return resolve(promise, value);
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$1) {
	  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$1 === TRY_CATCH_ERROR) {
	      reject(promise, TRY_CATCH_ERROR.error);
	      TRY_CATCH_ERROR.error = null;
	    } else if (then$$1 === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$1)) {
	      handleForeignThenable(promise, maybeThenable, then$$1);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function resolve(promise, value) {
	  if (promise === value) {
	    reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;

	  asap(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;


	  parent._onerror = null;

	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = void 0,
	      callback = void 0,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = void 0,
	      error = void 0,
	      succeeded = void 0,
	      failed = void 0;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null;
	    } else {
	      succeeded = true;
	    }

	    if (promise === value) {
	      reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
	    resolve(promise, value);
	  } else if (failed) {
	    reject(promise, error);
	  } else if (settled === FULFILLED) {
	    fulfill(promise, value);
	  } else if (settled === REJECTED) {
	    reject(promise, value);
	  }
	}

	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      resolve(promise, value);
	    }, function rejectPromise(reason) {
	      reject(promise, reason);
	    });
	  } catch (e) {
	    reject(promise, e);
	  }
	}

	var id = 0;
	function nextId() {
	  return id++;
	}

	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}

	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	}

	var Enumerator = function () {
	  function Enumerator(Constructor, input) {
	    this._instanceConstructor = Constructor;
	    this.promise = new Constructor(noop);

	    if (!this.promise[PROMISE_ID]) {
	      makePromise(this.promise);
	    }

	    if (isArray(input)) {
	      this.length = input.length;
	      this._remaining = input.length;

	      this._result = new Array(this.length);

	      if (this.length === 0) {
	        fulfill(this.promise, this._result);
	      } else {
	        this.length = this.length || 0;
	        this._enumerate(input);
	        if (this._remaining === 0) {
	          fulfill(this.promise, this._result);
	        }
	      }
	    } else {
	      reject(this.promise, validationError());
	    }
	  }

	  Enumerator.prototype._enumerate = function _enumerate(input) {
	    for (var i = 0; this._state === PENDING && i < input.length; i++) {
	      this._eachEntry(input[i], i);
	    }
	  };

	  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
	    var c = this._instanceConstructor;
	    var resolve$$1 = c.resolve;


	    if (resolve$$1 === resolve$1) {
	      var _then = getThen(entry);

	      if (_then === then && entry._state !== PENDING) {
	        this._settledAt(entry._state, i, entry._result);
	      } else if (typeof _then !== 'function') {
	        this._remaining--;
	        this._result[i] = entry;
	      } else if (c === Promise$1) {
	        var promise = new c(noop);
	        handleMaybeThenable(promise, entry, _then);
	        this._willSettleAt(promise, i);
	      } else {
	        this._willSettleAt(new c(function (resolve$$1) {
	          return resolve$$1(entry);
	        }), i);
	      }
	    } else {
	      this._willSettleAt(resolve$$1(entry), i);
	    }
	  };

	  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
	    var promise = this.promise;


	    if (promise._state === PENDING) {
	      this._remaining--;

	      if (state === REJECTED) {
	        reject(promise, value);
	      } else {
	        this._result[i] = value;
	      }
	    }

	    if (this._remaining === 0) {
	      fulfill(promise, this._result);
	    }
	  };

	  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
	    var enumerator = this;

	    subscribe(promise, undefined, function (value) {
	      return enumerator._settledAt(FULFILLED, i, value);
	    }, function (reason) {
	      return enumerator._settledAt(REJECTED, i, reason);
	    });
	  };

	  return Enumerator;
	}();

	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}

	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}

	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  reject(promise, reason);
	  return promise;
	}

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class Promise
	  @param {Function} resolver
	  Useful for tooling.
	  @constructor
	*/

	var Promise$1 = function () {
	  function Promise(resolver) {
	    this[PROMISE_ID] = nextId();
	    this._result = this._state = undefined;
	    this._subscribers = [];

	    if (noop !== resolver) {
	      typeof resolver !== 'function' && needsResolver();
	      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	    }
	  }

	  /**
	  The primary way of interacting with a promise is through its `then` method,
	  which registers callbacks to receive either a promise's eventual value or the
	  reason why the promise cannot be fulfilled.
	   ```js
	  findUser().then(function(user){
	    // user is available
	  }, function(reason){
	    // user is unavailable, and you are given the reason why
	  });
	  ```
	   Chaining
	  --------
	   The return value of `then` is itself a promise.  This second, 'downstream'
	  promise is resolved with the return value of the first promise's fulfillment
	  or rejection handler, or rejected if the handler throws an exception.
	   ```js
	  findUser().then(function (user) {
	    return user.name;
	  }, function (reason) {
	    return 'default name';
	  }).then(function (userName) {
	    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	    // will be `'default name'`
	  });
	   findUser().then(function (user) {
	    throw new Error('Found user, but still unhappy');
	  }, function (reason) {
	    throw new Error('`findUser` rejected and we're unhappy');
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	  });
	  ```
	  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	   ```js
	  findUser().then(function (user) {
	    throw new PedagogicalException('Upstream error');
	  }).then(function (value) {
	    // never reached
	  }).then(function (value) {
	    // never reached
	  }, function (reason) {
	    // The `PedgagocialException` is propagated all the way down to here
	  });
	  ```
	   Assimilation
	  ------------
	   Sometimes the value you want to propagate to a downstream promise can only be
	  retrieved asynchronously. This can be achieved by returning a promise in the
	  fulfillment or rejection handler. The downstream promise will then be pending
	  until the returned promise is settled. This is called *assimilation*.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // The user's comments are now available
	  });
	  ```
	   If the assimliated promise rejects, then the downstream promise will also reject.
	   ```js
	  findUser().then(function (user) {
	    return findCommentsByAuthor(user);
	  }).then(function (comments) {
	    // If `findCommentsByAuthor` fulfills, we'll have the value here
	  }, function (reason) {
	    // If `findCommentsByAuthor` rejects, we'll have the reason here
	  });
	  ```
	   Simple Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let result;
	   try {
	    result = findResult();
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	  findResult(function(result, err){
	    if (err) {
	      // failure
	    } else {
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findResult().then(function(result){
	    // success
	  }, function(reason){
	    // failure
	  });
	  ```
	   Advanced Example
	  --------------
	   Synchronous Example
	   ```javascript
	  let author, books;
	   try {
	    author = findAuthor();
	    books  = findBooksByAuthor(author);
	    // success
	  } catch(reason) {
	    // failure
	  }
	  ```
	   Errback Example
	   ```js
	   function foundBooks(books) {
	   }
	   function failure(reason) {
	   }
	   findAuthor(function(author, err){
	    if (err) {
	      failure(err);
	      // failure
	    } else {
	      try {
	        findBoooksByAuthor(author, function(books, err) {
	          if (err) {
	            failure(err);
	          } else {
	            try {
	              foundBooks(books);
	            } catch(reason) {
	              failure(reason);
	            }
	          }
	        });
	      } catch(error) {
	        failure(err);
	      }
	      // success
	    }
	  });
	  ```
	   Promise Example;
	   ```javascript
	  findAuthor().
	    then(findBooksByAuthor).
	    then(function(books){
	      // found books
	  }).catch(function(reason){
	    // something went wrong
	  });
	  ```
	   @method then
	  @param {Function} onFulfilled
	  @param {Function} onRejected
	  Useful for tooling.
	  @return {Promise}
	  */

	  /**
	  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	  as the catch block of a try/catch statement.
	  ```js
	  function findAuthor(){
	  throw new Error('couldn't find that author');
	  }
	  // synchronous
	  try {
	  findAuthor();
	  } catch(reason) {
	  // something went wrong
	  }
	  // async with promises
	  findAuthor().catch(function(reason){
	  // something went wrong
	  });
	  ```
	  @method catch
	  @param {Function} onRejection
	  Useful for tooling.
	  @return {Promise}
	  */


	  Promise.prototype.catch = function _catch(onRejection) {
	    return this.then(null, onRejection);
	  };

	  /**
	    `finally` will be invoked regardless of the promise's fate just as native
	    try/catch/finally behaves
	  
	    Synchronous example:
	  
	    ```js
	    findAuthor() {
	      if (Math.random() > 0.5) {
	        throw new Error();
	      }
	      return new Author();
	    }
	  
	    try {
	      return findAuthor(); // succeed or fail
	    } catch(error) {
	      return findOtherAuther();
	    } finally {
	      // always runs
	      // doesn't affect the return value
	    }
	    ```
	  
	    Asynchronous example:
	  
	    ```js
	    findAuthor().catch(function(reason){
	      return findOtherAuther();
	    }).finally(function(){
	      // author was either found, or not
	    });
	    ```
	  
	    @method finally
	    @param {Function} callback
	    @return {Promise}
	  */


	  Promise.prototype.finally = function _finally(callback) {
	    var promise = this;
	    var constructor = promise.constructor;

	    if (isFunction(callback)) {
	      return promise.then(function (value) {
	        return constructor.resolve(callback()).then(function () {
	          return value;
	        });
	      }, function (reason) {
	        return constructor.resolve(callback()).then(function () {
	          throw reason;
	        });
	      });
	    }

	    return promise.then(callback, callback);
	  };

	  return Promise;
	}();

	Promise$1.prototype.then = then;
	Promise$1.all = all;
	Promise$1.race = race;
	Promise$1.resolve = resolve$1;
	Promise$1.reject = reject$1;
	Promise$1._setScheduler = setScheduler;
	Promise$1._setAsap = setAsap;
	Promise$1._asap = asap;

	/*global self*/
	function polyfill() {
	  var local = void 0;

	  if (typeof commonjsGlobal !== 'undefined') {
	    local = commonjsGlobal;
	  } else if (typeof self !== 'undefined') {
	    local = self;
	  } else {
	    try {
	      local = Function('return this')();
	    } catch (e) {
	      throw new Error('polyfill failed because global object is unavailable in this environment');
	    }
	  }

	  var P = local.Promise;

	  if (P) {
	    var promiseToString = null;
	    try {
	      promiseToString = Object.prototype.toString.call(P.resolve());
	    } catch (e) {
	      // silently ignored
	    }

	    if (promiseToString === '[object Promise]' && !P.cast) {
	      return;
	    }
	  }

	  local.Promise = Promise$1;
	}

	// Strange compat..
	Promise$1.polyfill = polyfill;
	Promise$1.Promise = Promise$1;

	return Promise$1;

	})));




	});

	var auto = es6Promise.polyfill();

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	(function () {
	  // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called

	  var workingDefaultPrevented = function () {
	    var e = document.createEvent('Event');
	    e.initEvent('foo', true, true);
	    e.preventDefault();
	    return e.defaultPrevented;
	  }();

	  if (!workingDefaultPrevented) {
	    var origPreventDefault = Event.prototype.preventDefault;

	    Event.prototype.preventDefault = function () {
	      if (!this.cancelable) {
	        return;
	      }

	      origPreventDefault.call(this);
	      Object.defineProperty(this, 'defaultPrevented', {
	        get: function get() {
	          return true;
	        },
	        configurable: true
	      });
	    };
	  }

	  var isIE = /Trident/.test(navigator.userAgent); // Event constructor shim

	  if (!window.Event || isIE && typeof window.Event !== 'function') {
	    var origEvent = window.Event;
	    /**
	     * @param {!string} inType
	     * @param {?(EventInit)=} params
	     */

	    window.Event = function (inType, params) {
	      params = params || {};
	      var e = document.createEvent('Event');
	      e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
	      return e;
	    };

	    if (origEvent) {
	      for (var i in origEvent) {
	        window.Event[i] = origEvent[i];
	      }

	      window.Event.prototype = origEvent.prototype;
	    }
	  } // CustomEvent constructor shim


	  if (!window.CustomEvent || isIE && typeof window.CustomEvent !== 'function') {
	    /**
	     * @template T
	     * @param {!string} inType
	     * @param {?(CustomEventInit<T>)=} params
	     */
	    window.CustomEvent = function (inType, params) {
	      params = params || {};
	      var e =
	      /** @type {!CustomEvent} */
	      document.createEvent('CustomEvent');
	      e.initCustomEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
	      return e;
	    };

	    window.CustomEvent.prototype = window.Event.prototype;
	  }

	  if (!window.MouseEvent || isIE && typeof window.MouseEvent !== 'function') {
	    var origMouseEvent = window.MouseEvent;
	    /**
	     *
	     * @param {!string} inType
	     * @param {?(MouseEventInit)=} params
	     */

	    window.MouseEvent = function (inType, params) {
	      params = params || {};
	      var e = document.createEvent('MouseEvent');
	      e.initMouseEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable), params.view || window, params.detail, params.screenX, params.screenY, params.clientX, params.clientY, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.button, params.relatedTarget);
	      return e;
	    };

	    if (origMouseEvent) {
	      for (var i in origMouseEvent) {
	        window.MouseEvent[i] = origMouseEvent[i];
	      }
	    }

	    window.MouseEvent.prototype = origMouseEvent.prototype;
	  } // ES6 stuff


	  if (!Array.from) {
	    Array.from = function (object) {
	      return [].slice.call(
	      /** @type {IArrayLike} */
	      object);
	    };
	  }

	  if (!Object.assign) {
	    var assign = function assign(target, source) {
	      var n$ = Object.getOwnPropertyNames(source);

	      for (var i = 0, p; i < n$.length; i++) {
	        p = n$[i];
	        target[p] = source[p];
	      }
	    };

	    Object.assign = function (target, sources) {
	      var args = [].slice.call(arguments, 1);

	      for (var i = 0, s; i < args.length; i++) {
	        s = args[i];

	        if (s) {
	          assign(target, s);
	        }
	      }

	      return target;
	    };
	  }
	})();

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	// minimal template polyfill
	(function () {

	  var needsTemplate = typeof HTMLTemplateElement === 'undefined';
	  var brokenDocFragment = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
	  var needsDocFrag = false; // NOTE: Replace DocumentFragment to work around IE11 bug that
	  // causes children of a document fragment modified while
	  // there is a mutation observer to not have a parentNode, or
	  // have a broken parentNode (!?!)

	  if (/Trident/.test(navigator.userAgent)) {
	    (function () {
	      needsDocFrag = true;
	      var origCloneNode = Node.prototype.cloneNode;

	      Node.prototype.cloneNode = function cloneNode(deep) {
	        var newDom = origCloneNode.call(this, deep);

	        if (this instanceof DocumentFragment) {
	          newDom.__proto__ = DocumentFragment.prototype;
	        }

	        return newDom;
	      }; // IE's DocumentFragment querySelector code doesn't work when
	      // called on an element instance


	      DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
	      DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
	      Object.defineProperties(DocumentFragment.prototype, {
	        'nodeType': {
	          get: function get() {
	            return Node.DOCUMENT_FRAGMENT_NODE;
	          },
	          configurable: true
	        },
	        'localName': {
	          get: function get() {
	            return undefined;
	          },
	          configurable: true
	        },
	        'nodeName': {
	          get: function get() {
	            return '#document-fragment';
	          },
	          configurable: true
	        }
	      });
	      var origInsertBefore = Node.prototype.insertBefore;

	      function insertBefore(newNode, refNode) {
	        if (newNode instanceof DocumentFragment) {
	          var child;

	          while (child = newNode.firstChild) {
	            origInsertBefore.call(this, child, refNode);
	          }
	        } else {
	          origInsertBefore.call(this, newNode, refNode);
	        }

	        return newNode;
	      }

	      Node.prototype.insertBefore = insertBefore;
	      var origAppendChild = Node.prototype.appendChild;

	      Node.prototype.appendChild = function appendChild(child) {
	        if (child instanceof DocumentFragment) {
	          insertBefore.call(this, child, null);
	        } else {
	          origAppendChild.call(this, child);
	        }

	        return child;
	      };

	      var origRemoveChild = Node.prototype.removeChild;
	      var origReplaceChild = Node.prototype.replaceChild;

	      Node.prototype.replaceChild = function replaceChild(newChild, oldChild) {
	        if (newChild instanceof DocumentFragment) {
	          insertBefore.call(this, newChild, oldChild);
	          origRemoveChild.call(this, oldChild);
	        } else {
	          origReplaceChild.call(this, newChild, oldChild);
	        }

	        return oldChild;
	      };

	      Document.prototype.createDocumentFragment = function createDocumentFragment() {
	        var frag = this.createElement('df');
	        frag.__proto__ = DocumentFragment.prototype;
	        return frag;
	      };

	      var origImportNode = Document.prototype.importNode;

	      Document.prototype.importNode = function importNode(impNode, deep) {
	        deep = deep || false;
	        var newNode = origImportNode.call(this, impNode, deep);

	        if (impNode instanceof DocumentFragment) {
	          newNode.__proto__ = DocumentFragment.prototype;
	        }

	        return newNode;
	      };
	    })();
	  } // NOTE: we rely on this cloneNode not causing element upgrade.
	  // This means this polyfill must load before the CE polyfill and
	  // this would need to be re-worked if a browser supports native CE
	  // but not <template>.


	  var capturedCloneNode = Node.prototype.cloneNode;
	  var capturedCreateElement = Document.prototype.createElement;
	  var capturedImportNode = Document.prototype.importNode;
	  var capturedRemoveChild = Node.prototype.removeChild;
	  var capturedAppendChild = Node.prototype.appendChild;
	  var capturedReplaceChild = Node.prototype.replaceChild;
	  var capturedParseFromString = DOMParser.prototype.parseFromString;
	  var capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML') || {
	    /**
	     * @this {!HTMLElement}
	     * @return {string}
	     */
	    get: function get() {
	      return this.innerHTML;
	    },

	    /**
	     * @this {!HTMLElement}
	     * @param {string}
	     */
	    set: function set(text) {
	      this.innerHTML = text;
	    }
	  };
	  var capturedChildNodes = Object.getOwnPropertyDescriptor(window.Node.prototype, 'childNodes') || {
	    /**
	     * @this {!Node}
	     * @return {!NodeList}
	     */
	    get: function get() {
	      return this.childNodes;
	    }
	  };
	  var elementQuerySelectorAll = Element.prototype.querySelectorAll;
	  var docQuerySelectorAll = Document.prototype.querySelectorAll;
	  var fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;
	  var scriptSelector = 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';

	  function QSA(node, selector) {
	    // IE 11 throws a SyntaxError with `scriptSelector` if the node has no children due to the `:not([type])` syntax
	    if (!node.childNodes.length) {
	      return [];
	    }

	    switch (node.nodeType) {
	      case Node.DOCUMENT_NODE:
	        return docQuerySelectorAll.call(node, selector);

	      case Node.DOCUMENT_FRAGMENT_NODE:
	        return fragQuerySelectorAll.call(node, selector);

	      default:
	        return elementQuerySelectorAll.call(node, selector);
	    }
	  } // returns true if nested templates cannot be cloned (they cannot be on
	  // some impl's like Safari 8 and Edge)
	  // OR if cloning a document fragment does not result in a document fragment


	  var needsCloning = function () {
	    if (!needsTemplate) {
	      var t = document.createElement('template');
	      var t2 = document.createElement('template');
	      t2.content.appendChild(document.createElement('div'));
	      t.content.appendChild(t2);
	      var clone = t.cloneNode(true);
	      return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0 || brokenDocFragment;
	    }
	  }();

	  var TEMPLATE_TAG = 'template';

	  var PolyfilledHTMLTemplateElement = function PolyfilledHTMLTemplateElement() {};

	  if (needsTemplate) {
	    var contentDoc = document.implementation.createHTMLDocument('template');
	    var canDecorate = true;
	    var templateStyle = document.createElement('style');
	    templateStyle.textContent = TEMPLATE_TAG + '{display:none;}';
	    var head = document.head;
	    head.insertBefore(templateStyle, head.firstElementChild);
	    /**
	      Provides a minimal shim for the <template> element.
	    */

	    PolyfilledHTMLTemplateElement.prototype = Object.create(HTMLElement.prototype); // if elements do not have `innerHTML` on instances, then
	    // templates can be patched by swizzling their prototypes.

	    var canProtoPatch = !document.createElement('div').hasOwnProperty('innerHTML');
	    /**
	      The `decorate` method moves element children to the template's `content`.
	      NOTE: there is no support for dynamically adding elements to templates.
	    */

	    PolyfilledHTMLTemplateElement.decorate = function (template) {
	      // if the template is decorated or not in HTML namespace, return fast
	      if (template.content || template.namespaceURI !== document.documentElement.namespaceURI) {
	        return;
	      }

	      template.content = contentDoc.createDocumentFragment();
	      var child;

	      while (child = template.firstChild) {
	        capturedAppendChild.call(template.content, child);
	      } // NOTE: prefer prototype patching for performance and
	      // because on some browsers (IE11), re-defining `innerHTML`
	      // can result in intermittent errors.


	      if (canProtoPatch) {
	        template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
	      } else {
	        template.cloneNode = function (deep) {
	          return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
	        }; // add innerHTML to template, if possible
	        // Note: this throws on Safari 7


	        if (canDecorate) {
	          try {
	            defineInnerHTML(template);
	            defineOuterHTML(template);
	          } catch (err) {
	            canDecorate = false;
	          }
	        }
	      } // bootstrap recursively


	      PolyfilledHTMLTemplateElement.bootstrap(template.content);
	    }; // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/wrapMap.js


	    var topLevelWrappingMap = {
	      'option': ['select'],
	      'thead': ['table'],
	      'col': ['colgroup', 'table'],
	      'tr': ['tbody', 'table'],
	      'th': ['tr', 'tbody', 'table'],
	      'td': ['tr', 'tbody', 'table']
	    };

	    var getTagName = function getTagName(text) {
	      // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/var/rtagName.js
	      return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
	    };

	    var defineInnerHTML = function defineInnerHTML(obj) {
	      Object.defineProperty(obj, 'innerHTML', {
	        get: function get() {
	          return getInnerHTML(this);
	        },
	        set: function set(text) {
	          // For IE11, wrap the text in the correct (table) context
	          var wrap = topLevelWrappingMap[getTagName(text)];

	          if (wrap) {
	            for (var i = 0; i < wrap.length; i++) {
	              text = '<' + wrap[i] + '>' + text + '</' + wrap[i] + '>';
	            }
	          }

	          contentDoc.body.innerHTML = text;
	          PolyfilledHTMLTemplateElement.bootstrap(contentDoc);

	          while (this.content.firstChild) {
	            capturedRemoveChild.call(this.content, this.content.firstChild);
	          }

	          var body = contentDoc.body; // If we had wrapped, get back to the original node

	          if (wrap) {
	            for (var j = 0; j < wrap.length; j++) {
	              body = body.lastChild;
	            }
	          }

	          while (body.firstChild) {
	            capturedAppendChild.call(this.content, body.firstChild);
	          }
	        },
	        configurable: true
	      });
	    };

	    var defineOuterHTML = function defineOuterHTML(obj) {
	      Object.defineProperty(obj, 'outerHTML', {
	        get: function get() {
	          return '<' + TEMPLATE_TAG + '>' + this.innerHTML + '</' + TEMPLATE_TAG + '>';
	        },
	        set: function set(innerHTML) {
	          if (this.parentNode) {
	            contentDoc.body.innerHTML = innerHTML;
	            var docFrag = this.ownerDocument.createDocumentFragment();

	            while (contentDoc.body.firstChild) {
	              capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
	            }

	            capturedReplaceChild.call(this.parentNode, docFrag, this);
	          } else {
	            throw new Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
	          }
	        },
	        configurable: true
	      });
	    };

	    defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
	    defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);
	    /**
	      The `bootstrap` method is called automatically and "fixes" all
	      <template> elements in the document referenced by the `doc` argument.
	    */

	    PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
	      var templates = QSA(doc, TEMPLATE_TAG);

	      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
	        PolyfilledHTMLTemplateElement.decorate(t);
	      }
	    }; // auto-bootstrapping for main document


	    document.addEventListener('DOMContentLoaded', function () {
	      PolyfilledHTMLTemplateElement.bootstrap(document);
	    }); // Patch document.createElement to ensure newly created templates have content

	    Document.prototype.createElement = function createElement() {
	      var el = capturedCreateElement.apply(this, arguments);

	      if (el.localName === 'template') {
	        PolyfilledHTMLTemplateElement.decorate(el);
	      }

	      return el;
	    };

	    DOMParser.prototype.parseFromString = function () {
	      var el = capturedParseFromString.apply(this, arguments);
	      PolyfilledHTMLTemplateElement.bootstrap(el);
	      return el;
	    };

	    Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
	      get: function get() {
	        return getInnerHTML(this);
	      },
	      set: function set(text) {
	        capturedHTMLElementInnerHTML.set.call(this, text);
	        PolyfilledHTMLTemplateElement.bootstrap(this);
	      },
	      configurable: true,
	      enumerable: true
	    }); // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString

	    var escapeAttrRegExp = /[&\u00A0"]/g;
	    var escapeDataRegExp = /[&\u00A0<>]/g;

	    var escapeReplace = function escapeReplace(c) {
	      switch (c) {
	        case '&':
	          return '&amp;';

	        case '<':
	          return '&lt;';

	        case '>':
	          return '&gt;';

	        case '"':
	          return '&quot;';

	        case "\xA0":
	          return '&nbsp;';
	      }
	    };

	    var escapeAttr = function escapeAttr(s) {
	      return s.replace(escapeAttrRegExp, escapeReplace);
	    };

	    var escapeData = function escapeData(s) {
	      return s.replace(escapeDataRegExp, escapeReplace);
	    };

	    var makeSet = function makeSet(arr) {
	      var set = {};

	      for (var i = 0; i < arr.length; i++) {
	        set[arr[i]] = true;
	      }

	      return set;
	    }; // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


	    var voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
	    var plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);
	    /**
	     * @param {Node} node
	     * @param {Node} parentNode
	     * @param {Function=} callback
	     */

	    var getOuterHTML = function getOuterHTML(node, parentNode, callback) {
	      switch (node.nodeType) {
	        case Node.ELEMENT_NODE:
	          {
	            var tagName = node.localName;
	            var s = '<' + tagName;
	            var attrs = node.attributes;

	            for (var i = 0, attr; attr = attrs[i]; i++) {
	              s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
	            }

	            s += '>';

	            if (voidElements[tagName]) {
	              return s;
	            }

	            return s + getInnerHTML(node, callback) + '</' + tagName + '>';
	          }

	        case Node.TEXT_NODE:
	          {
	            var data =
	            /** @type {Text} */
	            node.data;

	            if (parentNode && plaintextParents[parentNode.localName]) {
	              return data;
	            }

	            return escapeData(data);
	          }

	        case Node.COMMENT_NODE:
	          {
	            return '<!--' +
	            /** @type {Comment} */
	            node.data + '-->';
	          }

	        default:
	          {
	            window.console.error(node);
	            throw new Error('not implemented');
	          }
	      }
	    };
	    /**
	     * @param {Node} node
	     * @param {Function=} callback
	     */


	    var getInnerHTML = function getInnerHTML(node, callback) {
	      if (node.localName === 'template') {
	        node =
	        /** @type {HTMLTemplateElement} */
	        node.content;
	      }

	      var s = '';
	      var c$ = callback ? callback(node) : capturedChildNodes.get.call(node);

	      for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
	        s += getOuterHTML(child, node, callback);
	      }

	      return s;
	    };
	  } // make cloning/importing work!


	  if (needsTemplate || needsCloning) {
	    PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(template, deep) {
	      var clone = capturedCloneNode.call(template, false); // NOTE: decorate doesn't auto-fix children because they are already
	      // decorated so they need special clone fixup.

	      if (this.decorate) {
	        this.decorate(clone);
	      }

	      if (deep) {
	        // NOTE: use native clone node to make sure CE's wrapped
	        // cloneNode does not cause elements to upgrade.
	        capturedAppendChild.call(clone.content, capturedCloneNode.call(template.content, true)); // now ensure nested templates are cloned correctly.

	        fixClonedDom(clone.content, template.content);
	      }

	      return clone;
	    }; // Given a source and cloned subtree, find <template>'s in the cloned
	    // subtree and replace them with cloned <template>'s from source.
	    // We must do this because only the source templates have proper .content.


	    var fixClonedDom = function fixClonedDom(clone, source) {
	      // do nothing if cloned node is not an element
	      if (!source.querySelectorAll) return; // these two lists should be coincident

	      var s$ = QSA(source, TEMPLATE_TAG);

	      if (s$.length === 0) {
	        return;
	      }

	      var t$ = QSA(clone, TEMPLATE_TAG);

	      for (var i = 0, l = t$.length, t, s; i < l; i++) {
	        s = s$[i];
	        t = t$[i];

	        if (PolyfilledHTMLTemplateElement && PolyfilledHTMLTemplateElement.decorate) {
	          PolyfilledHTMLTemplateElement.decorate(s);
	        }

	        capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
	      }
	    }; // make sure scripts inside of a cloned template are executable


	    var fixClonedScripts = function fixClonedScripts(fragment) {
	      var scripts = QSA(fragment, scriptSelector);

	      for (var ns, s, i = 0; i < scripts.length; i++) {
	        s = scripts[i];
	        ns = capturedCreateElement.call(document, 'script');
	        ns.textContent = s.textContent;
	        var attrs = s.attributes;

	        for (var ai = 0, a; ai < attrs.length; ai++) {
	          a = attrs[ai];
	          ns.setAttribute(a.name, a.value);
	        }

	        capturedReplaceChild.call(s.parentNode, ns, s);
	      }
	    }; // override all cloning to fix the cloned subtree to contain properly
	    // cloned templates.


	    var cloneNode = Node.prototype.cloneNode = function cloneNode(deep) {
	      var dom; // workaround for Edge bug cloning documentFragments
	      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/

	      if (!needsDocFrag && brokenDocFragment && this instanceof DocumentFragment) {
	        if (!deep) {
	          return this.ownerDocument.createDocumentFragment();
	        } else {
	          dom = importNode.call(this.ownerDocument, this, true);
	        }
	      } else if (this.nodeType === Node.ELEMENT_NODE && this.localName === TEMPLATE_TAG && this.namespaceURI == document.documentElement.namespaceURI) {
	        dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
	      } else {
	        dom = capturedCloneNode.call(this, deep);
	      } // template.content is cloned iff `deep`.


	      if (deep) {
	        fixClonedDom(dom, this);
	      }

	      return dom;
	    }; // NOTE: we are cloning instead of importing <template>'s.
	    // However, the ownerDocument of the cloned template will be correct!
	    // This is because the native import node creates the right document owned
	    // subtree and `fixClonedDom` inserts cloned templates into this subtree,
	    // thus updating the owner doc.


	    var importNode = Document.prototype.importNode = function importNode(element, deep) {
	      deep = deep || false;

	      if (element.localName === TEMPLATE_TAG) {
	        return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
	      } else {
	        var dom = capturedImportNode.call(this, element, deep);

	        if (deep) {
	          fixClonedDom(dom, element);
	          fixClonedScripts(dom);
	        }

	        return dom;
	      }
	    };
	  }

	  if (needsTemplate) {
	    window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
	  }
	})();

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

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

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var ShadyData =
	/*#__PURE__*/
	function () {
	  function ShadyData() {
	    classCallCheck(this, ShadyData);
	  }

	  createClass(ShadyData, [{
	    key: "toJSON",

	    /** @override */
	    value: function toJSON() {
	      return {};
	    }
	  }]);

	  return ShadyData;
	}();
	function ensureShadyDataForNode(node) {
	  if (!node.__shady) {
	    node.__shady = new ShadyData();
	  }

	  return node.__shady;
	}
	function shadyDataForNode(node) {
	  return node && node.__shady;
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/** @type {!Object} */

	var settings = window['ShadyDOM'] || {};
	settings.hasNativeShadowDOM = Boolean(Element.prototype.attachShadow && Node.prototype.getRootNode);
	var desc = Object.getOwnPropertyDescriptor(Node.prototype, 'firstChild');
	settings.hasDescriptors = Boolean(desc && desc.configurable && desc.get);
	settings.inUse = settings['force'] || !settings.hasNativeShadowDOM;
	settings.noPatch = settings['noPatch'] || false;
	settings.preferPerformance = settings['preferPerformance'];
	var IS_IE = navigator.userAgent.match('Trident');
	settings.IS_IE = IS_IE;
	var canUpgrade = function canUpgrade() {
	  return !settings.IS_IE;
	};
	var isTrackingLogicalChildNodes = function isTrackingLogicalChildNodes(node) {
	  var nodeData = shadyDataForNode(node);
	  return nodeData && nodeData.firstChild !== undefined;
	};
	var isShadyRoot = function isShadyRoot(obj) {
	  return Boolean(obj._localName === 'ShadyRoot');
	};
	var hasShadowRootWithSlot = function hasShadowRootWithSlot(node) {
	  var nodeData = shadyDataForNode(node);
	  var root = nodeData && nodeData.root;
	  return root && root._hasInsertionPoint();
	};
	var p = Element.prototype;
	var matches = p.matches || p.matchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector || p.webkitMatchesSelector;
	var matchesSelector = function matchesSelector(element, selector) {
	  return matches.call(element, selector);
	};
	// for consistency x-platform.

	var twiddle = document.createTextNode('');
	var content = 0;
	var queue = [];
	new MutationObserver(function () {
	  while (queue.length) {
	    // catch errors in user code...
	    try {
	      queue.shift()();
	    } catch (e) {
	      // enqueue another record and throw
	      twiddle.textContent = content++;
	      throw e;
	    }
	  }
	}).observe(twiddle, {
	  characterData: true
	}); // use MutationObserver to get microtask async timing.

	var microtask = function microtask(callback) {
	  queue.push(callback);
	  twiddle.textContent = content++;
	};
	var hasDocumentContains = Boolean(document.contains);
	var contains = function contains(container, node) {
	  while (node) {
	    if (node == container) {
	      return true;
	    }

	    node = node[SHADY_PREFIX + 'parentNode'];
	  }

	  return false;
	};

	var getNodeHTMLCollectionName = function getNodeHTMLCollectionName(node) {
	  return node.getAttribute('id') || node.getAttribute('name');
	};

	var isValidHTMLCollectionName = function isValidHTMLCollectionName(name) {
	  return name !== 'length' && isNaN(name);
	};

	var createPolyfilledHTMLCollection = function createPolyfilledHTMLCollection(nodes) {
	  // Note: loop in reverse so that the first named item matches the named property
	  for (var l = nodes.length - 1; l >= 0; l--) {
	    var node = nodes[l];
	    var name = getNodeHTMLCollectionName(node);

	    if (name && isValidHTMLCollectionName(name)) {
	      nodes[name] = node;
	    }
	  }

	  nodes.item = function (index) {
	    return nodes[index];
	  };

	  nodes.namedItem = function (name) {
	    if (isValidHTMLCollectionName(name) && nodes[name]) {
	      return nodes[name];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _node = _step.value;
	        var nodeName = getNodeHTMLCollectionName(_node);

	        if (nodeName == name) {
	          return _node;
	        }
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

	    return null;
	  };

	  return nodes;
	};
	var NATIVE_PREFIX = '__shady_native_';
	var SHADY_PREFIX = '__shady_';
	var nativeChildNodesArray = function nativeChildNodesArray(parent) {
	  var result = [];

	  for (var n = parent[NATIVE_PREFIX + 'firstChild']; n; n = n[NATIVE_PREFIX + 'nextSibling']) {
	    result.push(n);
	  }

	  return result;
	};
	var childNodesArray = function childNodesArray(parent) {
	  var result = [];

	  for (var n = parent[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	    result.push(n);
	  }

	  return result;
	};
	/**
	 * Patch a group of accessors on an object only if it exists or if the `force`
	 * argument is true.
	 * @param {!Object} proto
	 * @param {!Object} descriptors
	 * @param {string=} prefix
	 * @param {Array=} disallowedPatches
	 */

	var patchProperties = function patchProperties(proto, descriptors) {
	  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var disallowedPatches = arguments.length > 3 ? arguments[3] : undefined;

	  for (var _p in descriptors) {
	    var newDescriptor = descriptors[_p];

	    if (disallowedPatches && disallowedPatches.indexOf(_p) >= 0) {
	      continue;
	    }

	    newDescriptor.configurable = true;
	    var name = prefix + _p; // NOTE: we prefer writing directly because some browsers
	    // have descriptors that are writable but not configurable (e.g.
	    // `appendChild` on older browsers)

	    if (newDescriptor.value) {
	      proto[name] = newDescriptor.value;
	    } else {
	      // NOTE: this can throw if 'force' is used so catch the error.
	      try {
	        Object.defineProperty(proto, name, newDescriptor);
	      } catch (e) {// this error is harmless so we just trap it.
	      }
	    }
	  }
	};
	/** @type {!function(new:HTMLElement)} */

	var NativeHTMLElement = window['customElements'] && window['customElements']['nativeHTMLElement'] || HTMLElement; // note, this is not a perfect polyfill since it doesn't include symbols

	/** @return {!Object<!ObjectPropertyDescriptor>} */

	var getOwnPropertyDescriptors = function getOwnPropertyDescriptors(obj) {
	  var descriptors = {};
	  Object.getOwnPropertyNames(obj).forEach(function (name) {
	    descriptors[name] = Object.getOwnPropertyDescriptor(obj, name);
	  });
	  return descriptors;
	};

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	var flushList = [];
	var scheduled;
	function enqueue(callback) {
	  if (!scheduled) {
	    scheduled = true;
	    microtask(flush);
	  }

	  flushList.push(callback);
	}
	function flush() {
	  scheduled = false;
	  var didFlush = Boolean(flushList.length);

	  while (flushList.length) {
	    flushList.shift()();
	  }

	  return didFlush;
	}
	flush['list'] = flushList;

	var AsyncObserver =
	/*#__PURE__*/
	function () {
	  function AsyncObserver() {
	    classCallCheck(this, AsyncObserver);

	    this._scheduled = false;
	    this.addedNodes = [];
	    this.removedNodes = [];
	    this.callbacks = new Set();
	  }

	  createClass(AsyncObserver, [{
	    key: "schedule",
	    value: function schedule() {
	      var _this = this;

	      if (!this._scheduled) {
	        this._scheduled = true;
	        microtask(function () {
	          _this.flush();
	        });
	      }
	    }
	  }, {
	    key: "flush",
	    value: function flush() {
	      if (this._scheduled) {
	        this._scheduled = false;
	        var mutations = this.takeRecords();

	        if (mutations.length) {
	          this.callbacks.forEach(function (cb) {
	            cb(mutations);
	          });
	        }
	      }
	    }
	  }, {
	    key: "takeRecords",
	    value: function takeRecords() {
	      if (this.addedNodes.length || this.removedNodes.length) {
	        var mutations = [{
	          addedNodes: this.addedNodes,
	          removedNodes: this.removedNodes
	        }];
	        this.addedNodes = [];
	        this.removedNodes = [];
	        return mutations;
	      }

	      return [];
	    }
	  }]);

	  return AsyncObserver;
	}(); // TODO(sorvell): consider instead polyfilling MutationObserver
	// directly so that users do not have to fork their code.
	// Supporting the entire api may be challenging: e.g. filtering out
	// removed nodes in the wrong scope and seeing non-distributing
	// subtree child mutations.


	var observeChildren = function observeChildren(node, callback) {
	  var sd = ensureShadyDataForNode(node);

	  if (!sd.observer) {
	    sd.observer = new AsyncObserver();
	  }

	  sd.observer.callbacks.add(callback);
	  var observer = sd.observer;
	  return {
	    _callback: callback,
	    _observer: observer,
	    _node: node,
	    takeRecords: function takeRecords() {
	      return observer.takeRecords();
	    }
	  };
	};
	var unobserveChildren = function unobserveChildren(handle) {
	  var observer = handle && handle._observer;

	  if (observer) {
	    observer.callbacks.delete(handle._callback);

	    if (!observer.callbacks.size) {
	      ensureShadyDataForNode(handle._node).observer = null;
	    }
	  }
	};
	function filterMutations(mutations, target) {
	  /** @const {Node} */
	  var targetRootNode = target.getRootNode();
	  return mutations.map(function (mutation) {
	    /** @const {boolean} */
	    var mutationInScope = targetRootNode === mutation.target.getRootNode();

	    if (mutationInScope && mutation.addedNodes) {
	      var nodes = Array.from(mutation.addedNodes).filter(function (n) {
	        return targetRootNode === n.getRootNode();
	      });

	      if (nodes.length) {
	        mutation = Object.create(mutation);
	        Object.defineProperty(mutation, 'addedNodes', {
	          value: nodes,
	          configurable: true
	        });
	        return mutation;
	      }
	    } else if (mutationInScope) {
	      return mutation;
	    }
	  }).filter(function (m) {
	    return m;
	  });
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	// Cribbed from ShadowDOM polyfill
	// https://github.com/webcomponents/webcomponentsjs/blob/master/src/ShadowDOM/wrappers/HTMLElement.js#L28
	/////////////////////////////////////////////////////////////////////////////
	// innerHTML and outerHTML
	// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
	var escapeAttrRegExp = /[&\u00A0"]/g;
	var escapeDataRegExp = /[&\u00A0<>]/g;

	function escapeReplace(c) {
	  switch (c) {
	    case '&':
	      return '&amp;';

	    case '<':
	      return '&lt;';

	    case '>':
	      return '&gt;';

	    case '"':
	      return '&quot;';

	    case "\xA0":
	      return '&nbsp;';
	  }
	}

	function escapeAttr(s) {
	  return s.replace(escapeAttrRegExp, escapeReplace);
	}

	function escapeData(s) {
	  return s.replace(escapeDataRegExp, escapeReplace);
	}

	function makeSet(arr) {
	  var set = {};

	  for (var i = 0; i < arr.length; i++) {
	    set[arr[i]] = true;
	  }

	  return set;
	} // http://www.whatwg.org/specs/web-apps/current-work/#void-elements


	var voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
	var plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);
	/**
	 * @param {Node} node
	 * @param {Node} parentNode
	 * @param {Function=} callback
	 */

	function getOuterHTML(node, parentNode, callback) {
	  switch (node.nodeType) {
	    case Node.ELEMENT_NODE:
	      {
	        var tagName = node.localName;
	        var s = '<' + tagName;
	        var attrs = node.attributes;

	        for (var i = 0, attr; attr = attrs[i]; i++) {
	          s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
	        }

	        s += '>';

	        if (voidElements[tagName]) {
	          return s;
	        }

	        return s + getInnerHTML(node, callback) + '</' + tagName + '>';
	      }

	    case Node.TEXT_NODE:
	      {
	        var data =
	        /** @type {Text} */
	        node.data;

	        if (parentNode && plaintextParents[parentNode.localName]) {
	          return data;
	        }

	        return escapeData(data);
	      }

	    case Node.COMMENT_NODE:
	      {
	        return '<!--' +
	        /** @type {Comment} */
	        node.data + '-->';
	      }

	    default:
	      {
	        window.console.error(node);
	        throw new Error('not implemented');
	      }
	  }
	}
	/**
	 * @param {Node} node
	 * @param {Function=} callback
	 */

	function getInnerHTML(node, callback) {
	  if (node.localName === 'template') {
	    node =
	    /** @type {HTMLTemplateElement} */
	    node.content;
	  }

	  var s = '';
	  var c$ = callback ? callback(node) : node.childNodes;

	  for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
	    s += getOuterHTML(child, node, callback);
	  }

	  return s;
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var hasDescriptors = settings.hasDescriptors;
	var NATIVE_PREFIX$1 = NATIVE_PREFIX; // Object on which raw native methods are stored.
	// e.g. `nativeMethods.querySelector.call(node, selector)`
	// same as `node.querySelector(selector)`

	var nativeMethods = {
	  /** @this {Element} */
	  querySelector: function querySelector(selector) {
	    return this[NATIVE_PREFIX$1 + 'querySelector'](selector);
	  },

	  /** @this {Element} */
	  querySelectorAll: function querySelectorAll(selector) {
	    return this[NATIVE_PREFIX$1 + 'querySelectorAll'](selector);
	  }
	}; // Object on which raw native accessors are available via `accessorName(node)`.
	// e.g. `nativeTree.firstChild(node)`
	// same as `node.firstChild`

	var nativeTree = {};

	var installNativeAccessor = function installNativeAccessor(name) {
	  nativeTree[name] = function (node) {
	    return node[NATIVE_PREFIX$1 + name];
	  };
	};

	var installNativeMethod = function installNativeMethod(name, fn) {
	  if (!nativeMethods[name]) {
	    nativeMethods[name] = fn;
	  }
	};

	var defineNativeAccessors = function defineNativeAccessors(proto, descriptors) {
	  patchProperties(proto, descriptors, NATIVE_PREFIX$1); // make native accessors available to users

	  for (var prop in descriptors) {
	    installNativeAccessor(prop);
	  }
	};

	var copyProperties = function copyProperties(proto) {
	  var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	  for (var i = 0; i < list.length; i++) {
	    var name = list[i];
	    var descriptor = Object.getOwnPropertyDescriptor(proto, name);

	    if (descriptor) {
	      Object.defineProperty(proto, NATIVE_PREFIX$1 + name, descriptor); // make native methods/accessors available to users

	      if (descriptor.value) {
	        installNativeMethod(name, descriptor.value);
	      } else {
	        installNativeAccessor(name);
	      }
	    }
	  }
	};
	/** @type {!TreeWalker} */


	var nodeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ALL, null, false);
	/** @type {!TreeWalker} */

	var elementWalker = document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT, null, false);
	/** @type {!Document} */

	var inertDoc = document.implementation.createHTMLDocument('inert');

	var clearNode = function clearNode(node) {
	  var firstChild;

	  while (firstChild = node[NATIVE_PREFIX$1 + 'firstChild']) {
	    node[NATIVE_PREFIX$1 + 'removeChild'](firstChild);
	  }
	};

	var ParentNodeAccessors = ['firstElementChild', 'lastElementChild', 'children', 'childElementCount'];
	var ParentNodeMethods = ['querySelector', 'querySelectorAll' // 'append', 'prepend'
	];
	var addNativePrefixedProperties = function addNativePrefixedProperties() {
	  // EventTarget
	  var eventProps = ['dispatchEvent', 'addEventListener', 'removeEventListener'];

	  if (window.EventTarget) {
	    copyProperties(window.EventTarget.prototype, eventProps);
	  } else {
	    copyProperties(Node.prototype, eventProps);
	    copyProperties(Window.prototype, eventProps);
	  } // Node


	  if (hasDescriptors) {
	    copyProperties(Node.prototype, ['parentNode', 'firstChild', 'lastChild', 'previousSibling', 'nextSibling', 'childNodes', 'parentElement', 'textContent']);
	  } else {
	    defineNativeAccessors(Node.prototype, {
	      parentNode: {
	        /** @this {Node} */
	        get: function get() {
	          nodeWalker.currentNode = this;
	          return nodeWalker.parentNode();
	        }
	      },
	      firstChild: {
	        /** @this {Node} */
	        get: function get() {
	          nodeWalker.currentNode = this;
	          return nodeWalker.firstChild();
	        }
	      },
	      lastChild: {
	        /** @this {Node} */
	        get: function get() {
	          nodeWalker.currentNode = this;
	          return nodeWalker.lastChild();
	        }
	      },
	      previousSibling: {
	        /** @this {Node} */
	        get: function get() {
	          nodeWalker.currentNode = this;
	          return nodeWalker.previousSibling();
	        }
	      },
	      nextSibling: {
	        /** @this {Node} */
	        get: function get() {
	          nodeWalker.currentNode = this;
	          return nodeWalker.nextSibling();
	        }
	      },
	      // TODO(sorvell): make this a NodeList or whatever
	      childNodes: {
	        /** @this {Node} */
	        get: function get() {
	          var nodes = [];
	          nodeWalker.currentNode = this;
	          var n = nodeWalker.firstChild();

	          while (n) {
	            nodes.push(n);
	            n = nodeWalker.nextSibling();
	          }

	          return nodes;
	        }
	      },
	      parentElement: {
	        /** @this {Node} */
	        get: function get() {
	          elementWalker.currentNode = this;
	          return elementWalker.parentNode();
	        }
	      },
	      textContent: {
	        /** @this {Node} */
	        get: function get() {
	          /* eslint-disable no-case-declarations */
	          switch (this.nodeType) {
	            case Node.ELEMENT_NODE:
	            case Node.DOCUMENT_FRAGMENT_NODE:
	              // TODO(sorvell): This cannot be a single TreeWalker that's reused
	              // at least for Safari 9, but it's unclear why.
	              var textWalker = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, false);
	              var content = '',
	                  n;

	              while (n = textWalker.nextNode()) {
	                // TODO(sorvell): can't use textContent since we patch it on Node.prototype!
	                // However, should probably patch it only on element.
	                content += n.nodeValue;
	              }

	              return content;

	            default:
	              return this.nodeValue;
	          }
	        },
	        // Needed on browsers that do not proper accessors (e.g. old versions of Chrome)

	        /** @this {Node} */
	        set: function set(value) {
	          if (typeof value === 'undefined' || value === null) {
	            value = '';
	          }

	          switch (this.nodeType) {
	            case Node.ELEMENT_NODE:
	            case Node.DOCUMENT_FRAGMENT_NODE:
	              clearNode(this); // Document fragments must have no childnodes if setting a blank string

	              if (value.length > 0 || this.nodeType === Node.ELEMENT_NODE) {
	                // Note: old Chrome versions require 2nd argument here
	                this[NATIVE_PREFIX$1 + 'insertBefore'](document.createTextNode(value), undefined);
	              }

	              break;

	            default:
	              // TODO(sorvell): can't do this if patch nodeValue.
	              this.nodeValue = value;
	              break;
	          }
	        }
	      }
	    });
	  }

	  copyProperties(Node.prototype, ['appendChild', 'insertBefore', 'removeChild', 'replaceChild', 'cloneNode', 'contains']); // NOTE, on some browsers IE 11 / Edge 15 some properties are incorrectly on HTMLElement

	  copyProperties(HTMLElement.prototype, ['parentElement', 'contains']);
	  var ParentNodeWalkerDescriptors = {
	    firstElementChild: {
	      /** @this {ParentNode} */
	      get: function get() {
	        elementWalker.currentNode = this;
	        return elementWalker.firstChild();
	      }
	    },
	    lastElementChild: {
	      /** @this {ParentNode} */
	      get: function get() {
	        elementWalker.currentNode = this;
	        return elementWalker.lastChild();
	      }
	    },
	    children: {
	      /** @this {ParentNode} */
	      get: function get() {
	        var nodes = [];
	        elementWalker.currentNode = this;
	        var n = elementWalker.firstChild();

	        while (n) {
	          nodes.push(n);
	          n = elementWalker.nextSibling();
	        }

	        return createPolyfilledHTMLCollection(nodes);
	      }
	    },
	    childElementCount: {
	      /** @this {ParentNode} */
	      get: function get() {
	        if (this.children) {
	          return this.children.length;
	        }

	        return 0;
	      }
	    }
	  }; // Element

	  if (hasDescriptors) {
	    copyProperties(Element.prototype, ParentNodeAccessors);
	    copyProperties(Element.prototype, ['previousElementSibling', 'nextElementSibling', 'innerHTML', 'className']); // NOTE, on some browsers IE 11 / Edge 15 some properties are incorrectly on HTMLElement

	    copyProperties(HTMLElement.prototype, ['children', 'innerHTML', 'className']);
	  } else {
	    defineNativeAccessors(Element.prototype, ParentNodeWalkerDescriptors);
	    defineNativeAccessors(Element.prototype, {
	      previousElementSibling: {
	        /** @this {Element} */
	        get: function get() {
	          elementWalker.currentNode = this;
	          return elementWalker.previousSibling();
	        }
	      },
	      nextElementSibling: {
	        /** @this {Element} */
	        get: function get() {
	          elementWalker.currentNode = this;
	          return elementWalker.nextSibling();
	        }
	      },
	      innerHTML: {
	        /** @this {Element} */
	        get: function get() {
	          return getInnerHTML(this, nativeChildNodesArray);
	        },
	        // Needed on browsers that do not proper accessors (e.g. old versions of Chrome)

	        /** @this {Element} */
	        set: function set(value) {
	          var content = this.localName === 'template' ?
	          /** @type {HTMLTemplateElement} */
	          this.content : this;
	          clearNode(content);
	          var containerName = this.localName || 'div';
	          var htmlContainer;

	          if (!this.namespaceURI || this.namespaceURI === inertDoc.namespaceURI) {
	            htmlContainer = inertDoc.createElement(containerName);
	          } else {
	            htmlContainer = inertDoc.createElementNS(this.namespaceURI, containerName);
	          }

	          htmlContainer.innerHTML = value;
	          var newContent = this.localName === 'template' ?
	          /** @type {HTMLTemplateElement} */
	          htmlContainer.content : htmlContainer;
	          var firstChild;

	          while (firstChild = newContent[NATIVE_PREFIX$1 + 'firstChild']) {
	            // Note: old Chrome versions require 2nd argument here
	            content[NATIVE_PREFIX$1 + 'insertBefore'](firstChild, undefined);
	          }
	        }
	      },
	      className: {
	        /** @this {Element} */
	        get: function get() {
	          return this.getAttribute('class') || '';
	        },

	        /** @this {Element} */
	        set: function set(value) {
	          this.setAttribute('class', value);
	        }
	      }
	    });
	  }

	  copyProperties(Element.prototype, ['setAttribute', 'getAttribute', 'hasAttribute', 'removeAttribute', // on older Safari, these are on Element.
	  'focus', 'blur']);
	  copyProperties(Element.prototype, ParentNodeMethods); // HTMLElement

	  copyProperties(HTMLElement.prototype, ['focus', 'blur']); // HTMLTemplateElement

	  if (window.HTMLTemplateElement) {
	    copyProperties(window.HTMLTemplateElement.prototype, ['innerHTML']);
	  } // DocumentFragment


	  if (hasDescriptors) {
	    // NOTE, IE 11 does not have on DocumentFragment
	    // firstElementChild
	    // lastElementChild
	    copyProperties(DocumentFragment.prototype, ParentNodeAccessors);
	  } else {
	    defineNativeAccessors(DocumentFragment.prototype, ParentNodeWalkerDescriptors);
	  }

	  copyProperties(DocumentFragment.prototype, ParentNodeMethods); // Document

	  if (hasDescriptors) {
	    copyProperties(Document.prototype, ParentNodeAccessors);
	    copyProperties(Document.prototype, ['activeElement']);
	  } else {
	    defineNativeAccessors(Document.prototype, ParentNodeWalkerDescriptors);
	  }

	  copyProperties(Document.prototype, ['importNode', 'getElementById']);
	  copyProperties(Document.prototype, ParentNodeMethods);
	};

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var InsideDescriptors = getOwnPropertyDescriptors({
	  /** @this {Node} */
	  get childNodes() {
	    return this[SHADY_PREFIX + 'childNodes'];
	  },

	  /** @this {Node} */
	  get firstChild() {
	    return this[SHADY_PREFIX + 'firstChild'];
	  },

	  /** @this {Node} */
	  get lastChild() {
	    return this[SHADY_PREFIX + 'lastChild'];
	  },

	  /** @this {Node} */
	  get childElementCount() {
	    return this[SHADY_PREFIX + 'childElementCount'];
	  },

	  /** @this {Node} */
	  get children() {
	    return this[SHADY_PREFIX + 'children'];
	  },

	  /** @this {Node} */
	  get firstElementChild() {
	    return this[SHADY_PREFIX + 'firstElementChild'];
	  },

	  /** @this {Node} */
	  get lastElementChild() {
	    return this[SHADY_PREFIX + 'lastElementChild'];
	  },

	  /** @this {Node} */
	  get shadowRoot() {
	    return this[SHADY_PREFIX + 'shadowRoot'];
	  }

	});
	var TextContentInnerHTMLDescriptors = getOwnPropertyDescriptors({
	  /** @this {Node} */
	  get textContent() {
	    return this[SHADY_PREFIX + 'textContent'];
	  },

	  /** @this {Node} */
	  set textContent(value) {
	    this[SHADY_PREFIX + 'textContent'] = value;
	  },

	  /** @this {Node} */
	  get innerHTML() {
	    return this[SHADY_PREFIX + 'innerHTML'];
	  },

	  /** @this {Node} */
	  set innerHTML(value) {
	    return this[SHADY_PREFIX + 'innerHTML'] = value;
	  }

	});
	var OutsideDescriptors = getOwnPropertyDescriptors({
	  /** @this {Node} */
	  get parentElement() {
	    return this[SHADY_PREFIX + 'parentElement'];
	  },

	  /** @this {Node} */
	  get parentNode() {
	    return this[SHADY_PREFIX + 'parentNode'];
	  },

	  /** @this {Node} */
	  get nextSibling() {
	    return this[SHADY_PREFIX + 'nextSibling'];
	  },

	  /** @this {Node} */
	  get previousSibling() {
	    return this[SHADY_PREFIX + 'previousSibling'];
	  },

	  /** @this {Node} */
	  get nextElementSibling() {
	    return this[SHADY_PREFIX + 'nextElementSibling'];
	  },

	  /** @this {Node} */
	  get previousElementSibling() {
	    return this[SHADY_PREFIX + 'previousElementSibling'];
	  },

	  /** @this {Node} */
	  get className() {
	    return this[SHADY_PREFIX + 'className'];
	  },

	  /** @this {Node} */
	  set className(value) {
	    return this[SHADY_PREFIX + 'className'] = value;
	  }

	});

	for (var prop in InsideDescriptors) {
	  InsideDescriptors[prop].enumerable = false;
	}

	for (var _prop in TextContentInnerHTMLDescriptors) {
	  TextContentInnerHTMLDescriptors[_prop].enumerable = false;
	}

	for (var _prop2 in OutsideDescriptors) {
	  OutsideDescriptors[_prop2].enumerable = false;
	}

	var noInstancePatching = settings.hasDescriptors || settings.noPatch; // ensure an element has patched "outside" accessors; no-op when not needed

	var patchOutsideElementAccessors = noInstancePatching ? function () {} : function (element) {
	  var sd = ensureShadyDataForNode(element);

	  if (!sd.__outsideAccessors) {
	    sd.__outsideAccessors = true;
	    patchProperties(element, OutsideDescriptors);
	  }
	}; // ensure an element has patched "inside" accessors; no-op when not needed

	var patchInsideElementAccessors = noInstancePatching ? function () {} : function (element) {
	  var sd = ensureShadyDataForNode(element);

	  if (!sd.__insideAccessors) {
	    sd.__insideAccessors = true;
	    patchProperties(element, InsideDescriptors); // NOTE: There are compatibility issues with patches for `textContent`
	    // and `innerHTML` between CE and SD. Since SD patches are applied
	    // via `ShadyDOM.patch` and CE patches are applied as the tree is walked,
	    // SD patches overwrite CE patches.
	    // * When SD is in patching mode, SD calls through to native
	    // methods not patched by CE (since SD is at the bottom) and CE does not
	    // upgrade, connect, or disconnect elements. Therefore do *not patch*
	    // these accessors in this case.
	    // * When SD is in `noPatch` mode, the SD patches call through to
	    // "native" methods that are patched by CE (since CE is at the bottom).
	    // Therefore continue to patch in this case.
	    // If customElements is not loaded, then these accessors should be
	    // patched so they work correctly.

	    if (!window['customElements'] || settings.noPatch) {
	      patchProperties(element, TextContentInnerHTMLDescriptors);
	    }
	  }
	};

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

	/*
	Make this name unique so it is unlikely to conflict with properties on objects passed to `addEventListener`
	https://github.com/webcomponents/shadydom/issues/173
	*/

	var
	/** string */
	eventWrappersName = "__eventWrappers".concat(Date.now());
	/** @type {?function(!Event): boolean} */

	var composedGetter = function () {
	  var composedProp = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');
	  return composedProp ? function (ev) {
	    return composedProp.get.call(ev);
	  } : null;
	}();

	var supportsEventOptions = function () {
	  var supported = false;
	  var eventOptions = {
	    get capture() {
	      supported = true;
	    }

	  };

	  var listener = function listener() {}; // NOTE: These will be unpatched at this point.


	  window.addEventListener('test', listener, eventOptions);
	  window.removeEventListener('test', listener, eventOptions);
	  return supported;
	}();

	var parseEventOptions = function parseEventOptions(optionsOrCapture) {
	  var capture, once, passive, shadyTarget;

	  if (optionsOrCapture && _typeof_1(optionsOrCapture) === 'object') {
	    capture = Boolean(optionsOrCapture.capture);
	    once = Boolean(optionsOrCapture.once);
	    passive = Boolean(optionsOrCapture.passive);
	    shadyTarget = optionsOrCapture.__shadyTarget;
	  } else {
	    capture = Boolean(optionsOrCapture);
	    once = false;
	    passive = false;
	  }

	  return {
	    shadyTarget: shadyTarget,
	    capture: capture,
	    once: once,
	    passive: passive,
	    nativeEventOptions: supportsEventOptions ? optionsOrCapture : capture
	  };
	}; // https://github.com/w3c/webcomponents/issues/513#issuecomment-224183937


	var alwaysComposed = {
	  'blur': true,
	  'focus': true,
	  'focusin': true,
	  'focusout': true,
	  'click': true,
	  'dblclick': true,
	  'mousedown': true,
	  'mouseenter': true,
	  'mouseleave': true,
	  'mousemove': true,
	  'mouseout': true,
	  'mouseover': true,
	  'mouseup': true,
	  'wheel': true,
	  'beforeinput': true,
	  'input': true,
	  'keydown': true,
	  'keyup': true,
	  'compositionstart': true,
	  'compositionupdate': true,
	  'compositionend': true,
	  'touchstart': true,
	  'touchend': true,
	  'touchmove': true,
	  'touchcancel': true,
	  'pointerover': true,
	  'pointerenter': true,
	  'pointerdown': true,
	  'pointermove': true,
	  'pointerup': true,
	  'pointercancel': true,
	  'pointerout': true,
	  'pointerleave': true,
	  'gotpointercapture': true,
	  'lostpointercapture': true,
	  'dragstart': true,
	  'drag': true,
	  'dragenter': true,
	  'dragleave': true,
	  'dragover': true,
	  'drop': true,
	  'dragend': true,
	  'DOMActivate': true,
	  'DOMFocusIn': true,
	  'DOMFocusOut': true,
	  'keypress': true
	};
	var unpatchedEvents = {
	  'DOMAttrModified': true,
	  'DOMAttributeNameChanged': true,
	  'DOMCharacterDataModified': true,
	  'DOMElementNameChanged': true,
	  'DOMNodeInserted': true,
	  'DOMNodeInsertedIntoDocument': true,
	  'DOMNodeRemoved': true,
	  'DOMNodeRemovedFromDocument': true,
	  'DOMSubtreeModified': true
	  /**
	   * Some EventTarget subclasses are not Node subclasses, and you cannot call
	   * `getRootNode()` on them.
	   *
	   * @param {!(Node|EventTarget)} eventTarget
	   * @return {!(Node|EventTarget)}
	   */

	};

	function getRootNodeWithFallback(eventTarget) {
	  if (eventTarget instanceof Node) {
	    return eventTarget[SHADY_PREFIX + 'getRootNode']();
	  } else {
	    return eventTarget;
	  }
	}

	function pathComposer(startNode, composed) {
	  var composedPath = [];
	  var current = startNode;
	  var startRoot = getRootNodeWithFallback(startNode);

	  while (current) {
	    composedPath.push(current);

	    if (current[SHADY_PREFIX + 'assignedSlot']) {
	      current = current[SHADY_PREFIX + 'assignedSlot'];
	    } else if (current.nodeType === Node.DOCUMENT_FRAGMENT_NODE && current.host && (composed || current !== startRoot)) {
	      current = current.host;
	    } else {
	      current = current[SHADY_PREFIX + 'parentNode'];
	    }
	  } // event composedPath includes window when startNode's ownerRoot is document


	  if (composedPath[composedPath.length - 1] === document) {
	    composedPath.push(window);
	  }

	  return composedPath;
	}

	var composedPath = function composedPath(event) {
	  if (!event.__composedPath) {
	    event.__composedPath = pathComposer(event.target, true);
	  }

	  return event.__composedPath;
	};

	function retarget(refNode, path) {
	  if (!isShadyRoot) {
	    return refNode;
	  } // If ANCESTOR's root is not a shadow root or ANCESTOR's root is BASE's
	  // shadow-including inclusive ancestor, return ANCESTOR.


	  var refNodePath = pathComposer(refNode, true);
	  var p$ = path;

	  for (var i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
	    ancestor = p$[i];
	    root = getRootNodeWithFallback(ancestor);

	    if (root !== lastRoot) {
	      rootIdx = refNodePath.indexOf(root);
	      lastRoot = root;
	    }

	    if (!isShadyRoot(root) || rootIdx > -1) {
	      return ancestor;
	    }
	  }
	}

	var EventPatches = {
	  /**
	   * @this {Event}
	   */
	  get composed() {
	    if (this.__composed === undefined) {
	      // if there's an original `composed` getter on the Event prototype, use that
	      if (composedGetter) {
	        // TODO(web-padawan): see https://github.com/webcomponents/shadydom/issues/275
	        this.__composed = this.type === 'focusin' || this.type === 'focusout' || composedGetter(this); // If the event is trusted, or `isTrusted` is not supported, check the list of always composed events
	      } else if (this.isTrusted !== false) {
	        this.__composed = alwaysComposed[this.type];
	      }
	    }

	    return (
	      /** @type {!Event} */
	      this.__composed || false
	    );
	  },

	  /**
	   * @this {Event}
	   */
	  composedPath: function composedPath() {
	    if (!this.__composedPath) {
	      this.__composedPath = pathComposer(this['__target'], this.composed);
	    }

	    return (
	      /** @type {!Event} */
	      this.__composedPath
	    );
	  },

	  /**
	   * @this {Event}
	   */
	  get target() {
	    return retarget(this.currentTarget || this['__previousCurrentTarget'], this.composedPath());
	  },

	  // http://w3c.github.io/webcomponents/spec/shadow/#event-relatedtarget-retargeting

	  /**
	   * @this {Event}
	   */
	  get relatedTarget() {
	    if (!this.__relatedTarget) {
	      return null;
	    }

	    if (!this.__relatedTargetComposedPath) {
	      this.__relatedTargetComposedPath = pathComposer(this.__relatedTarget, true);
	    } // find the deepest node in relatedTarget composed path that is in the same root with the currentTarget


	    return retarget(this.currentTarget || this['__previousCurrentTarget'],
	    /** @type {!Event} */
	    this.__relatedTargetComposedPath);
	  },

	  /**
	   * @this {Event}
	   */
	  stopPropagation: function stopPropagation() {
	    Event.prototype.stopPropagation.call(this);
	    this.__propagationStopped = true;
	  },

	  /**
	   * @this {Event}
	   */
	  stopImmediatePropagation: function stopImmediatePropagation() {
	    Event.prototype.stopImmediatePropagation.call(this);
	    this.__immediatePropagationStopped = true;
	    this.__propagationStopped = true;
	  }
	};

	function mixinComposedFlag(Base) {
	  // NOTE: avoiding use of `class` here so that transpiled output does not
	  // try to do `Base.call` with a dom construtor.
	  var klazz = function klazz(type, options) {
	    var event = new Base(type, options);
	    event.__composed = options && Boolean(options['composed']);
	    return event;
	  }; // put constructor properties on subclass


	  klazz.__proto__ = Base;
	  klazz.prototype = Base.prototype;
	  return klazz;
	}

	var nonBubblingEventsToRetarget = {
	  'focus': true,
	  'blur': true
	};
	/**
	 * Check if the event has been retargeted by comparing original `target`, and calculated `target`
	 * @param {Event} event
	 * @return {boolean} True if the original target and calculated target are the same
	 */

	function hasRetargeted(event) {
	  return event['__target'] !== event.target || event.__relatedTarget !== event.relatedTarget;
	}
	/**
	 *
	 * @param {Event} event
	 * @param {Node} node
	 * @param {string} phase
	 */


	function fireHandlers(event, node, phase) {
	  var hs = node.__handlers && node.__handlers[event.type] && node.__handlers[event.type][phase];

	  if (hs) {
	    for (var i = 0, fn; fn = hs[i]; i++) {
	      if (hasRetargeted(event) && event.target === event.relatedTarget) {
	        return;
	      }

	      fn.call(node, event);

	      if (event.__immediatePropagationStopped) {
	        return;
	      }
	    }
	  }
	}

	function retargetNonBubblingEvent(e) {
	  var path = e.composedPath();
	  var node; // override `currentTarget` to let patched `target` calculate correctly

	  Object.defineProperty(e, 'currentTarget', {
	    get: function get() {
	      return node;
	    },
	    configurable: true
	  });

	  for (var i = path.length - 1; i >= 0; i--) {
	    node = path[i]; // capture phase fires all capture handlers

	    fireHandlers(e, node, 'capture');

	    if (e.__propagationStopped) {
	      return;
	    }
	  } // set the event phase to `AT_TARGET` as in spec


	  Object.defineProperty(e, 'eventPhase', {
	    get: function get() {
	      return Event.AT_TARGET;
	    }
	  }); // the event only needs to be fired when owner roots change when iterating the event path
	  // keep track of the last seen owner root

	  var lastFiredRoot;

	  for (var _i = 0; _i < path.length; _i++) {
	    node = path[_i];
	    var nodeData = shadyDataForNode(node);
	    var root = nodeData && nodeData.root;

	    if (_i === 0 || root && root === lastFiredRoot) {
	      fireHandlers(e, node, 'bubble'); // don't bother with window, it doesn't have `getRootNode` and will be last in the path anyway

	      if (node !== window) {
	        lastFiredRoot = node[SHADY_PREFIX + 'getRootNode']();
	      }

	      if (e.__propagationStopped) {
	        return;
	      }
	    }
	  }
	}

	function listenerSettingsEqual(savedListener, node, type, capture, once, passive) {
	  var savedNode = savedListener.node,
	      savedType = savedListener.type,
	      savedCapture = savedListener.capture,
	      savedOnce = savedListener.once,
	      savedPassive = savedListener.passive;
	  return node === savedNode && type === savedType && capture === savedCapture && once === savedOnce && passive === savedPassive;
	}

	function findListener(wrappers, node, type, capture, once, passive) {
	  for (var i = 0; i < wrappers.length; i++) {
	    if (listenerSettingsEqual(wrappers[i], node, type, capture, once, passive)) {
	      return i;
	    }
	  }

	  return -1;
	}
	/**
	 * Firefox can throw on accessing eventWrappers inside of `removeEventListener` during a selenium run
	 * Try/Catch accessing eventWrappers to work around
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=1353074
	 */

	function getEventWrappers(eventLike) {
	  var wrappers = null;

	  try {
	    wrappers = eventLike[eventWrappersName];
	  } catch (e) {} // eslint-disable-line no-empty


	  return wrappers;
	}

	function targetNeedsPathCheck(node) {
	  return isShadyRoot(node) || node.localName === 'slot';
	}
	/**
	 * @this {EventTarget}
	 */


	function addEventListener(type, fnOrObj, optionsOrCapture) {
	  var _parseEventOptions = parseEventOptions(optionsOrCapture),
	      capture = _parseEventOptions.capture,
	      once = _parseEventOptions.once,
	      passive = _parseEventOptions.passive,
	      shadyTarget = _parseEventOptions.shadyTarget,
	      nativeEventOptions = _parseEventOptions.nativeEventOptions;

	  if (!fnOrObj) {
	    return;
	  }

	  var handlerType = _typeof_1(fnOrObj); // bail if `fnOrObj` is not a function, not an object


	  if (handlerType !== 'function' && handlerType !== 'object') {
	    return;
	  } // bail if `fnOrObj` is an object without a `handleEvent` method


	  if (handlerType === 'object' && (!fnOrObj.handleEvent || typeof fnOrObj.handleEvent !== 'function')) {
	    return;
	  }

	  if (unpatchedEvents[type]) {
	    return this[NATIVE_PREFIX + 'addEventListener'](type, fnOrObj, nativeEventOptions);
	  } // hack to let ShadyRoots have event listeners
	  // event listener will be on host, but `currentTarget`
	  // will be set to shadyroot for event listener


	  var target = shadyTarget || this;
	  var wrappers = fnOrObj[eventWrappersName];

	  if (wrappers) {
	    // The callback `fn` might be used for multiple nodes/events. Since we generate
	    // a wrapper function, we need to keep track of it when we remove the listener.
	    // It's more efficient to store the node/type/options information as Array in
	    // `fn` itself rather than the node (we assume that the same callback is used
	    // for few nodes at most, whereas a node will likely have many event listeners).
	    // NOTE(valdrin) invoking external functions is costly, inline has better perf.
	    // Stop if the wrapper function has already been created.
	    if (findListener(wrappers, target, type, capture, once, passive) > -1) {
	      return;
	    }
	  } else {
	    fnOrObj[eventWrappersName] = [];
	  }
	  /**
	   * @this {HTMLElement}
	   * @param {Event} e
	   */


	  var wrapperFn = function wrapperFn(e) {
	    // Support `once` option.
	    if (once) {
	      this[SHADY_PREFIX + 'removeEventListener'](type, fnOrObj, optionsOrCapture);
	    }

	    if (!e['__target']) {
	      patchEvent(e);
	    }

	    var lastCurrentTargetDesc;

	    if (target !== this) {
	      // replace `currentTarget` to make `target` and `relatedTarget` correct for inside the shadowroot
	      lastCurrentTargetDesc = Object.getOwnPropertyDescriptor(e, 'currentTarget');
	      Object.defineProperty(e, 'currentTarget', {
	        get: function get() {
	          return target;
	        },
	        configurable: true
	      });
	    }

	    e['__previousCurrentTarget'] = e['currentTarget']; // Always check if a shadowRoot or slot is in the current event path.
	    // If it is not, the event was generated on either the host of the shadowRoot
	    // or a children of the host.

	    if (targetNeedsPathCheck(target) && e.composedPath().indexOf(target) == -1) {
	      return;
	    } // There are two critera that should stop events from firing on this node
	    // 1. the event is not composed and the current node is not in the same root as the target
	    // 2. when bubbling, if after retargeting, relatedTarget and target point to the same node


	    if (e.composed || e.composedPath().indexOf(target) > -1) {
	      if (hasRetargeted(e) && e.target === e.relatedTarget) {
	        if (e.eventPhase === Event.BUBBLING_PHASE) {
	          e.stopImmediatePropagation();
	        }

	        return;
	      } // prevent non-bubbling events from triggering bubbling handlers on shadowroot, but only if not in capture phase


	      if (e.eventPhase !== Event.CAPTURING_PHASE && !e.bubbles && e.target !== target && !(target instanceof Window)) {
	        return;
	      }

	      var ret = handlerType === 'function' ? fnOrObj.call(target, e) : fnOrObj.handleEvent && fnOrObj.handleEvent(e);

	      if (target !== this) {
	        // replace the "correct" `currentTarget`
	        if (lastCurrentTargetDesc) {
	          Object.defineProperty(e, 'currentTarget', lastCurrentTargetDesc);
	          lastCurrentTargetDesc = null;
	        } else {
	          delete e['currentTarget'];
	        }
	      }

	      return ret;
	    }
	  }; // Store the wrapper information.


	  fnOrObj[eventWrappersName].push({
	    // note: use target here which is either a shadowRoot
	    // (when the host element is proxy'ing the event) or this element
	    node: target,
	    type: type,
	    capture: capture,
	    once: once,
	    passive: passive,
	    wrapperFn: wrapperFn
	  });

	  if (nonBubblingEventsToRetarget[type]) {
	    this.__handlers = this.__handlers || {};
	    this.__handlers[type] = this.__handlers[type] || {
	      'capture': [],
	      'bubble': []
	    };

	    this.__handlers[type][capture ? 'capture' : 'bubble'].push(wrapperFn);
	  } else {
	    this[NATIVE_PREFIX + 'addEventListener'](type, wrapperFn, nativeEventOptions);
	  }
	}
	/**
	 * @this {EventTarget}
	 */

	function removeEventListener(type, fnOrObj, optionsOrCapture) {
	  if (!fnOrObj) {
	    return;
	  }

	  var _parseEventOptions2 = parseEventOptions(optionsOrCapture),
	      capture = _parseEventOptions2.capture,
	      once = _parseEventOptions2.once,
	      passive = _parseEventOptions2.passive,
	      shadyTarget = _parseEventOptions2.shadyTarget,
	      nativeEventOptions = _parseEventOptions2.nativeEventOptions;

	  if (unpatchedEvents[type]) {
	    return this[NATIVE_PREFIX + 'removeEventListener'](type, fnOrObj, nativeEventOptions);
	  }

	  var target = shadyTarget || this; // Search the wrapped function.

	  var wrapperFn = undefined;
	  var wrappers = getEventWrappers(fnOrObj);

	  if (wrappers) {
	    var idx = findListener(wrappers, target, type, capture, once, passive);

	    if (idx > -1) {
	      wrapperFn = wrappers.splice(idx, 1)[0].wrapperFn; // Cleanup.

	      if (!wrappers.length) {
	        fnOrObj[eventWrappersName] = undefined;
	      }
	    }
	  }

	  this[NATIVE_PREFIX + 'removeEventListener'](type, wrapperFn || fnOrObj, nativeEventOptions);

	  if (wrapperFn && nonBubblingEventsToRetarget[type] && this.__handlers && this.__handlers[type]) {
	    var arr = this.__handlers[type][capture ? 'capture' : 'bubble'];

	    var _idx = arr.indexOf(wrapperFn);

	    if (_idx > -1) {
	      arr.splice(_idx, 1);
	    }
	  }
	}

	function activateFocusEventOverrides() {
	  for (var ev in nonBubblingEventsToRetarget) {
	    window[NATIVE_PREFIX + 'addEventListener'](ev, function (e) {
	      if (!e['__target']) {
	        patchEvent(e);
	        retargetNonBubblingEvent(e);
	      }
	    }, true);
	  }
	}

	var EventPatchesDescriptors = getOwnPropertyDescriptors(EventPatches);
	var SHADY_PROTO = '__shady_patchedProto';
	var SHADY_SOURCE_PROTO = '__shady_sourceProto';

	function patchEvent(event) {
	  event['__target'] = event.target;
	  event.__relatedTarget = event.relatedTarget; // attempt to patch prototype (via cache)

	  if (settings.hasDescriptors) {
	    var proto = Object.getPrototypeOf(event);

	    if (!Object.hasOwnProperty(proto, SHADY_PROTO)) {
	      var patchedProto = Object.create(proto);
	      patchedProto[SHADY_SOURCE_PROTO] = proto;
	      patchProperties(patchedProto, EventPatchesDescriptors);
	      proto[SHADY_PROTO] = patchedProto;
	    }

	    event.__proto__ = proto[SHADY_PROTO]; // and fallback to patching instance
	  } else {
	    patchProperties(event, EventPatchesDescriptors);
	  }
	}

	var PatchedEvent = mixinComposedFlag(Event);
	var PatchedCustomEvent = mixinComposedFlag(CustomEvent);
	var PatchedMouseEvent = mixinComposedFlag(MouseEvent);
	function patchEvents() {
	  activateFocusEventOverrides();
	  window.Event = PatchedEvent;
	  window.CustomEvent = PatchedCustomEvent;
	  window.MouseEvent = PatchedMouseEvent;
	}
	function patchClick() {
	  // Fix up `Element.prototype.click()` if `isTrusted` is supported, but `composed` isn't
	  if (!composedGetter && Object.getOwnPropertyDescriptor(Event.prototype, 'isTrusted')) {
	    /** @this {Element} */
	    var composedClickFn = function composedClickFn() {
	      var ev = new MouseEvent('click', {
	        bubbles: true,
	        cancelable: true,
	        composed: true
	      });
	      this[SHADY_PREFIX + 'dispatchEvent'](ev);
	    };

	    if (Element.prototype.click) {
	      Element.prototype.click = composedClickFn;
	    } else if (HTMLElement.prototype.click) {
	      HTMLElement.prototype.click = composedClickFn;
	    }
	  }
	}
	var eventPropertyNames = Object.getOwnPropertyNames(Document.prototype).filter(function (name) {
	  return name.substring(0, 2) === 'on';
	});

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	function newSplice(index, removed, addedCount) {
	  return {
	    index: index,
	    removed: removed,
	    addedCount: addedCount
	  };
	}

	var EDIT_LEAVE = 0;
	var EDIT_UPDATE = 1;
	var EDIT_ADD = 2;
	var EDIT_DELETE = 3; // Note: This function is *based* on the computation of the Levenshtein
	// "edit" distance. The one change is that "updates" are treated as two
	// edits - not one. With Array splices, an update is really a delete
	// followed by an add. By retaining this, we optimize for "keeping" the
	// maximum array items in the original array. For example:
	//
	//   'xxxx123' -> '123yyyy'
	//
	// With 1-edit updates, the shortest path would be just to update all seven
	// characters. With 2-edit updates, we delete 4, leave 3, and add 4. This
	// leaves the substring '123' intact.

	function calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd) {
	  // "Deletion" columns
	  var rowCount = oldEnd - oldStart + 1;
	  var columnCount = currentEnd - currentStart + 1;
	  var distances = new Array(rowCount); // "Addition" rows. Initialize null column.

	  for (var i = 0; i < rowCount; i++) {
	    distances[i] = new Array(columnCount);
	    distances[i][0] = i;
	  } // Initialize null row


	  for (var j = 0; j < columnCount; j++) {
	    distances[0][j] = j;
	  }

	  for (var _i = 1; _i < rowCount; _i++) {
	    for (var _j = 1; _j < columnCount; _j++) {
	      if (equals(current[currentStart + _j - 1], old[oldStart + _i - 1])) distances[_i][_j] = distances[_i - 1][_j - 1];else {
	        var north = distances[_i - 1][_j] + 1;
	        var west = distances[_i][_j - 1] + 1;
	        distances[_i][_j] = north < west ? north : west;
	      }
	    }
	  }

	  return distances;
	} // This starts at the final weight, and walks "backward" by finding
	// the minimum previous weight recursively until the origin of the weight
	// matrix.


	function spliceOperationsFromEditDistances(distances) {
	  var i = distances.length - 1;
	  var j = distances[0].length - 1;
	  var current = distances[i][j];
	  var edits = [];

	  while (i > 0 || j > 0) {
	    if (i == 0) {
	      edits.push(EDIT_ADD);
	      j--;
	      continue;
	    }

	    if (j == 0) {
	      edits.push(EDIT_DELETE);
	      i--;
	      continue;
	    }

	    var northWest = distances[i - 1][j - 1];
	    var west = distances[i - 1][j];
	    var north = distances[i][j - 1];
	    var min = void 0;
	    if (west < north) min = west < northWest ? west : northWest;else min = north < northWest ? north : northWest;

	    if (min == northWest) {
	      if (northWest == current) {
	        edits.push(EDIT_LEAVE);
	      } else {
	        edits.push(EDIT_UPDATE);
	        current = northWest;
	      }

	      i--;
	      j--;
	    } else if (min == west) {
	      edits.push(EDIT_DELETE);
	      i--;
	      current = west;
	    } else {
	      edits.push(EDIT_ADD);
	      j--;
	      current = north;
	    }
	  }

	  edits.reverse();
	  return edits;
	}
	/**
	 * Splice Projection functions:
	 *
	 * A splice map is a representation of how a previous array of items
	 * was transformed into a new array of items. Conceptually it is a list of
	 * tuples of
	 *
	 *   <index, removed, addedCount>
	 *
	 * which are kept in ascending index order of. The tuple represents that at
	 * the |index|, |removed| sequence of items were removed, and counting forward
	 * from |index|, |addedCount| items were added.
	 */

	/**
	 * Lacking individual splice mutation information, the minimal set of
	 * splices can be synthesized given the previous state and final state of an
	 * array. The basic approach is to calculate the edit distance matrix and
	 * choose the shortest path through it.
	 *
	 * Complexity: O(l * p)
	 *   l: The length of the current array
	 *   p: The length of the old array
	 */


	function calcSplices(current, currentStart, currentEnd, old, oldStart, oldEnd) {
	  var prefixCount = 0;
	  var suffixCount = 0;
	  var splice;
	  var minLength = Math.min(currentEnd - currentStart, oldEnd - oldStart);
	  if (currentStart == 0 && oldStart == 0) prefixCount = sharedPrefix(current, old, minLength);
	  if (currentEnd == current.length && oldEnd == old.length) suffixCount = sharedSuffix(current, old, minLength - prefixCount);
	  currentStart += prefixCount;
	  oldStart += prefixCount;
	  currentEnd -= suffixCount;
	  oldEnd -= suffixCount;
	  if (currentEnd - currentStart == 0 && oldEnd - oldStart == 0) return [];

	  if (currentStart == currentEnd) {
	    splice = newSplice(currentStart, [], 0);

	    while (oldStart < oldEnd) {
	      splice.removed.push(old[oldStart++]);
	    }

	    return [splice];
	  } else if (oldStart == oldEnd) return [newSplice(currentStart, [], currentEnd - currentStart)];

	  var ops = spliceOperationsFromEditDistances(calcEditDistances(current, currentStart, currentEnd, old, oldStart, oldEnd));
	  splice = undefined;
	  var splices = [];
	  var index = currentStart;
	  var oldIndex = oldStart;

	  for (var i = 0; i < ops.length; i++) {
	    switch (ops[i]) {
	      case EDIT_LEAVE:
	        if (splice) {
	          splices.push(splice);
	          splice = undefined;
	        }

	        index++;
	        oldIndex++;
	        break;

	      case EDIT_UPDATE:
	        if (!splice) splice = newSplice(index, [], 0);
	        splice.addedCount++;
	        index++;
	        splice.removed.push(old[oldIndex]);
	        oldIndex++;
	        break;

	      case EDIT_ADD:
	        if (!splice) splice = newSplice(index, [], 0);
	        splice.addedCount++;
	        index++;
	        break;

	      case EDIT_DELETE:
	        if (!splice) splice = newSplice(index, [], 0);
	        splice.removed.push(old[oldIndex]);
	        oldIndex++;
	        break;
	    }
	  }

	  if (splice) {
	    splices.push(splice);
	  }

	  return splices;
	}

	function sharedPrefix(current, old, searchLength) {
	  for (var i = 0; i < searchLength; i++) {
	    if (!equals(current[i], old[i])) return i;
	  }

	  return searchLength;
	}

	function sharedSuffix(current, old, searchLength) {
	  var index1 = current.length;
	  var index2 = old.length;
	  var count = 0;

	  while (count < searchLength && equals(current[--index1], old[--index2])) {
	    count++;
	  }

	  return count;
	}

	function equals(currentValue, previousValue) {
	  return currentValue === previousValue;
	}

	function calculateSplices(current, previous) {
	  return calcSplices(current, 0, current.length, previous, 0, previous.length);
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	function linkNode(node, container, containerData, ref_node) {
	  patchOutsideElementAccessors(node);
	  ref_node = ref_node || null;
	  var nodeData = ensureShadyDataForNode(node);
	  var ref_nodeData = ref_node ? ensureShadyDataForNode(ref_node) : null; // update ref_node.previousSibling <-> node

	  nodeData.previousSibling = ref_node ? ref_nodeData.previousSibling : container[SHADY_PREFIX + 'lastChild'];
	  var psd = shadyDataForNode(nodeData.previousSibling);

	  if (psd) {
	    psd.nextSibling = node;
	  } // update node <-> ref_node


	  var nsd = shadyDataForNode(nodeData.nextSibling = ref_node);

	  if (nsd) {
	    nsd.previousSibling = node;
	  } // update node <-> container


	  nodeData.parentNode = container;

	  if (ref_node) {
	    if (ref_node === containerData.firstChild) {
	      containerData.firstChild = node;
	    }
	  } else {
	    containerData.lastChild = node;

	    if (!containerData.firstChild) {
	      containerData.firstChild = node;
	    }
	  } // remove caching of childNodes


	  containerData.childNodes = null;
	}

	var recordInsertBefore = function recordInsertBefore(node, container, ref_node) {
	  patchInsideElementAccessors(container);
	  var containerData = ensureShadyDataForNode(container);

	  if (containerData.firstChild !== undefined) {
	    containerData.childNodes = null;
	  } // handle document fragments


	  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
	    // Note, documentFragments should not have logical DOM so there's
	    // no need update that. It is possible to append a ShadowRoot, but we're
	    // choosing not to support that.
	    var first = node[NATIVE_PREFIX + 'firstChild'];

	    for (var n = first; n; n = n[NATIVE_PREFIX + 'nextSibling']) {
	      linkNode(n, container, containerData, ref_node);
	    }
	  } else {
	    linkNode(node, container, containerData, ref_node);
	  }
	};
	var recordRemoveChild = function recordRemoveChild(node, container) {
	  var nodeData = ensureShadyDataForNode(node);
	  var containerData = ensureShadyDataForNode(container);

	  if (node === containerData.firstChild) {
	    containerData.firstChild = nodeData.nextSibling;
	  }

	  if (node === containerData.lastChild) {
	    containerData.lastChild = nodeData.previousSibling;
	  }

	  var p = nodeData.previousSibling;
	  var n = nodeData.nextSibling;

	  if (p) {
	    ensureShadyDataForNode(p).nextSibling = n;
	  }

	  if (n) {
	    ensureShadyDataForNode(n).previousSibling = p;
	  } // When an element is removed, logical data is no longer tracked.
	  // Explicitly set `undefined` here to indicate this. This is disginguished
	  // from `null` which is set if info is null.


	  nodeData.parentNode = nodeData.previousSibling = nodeData.nextSibling = undefined;

	  if (containerData.childNodes !== undefined) {
	    // remove caching of childNodes
	    containerData.childNodes = null;
	  }
	};
	/**
	 * @param  {!Node|DocumentFragment} node
	 * @param  {!Node|DocumentFragment=} adoptedParent
	 */

	var recordChildNodes = function recordChildNodes(node, adoptedParent) {
	  var nodeData = ensureShadyDataForNode(node);

	  if (!adoptedParent && nodeData.firstChild !== undefined) {
	    return;
	  } // remove caching of childNodes


	  nodeData.childNodes = null;
	  var first = nodeData.firstChild = node[NATIVE_PREFIX + 'firstChild'];
	  nodeData.lastChild = node[NATIVE_PREFIX + 'lastChild'];
	  patchInsideElementAccessors(node);

	  for (var n = first, previous; n; n = n[NATIVE_PREFIX + 'nextSibling']) {
	    var sd = ensureShadyDataForNode(n);
	    sd.parentNode = adoptedParent || node;
	    sd.nextSibling = n[NATIVE_PREFIX + 'nextSibling'];
	    sd.previousSibling = previous || null;
	    previous = n;
	    patchOutsideElementAccessors(n);
	  }
	};

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var scopingShim = null;
	function getScopingShim() {
	  if (!scopingShim) {
	    scopingShim = window['ShadyCSS'] && window['ShadyCSS']['ScopingShim'];
	  }

	  return scopingShim || null;
	}
	/**
	 * @param {!Node} node
	 * @param {string} attr
	 * @param {string} value
	 */

	function scopeClassAttribute(node, attr, value) {
	  var scopingShim = getScopingShim();

	  if (scopingShim && attr === 'class') {
	    scopingShim['setElementClass'](node, value);
	    return true;
	  }

	  return false;
	}
	/**
	 * @param {!Node} node
	 * @param {string} newScopeName
	 */

	function addShadyScoping(node, newScopeName) {
	  var scopingShim = getScopingShim();

	  if (!scopingShim) {
	    return;
	  }

	  scopingShim['scopeNode'](node, newScopeName);
	}
	/**
	 * @param {!Node} node
	 * @param {string} currentScopeName
	 */

	function removeShadyScoping(node, currentScopeName) {
	  var scopingShim = getScopingShim();

	  if (!scopingShim) {
	    return;
	  }

	  scopingShim['unscopeNode'](node, currentScopeName);
	}
	/**
	 * @param {!Node} node
	 * @param {string} newScopeName
	 * @param {string} oldScopeName
	 */

	function replaceShadyScoping(node, newScopeName, oldScopeName) {
	  var scopingShim = getScopingShim();

	  if (!scopingShim) {
	    return;
	  }

	  if (oldScopeName) {
	    removeShadyScoping(node, oldScopeName);
	  }

	  addShadyScoping(node, newScopeName);
	}
	/**
	 * @param {!Node} node
	 * @param {string} newScopeName
	 * @return {boolean}
	 */

	function currentScopeIsCorrect(node, newScopeName) {
	  var scopingShim = getScopingShim();

	  if (!scopingShim) {
	    return true;
	  }

	  if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
	    // NOTE: as an optimization, only check that all the top-level children
	    // have the correct scope.
	    var correctScope = true;

	    for (var n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	      correctScope = correctScope && currentScopeIsCorrect(n, newScopeName);
	    }

	    return correctScope;
	  }

	  if (node.nodeType !== Node.ELEMENT_NODE) {
	    return true;
	  }

	  var currentScope = scopingShim['currentScopeForNode'](node);
	  return currentScope === newScopeName;
	}
	/**
	 * @param {!Node} node
	 * @return {string}
	 */

	function currentScopeForNode(node) {
	  if (node.nodeType !== Node.ELEMENT_NODE) {
	    return '';
	  }

	  var scopingShim = getScopingShim();

	  if (!scopingShim) {
	    return '';
	  }

	  return scopingShim['currentScopeForNode'](node);
	}
	/**
	 * Walk over a node's tree and apply visitorFn to each element node
	 *
	 * @param {Node} node
	 * @param {function(!Node):void} visitorFn
	 */

	function treeVisitor(node, visitorFn) {
	  if (!node) {
	    return;
	  } // this check is necessary if `node` is a Document Fragment


	  if (node.nodeType === Node.ELEMENT_NODE) {
	    visitorFn(node);
	  }

	  for (var n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	    if (n.nodeType === Node.ELEMENT_NODE) {
	      treeVisitor(n, visitorFn);
	    }
	  }
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var doc = window.document;
	var preferPerformance = settings.preferPerformance;
	var nativeIsConnectedAccessors =
	/** @type {ObjectPropertyDescriptor} */
	Object.getOwnPropertyDescriptor(Node.prototype, 'isConnected');
	var nativeIsConnected = nativeIsConnectedAccessors && nativeIsConnectedAccessors.get;
	function clearNode$1(node) {
	  var firstChild;

	  while (firstChild = node[SHADY_PREFIX + 'firstChild']) {
	    node[SHADY_PREFIX + 'removeChild'](firstChild);
	  }
	}

	function removeOwnerShadyRoot(node) {
	  // optimization: only reset the tree if node is actually in a root
	  if (hasCachedOwnerRoot(node)) {
	    for (var n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	      removeOwnerShadyRoot(n);
	    }
	  }

	  var nodeData = shadyDataForNode(node);

	  if (nodeData) {
	    nodeData.ownerShadyRoot = undefined;
	  }
	}

	function hasCachedOwnerRoot(node) {
	  var nodeData = shadyDataForNode(node);
	  return Boolean(nodeData && nodeData.ownerShadyRoot !== undefined);
	}
	/**
	 * Finds the first flattened node that is composed in the node's parent.
	 * If the given node is a slot, then the first flattened node is returned
	 * if it exists, otherwise advance to the node's nextSibling.
	 * @param {Node} node within which to find first composed node
	 * @returns {Node} first composed node
	 */


	function firstComposedNode(node) {
	  var composed = node;

	  if (node && node.localName === 'slot') {
	    var nodeData = shadyDataForNode(node);
	    var flattened = nodeData && nodeData.flattenedNodes;
	    composed = flattened && flattened.length ? flattened[0] : firstComposedNode(node[SHADY_PREFIX + 'nextSibling']);
	  }

	  return composed;
	}
	/**
	 * @param {Node} node
	 * @param {Node=} addedNode
	 * @param {Node=} removedNode
	 */


	function scheduleObserver(node, addedNode, removedNode) {
	  var nodeData = shadyDataForNode(node);
	  var observer = nodeData && nodeData.observer;

	  if (observer) {
	    if (addedNode) {
	      observer.addedNodes.push(addedNode);
	    }

	    if (removedNode) {
	      observer.removedNodes.push(removedNode);
	    }

	    observer.schedule();
	  }
	}

	var NodePatches = getOwnPropertyDescriptors({
	  /** @this {Node} */
	  get parentNode() {
	    var nodeData = shadyDataForNode(this);
	    var l = nodeData && nodeData.parentNode;
	    return l !== undefined ? l : this[NATIVE_PREFIX + 'parentNode'];
	  },

	  /** @this {Node} */
	  get firstChild() {
	    var nodeData = shadyDataForNode(this);
	    var l = nodeData && nodeData.firstChild;
	    return l !== undefined ? l : this[NATIVE_PREFIX + 'firstChild'];
	  },

	  /** @this {Node} */
	  get lastChild() {
	    var nodeData = shadyDataForNode(this);
	    var l = nodeData && nodeData.lastChild;
	    return l !== undefined ? l : this[NATIVE_PREFIX + 'lastChild'];
	  },

	  /** @this {Node} */
	  get nextSibling() {
	    var nodeData = shadyDataForNode(this);
	    var l = nodeData && nodeData.nextSibling;
	    return l !== undefined ? l : this[NATIVE_PREFIX + 'nextSibling'];
	  },

	  /** @this {Node} */
	  get previousSibling() {
	    var nodeData = shadyDataForNode(this);
	    var l = nodeData && nodeData.previousSibling;
	    return l !== undefined ? l : this[NATIVE_PREFIX + 'previousSibling'];
	  },

	  /** @this {Node} */
	  get childNodes() {
	    var childNodes;

	    if (isTrackingLogicalChildNodes(this)) {
	      var nodeData = shadyDataForNode(this);

	      if (!nodeData.childNodes) {
	        nodeData.childNodes = [];

	        for (var n = this[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	          nodeData.childNodes.push(n);
	        }
	      }

	      childNodes = nodeData.childNodes;
	    } else {
	      childNodes = this[NATIVE_PREFIX + 'childNodes'];
	    }

	    childNodes.item = function (index) {
	      return childNodes[index];
	    };

	    return childNodes;
	  },

	  /** @this {Node} */
	  get parentElement() {
	    var nodeData = shadyDataForNode(this);
	    var l = nodeData && nodeData.parentNode;

	    if (l && l.nodeType !== Node.ELEMENT_NODE) {
	      l = null;
	    }

	    return l !== undefined ? l : this[NATIVE_PREFIX + 'parentElement'];
	  },

	  /** @this {Node} */
	  get isConnected() {
	    if (nativeIsConnected && nativeIsConnected.call(this)) {
	      return true;
	    }

	    if (this.nodeType == Node.DOCUMENT_FRAGMENT_NODE) {
	      return false;
	    } // Fast path for distributed nodes.


	    var ownerDocument = this.ownerDocument;

	    if (hasDocumentContains) {
	      if (ownerDocument[NATIVE_PREFIX + 'contains'](this)) {
	        return true;
	      }
	    } else if (ownerDocument.documentElement && ownerDocument.documentElement[NATIVE_PREFIX + 'contains'](this)) {
	      return true;
	    } // Slow path for non-distributed nodes.


	    var node = this;

	    while (node && !(node instanceof Document)) {
	      node = node[SHADY_PREFIX + 'parentNode'] || (isShadyRoot(node) ?
	      /** @type {ShadowRoot} */
	      node.host : undefined);
	    }

	    return !!(node && node instanceof Document);
	  },

	  /** @this {Node} */
	  get textContent() {
	    if (isTrackingLogicalChildNodes(this)) {
	      var tc = [];

	      for (var n = this[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	        if (n.nodeType !== Node.COMMENT_NODE) {
	          tc.push(n[SHADY_PREFIX + 'textContent']);
	        }
	      }

	      return tc.join('');
	    } else {
	      return this[NATIVE_PREFIX + 'textContent'];
	    }
	  },

	  /**
	   * @this {Node}
	   * @param {string} value
	   */
	  set textContent(value) {
	    if (typeof value === 'undefined' || value === null) {
	      value = '';
	    }

	    switch (this.nodeType) {
	      case Node.ELEMENT_NODE:
	      case Node.DOCUMENT_FRAGMENT_NODE:
	        if (!isTrackingLogicalChildNodes(this) && settings.hasDescriptors) {
	          // may be removing a nested slot but fast path if we know we are not.
	          var firstChild = this[SHADY_PREFIX + 'firstChild'];

	          if (firstChild != this[SHADY_PREFIX + 'lastChild'] || firstChild && firstChild.nodeType != Node.TEXT_NODE) {
	            clearNode$1(this);
	          }

	          this[NATIVE_PREFIX + 'textContent'] = value;
	        } else {
	          clearNode$1(this); // Document fragments must have no childNodes if setting a blank string

	          if (value.length > 0 || this.nodeType === Node.ELEMENT_NODE) {
	            this[SHADY_PREFIX + 'insertBefore'](document.createTextNode(value));
	          }
	        }

	        break;

	      default:
	        // Note, be wary of patching `nodeValue`.
	        this.nodeValue = value;
	        break;
	    }
	  },

	  // Patched `insertBefore`. Note that all mutations that add nodes are routed
	  // here. When a <slot> is added or a node is added to a host with a shadowRoot
	  // with a slot, a standard dom `insert` call is aborted and `_asyncRender`
	  // is called on the relevant shadowRoot. In all other cases, a standard dom
	  // `insert` can be made, but the location and ref_node may need to be changed.

	  /**
	   * @this {Node}
	   * @param {Node} node
	   * @param {Node=} ref_node
	   */
	  insertBefore: function insertBefore(node, ref_node) {
	    // optimization: assume native insertBefore is ok if the nodes are not in the document.
	    if (this.ownerDocument !== doc && node.ownerDocument !== doc) {
	      this[NATIVE_PREFIX + 'insertBefore'](node, ref_node);
	      return node;
	    }

	    if (node === this) {
	      throw Error("Failed to execute 'appendChild' on 'Node': The new child element contains the parent.");
	    }

	    if (ref_node) {
	      var refData = shadyDataForNode(ref_node);
	      var p = refData && refData.parentNode;

	      if (p !== undefined && p !== this || p === undefined && ref_node[NATIVE_PREFIX + 'parentNode'] !== this) {
	        throw Error("Failed to execute 'insertBefore' on 'Node': The node " + "before which the new node is to be inserted is not a child of this node.");
	      }
	    }

	    if (ref_node === node) {
	      return node;
	    }
	    /** @type {!Array<!HTMLSlotElement>} */


	    var slotsAdded = [];
	    var ownerRoot = ownerShadyRootForNode(this);
	    /** @type {string} */

	    var newScopeName = ownerRoot ? ownerRoot.host.localName : currentScopeForNode(this);
	    /** @type {string} */

	    var oldScopeName; // remove from existing location

	    var parentNode = node[SHADY_PREFIX + 'parentNode'];

	    if (parentNode) {
	      oldScopeName = currentScopeForNode(node);
	      var skipUnscoping = // Don't remove scoping if we're inserting into another shadowRoot;
	      // this would be unnecessary since it will be re-scoped below
	      Boolean(ownerRoot) || // Don't remove scoping if we're being moved between non-shadowRoot
	      // locations (the likely case is when moving pre-scoped nodes in a template)
	      !ownerShadyRootForNode(node) || // Under preferPerformance, don't remove scoping when moving back into
	      // a document fragment that was previously scoped; the assumption is
	      // that the user should only move correctly-scoped DOM back into it
	      preferPerformance && this['__noInsertionPoint'] !== undefined;
	      parentNode[SHADY_PREFIX + 'removeChild'](node, skipUnscoping);
	    } // add to new parent


	    var allowNativeInsert = true;
	    var needsScoping = (!preferPerformance || // Under preferPerformance, only re-scope if we're not coming from a
	    // pre-scoped doc fragment or back into a pre-scoped doc fragment
	    node['__noInsertionPoint'] === undefined && this['__noInsertionPoint'] === undefined) && !currentScopeIsCorrect(node, newScopeName);
	    var needsSlotFinding = ownerRoot && !node['__noInsertionPoint'] && (!preferPerformance || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE);

	    if (needsSlotFinding || needsScoping) {
	      // NOTE: avoid node.removeChild as this *can* trigger another patched
	      // method (e.g. custom elements) and we want only the shady method to run.
	      // The following table describes what style scoping actions should happen as a result of this insertion.
	      // document -> shadowRoot: replace
	      // shadowRoot -> shadowRoot: replace
	      // shadowRoot -> shadowRoot of same type: do nothing
	      // shadowRoot -> document: allow unscoping
	      // document -> document: do nothing
	      // The "same type of shadowRoot" and "document to document cases rely on `currentScopeIsCorrect` returning true
	      if (needsScoping) {
	        // in a document or disconnected tree, replace scoping if necessary
	        oldScopeName = oldScopeName || currentScopeForNode(node);
	      }

	      treeVisitor(node, function (node) {
	        if (needsSlotFinding && node.localName === 'slot') {
	          slotsAdded.push(
	          /** @type {!HTMLSlotElement} */
	          node);
	        }

	        if (needsScoping) {
	          replaceShadyScoping(node, newScopeName, oldScopeName);
	        }
	      });
	    } // if a slot is added, must render containing root.


	    if (slotsAdded.length) {
	      ownerRoot._addSlots(slotsAdded);

	      ownerRoot._asyncRender();
	    }

	    if (isTrackingLogicalChildNodes(this)) {
	      recordInsertBefore(node, this, ref_node); // when inserting into a host with a shadowRoot with slot, use
	      // `shadowRoot._asyncRender()` via `attach-shadow` module

	      var parentData = shadyDataForNode(this);

	      if (hasShadowRootWithSlot(this)) {
	        parentData.root._asyncRender();

	        allowNativeInsert = false; // when inserting into a host with shadowRoot with NO slot, do nothing
	        // as the node should not be added to composed dome anywhere.
	      } else if (parentData.root) {
	        allowNativeInsert = false;
	      }
	    }

	    if (allowNativeInsert) {
	      // if adding to a shadyRoot, add to host instead
	      var container = isShadyRoot(this) ?
	      /** @type {ShadowRoot} */
	      this.host : this; // if ref_node, get the ref_node that's actually in composed dom.

	      if (ref_node) {
	        ref_node = firstComposedNode(ref_node);
	        container[NATIVE_PREFIX + 'insertBefore'](node, ref_node);
	      } else {
	        container[NATIVE_PREFIX + 'appendChild'](node);
	      } // Since ownerDocument is not patched, it can be incorrect after this call
	      // if the node is physically appended via distribution. This can result
	      // in the custom elements polyfill not upgrading the node if it's in an inert doc.
	      // We correct this by calling `adoptNode`.

	    } else if (node.ownerDocument !== this.ownerDocument) {
	      this.ownerDocument.adoptNode(node);
	    }

	    scheduleObserver(this, node);
	    return node;
	  },

	  /**
	   * @this {Node}
	   * @param {Node} node
	   */
	  appendChild: function appendChild(node) {
	    // if this is a shadowRoot and the shadowRoot is passed as `node`
	    // then an optimized append has already been performed, so do nothing.
	    if (!(this == node && isShadyRoot(node))) {
	      return this[SHADY_PREFIX + 'insertBefore'](node);
	    }
	  },

	  /**
	   * Patched `removeChild`. Note that all dom "removals" are routed here.
	   * Removes the given `node` from the element's `children`.
	   * This method also performs dom composition.
	   * @this {Node}
	   * @param {Node} node
	   * @param {boolean=} skipUnscoping
	   */
	  removeChild: function removeChild(node) {
	    var skipUnscoping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	    if (this.ownerDocument !== doc) {
	      return this[NATIVE_PREFIX + 'removeChild'](node);
	    }

	    if (node[SHADY_PREFIX + 'parentNode'] !== this) {
	      throw Error('The node to be removed is not a child of this node: ' + node);
	    }

	    var preventNativeRemove;
	    var ownerRoot = ownerShadyRootForNode(node);

	    var removingInsertionPoint = ownerRoot && ownerRoot._removeContainedSlots(node);

	    var parentData = shadyDataForNode(this);

	    if (isTrackingLogicalChildNodes(this)) {
	      recordRemoveChild(node, this);

	      if (hasShadowRootWithSlot(this)) {
	        parentData.root._asyncRender();

	        preventNativeRemove = true;
	      }
	    } // unscope a node leaving a ShadowRoot if ShadyCSS is present, and this node
	    // is not going to be rescoped in `insertBefore`


	    if (getScopingShim() && !skipUnscoping && ownerRoot && node.nodeType !== Node.TEXT_NODE) {
	      var oldScopeName = currentScopeForNode(node);
	      treeVisitor(node, function (node) {
	        removeShadyScoping(node, oldScopeName);
	      });
	    }

	    removeOwnerShadyRoot(node); // if removing slot, must render containing root

	    if (ownerRoot) {
	      var changeSlotContent = this && this.localName === 'slot';

	      if (changeSlotContent) {
	        preventNativeRemove = true;
	      }

	      if (removingInsertionPoint || changeSlotContent) {
	        ownerRoot._asyncRender();
	      }
	    }

	    if (!preventNativeRemove) {
	      // if removing from a shadyRoot, remove from host instead
	      var container = isShadyRoot(this) ?
	      /** @type {ShadowRoot} */
	      this.host : this; // not guaranteed to physically be in container; e.g.
	      // (1) if parent has a shadyRoot, element may or may not at distributed
	      // location (could be undistributed)
	      // (2) if parent is a slot, element may not ben in composed dom

	      if (!(parentData.root || node.localName === 'slot') || container === node[NATIVE_PREFIX + 'parentNode']) {
	        container[NATIVE_PREFIX + 'removeChild'](node);
	      }
	    }

	    scheduleObserver(this, null, node);
	    return node;
	  },

	  /**
	   * @this {Node}
	   * @param {Node} node
	   * @param {Node=} ref_node
	   */
	  replaceChild: function replaceChild(node, ref_node) {
	    this[SHADY_PREFIX + 'insertBefore'](node, ref_node);
	    this[SHADY_PREFIX + 'removeChild'](ref_node);
	    return node;
	  },

	  /**
	   * @this {Node}
	   * @param {boolean=} deep
	   */
	  cloneNode: function cloneNode(deep) {
	    if (this.localName == 'template') {
	      return this[NATIVE_PREFIX + 'cloneNode'](deep);
	    } else {
	      var n = this[NATIVE_PREFIX + 'cloneNode'](false); // Attribute nodes historically had childNodes, but they have later
	      // been removed from the spec.
	      // Make sure we do not do a deep clone on them for old browsers (IE11)

	      if (deep && n.nodeType !== Node.ATTRIBUTE_NODE) {
	        for (var c = this[SHADY_PREFIX + 'firstChild'], nc; c; c = c[SHADY_PREFIX + 'nextSibling']) {
	          nc = c[SHADY_PREFIX + 'cloneNode'](true);
	          n[SHADY_PREFIX + 'appendChild'](nc);
	        }
	      }

	      return n;
	    }
	  },

	  /**
	   * @this {Node}
	   * @param {Object=} options
	   */
	  // TODO(sorvell): implement `options` e.g. `{ composed: boolean }`
	  getRootNode: function getRootNode(options) {
	    // eslint-disable-line no-unused-vars
	    if (!this || !this.nodeType) {
	      return;
	    }

	    var nodeData = ensureShadyDataForNode(this);
	    var root = nodeData.ownerShadyRoot;

	    if (root === undefined) {
	      if (isShadyRoot(this)) {
	        root = this;
	        nodeData.ownerShadyRoot = root;
	      } else {
	        var parent = this[SHADY_PREFIX + 'parentNode'];
	        root = parent ? parent[SHADY_PREFIX + 'getRootNode'](options) : this; // memo-ize result for performance but only memo-ize
	        // result if node is in the document. This avoids a problem where a root
	        // can be cached while an element is inside a fragment.
	        // If this happens and we cache the result, the value can become stale
	        // because for perf we avoid processing the subtree of added fragments.

	        if (document.documentElement[NATIVE_PREFIX + 'contains'](this)) {
	          nodeData.ownerShadyRoot = root;
	        }
	      }
	    }

	    return root;
	  },

	  /** @this {Node} */
	  contains: function contains$1(node) {
	    return contains(this, node);
	  }
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/**
	 * @param {Node} node
	 * @param {Function} matcher
	 * @param {Function=} halter
	 */

	function query(node, matcher, halter) {
	  var list = [];
	  queryChildNodes(node, matcher, halter, list);
	  return list;
	}

	function queryChildNodes(parent, matcher, halter, list) {
	  for (var n = parent[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	    if (n.nodeType === Node.ELEMENT_NODE && queryElement(n, matcher, halter, list)) {
	      return true;
	    }
	  }
	}

	function queryElement(node, matcher, halter, list) {
	  var result = matcher(node);

	  if (result) {
	    list.push(node);
	  }

	  if (halter && halter(result)) {
	    return result;
	  }

	  queryChildNodes(node, matcher, halter, list);
	} // Needed on Element, DocumentFragment, Document


	var ParentNodePatches = getOwnPropertyDescriptors({
	  /** @this {Element} */
	  get firstElementChild() {
	    var nodeData = shadyDataForNode(this);

	    if (nodeData && nodeData.firstChild !== undefined) {
	      var n = this[SHADY_PREFIX + 'firstChild'];

	      while (n && n.nodeType !== Node.ELEMENT_NODE) {
	        n = n[SHADY_PREFIX + 'nextSibling'];
	      }

	      return n;
	    } else {
	      return this[NATIVE_PREFIX + 'firstElementChild'];
	    }
	  },

	  /** @this {Element} */
	  get lastElementChild() {
	    var nodeData = shadyDataForNode(this);

	    if (nodeData && nodeData.lastChild !== undefined) {
	      var n = this[SHADY_PREFIX + 'lastChild'];

	      while (n && n.nodeType !== Node.ELEMENT_NODE) {
	        n = n[SHADY_PREFIX + 'previousSibling'];
	      }

	      return n;
	    } else {
	      return this[NATIVE_PREFIX + 'lastElementChild'];
	    }
	  },

	  /** @this {Element} */
	  get children() {
	    if (!isTrackingLogicalChildNodes(this)) {
	      return this[NATIVE_PREFIX + 'children'];
	    }

	    return createPolyfilledHTMLCollection(Array.prototype.filter.call(childNodesArray(this), function (n) {
	      return n.nodeType === Node.ELEMENT_NODE;
	    }));
	  },

	  /** @this {Element} */
	  get childElementCount() {
	    var children = this[SHADY_PREFIX + 'children'];

	    if (children) {
	      return children.length;
	    }

	    return 0;
	  }

	});
	var QueryPatches = getOwnPropertyDescriptors({
	  // TODO(sorvell): consider doing native QSA and filtering results.

	  /**
	   * @this {Element}
	   * @param  {string} selector
	   */
	  querySelector: function querySelector(selector) {
	    // match selector and halt on first result.
	    var result = query(this, function (n) {
	      return matchesSelector(n, selector);
	    }, function (n) {
	      return Boolean(n);
	    })[0];
	    return result || null;
	  },

	  /**
	   * @this {Element}
	   * @param  {string} selector
	   * @param  {boolean} useNative
	   */
	  // TODO(sorvell): `useNative` option relies on native querySelectorAll and
	  // misses distributed nodes, see
	  // https://github.com/webcomponents/shadydom/pull/210#issuecomment-361435503
	  querySelectorAll: function querySelectorAll(selector, useNative) {
	    if (useNative) {
	      var o = Array.prototype.slice.call(this[NATIVE_PREFIX + 'querySelectorAll'](selector));
	      var root = this[SHADY_PREFIX + 'getRootNode']();
	      return o.filter(function (e) {
	        return e[SHADY_PREFIX + 'getRootNode']() == root;
	      });
	    }

	    return query(this, function (n) {
	      return matchesSelector(n, selector);
	    });
	  }
	}); // In preferPerformance mode, create a custom `ParentNodeDocumentOrFragment`
	// that optionally does not mixin querySelector/All; this is a performance
	// optimization. In noPatch, we need to keep the query patches here in order to
	// ensure the query API is available on the wrapper

	var ParentNodeDocumentOrFragmentPatches = settings.preferPerformance && !settings.noPatch ? Object.assign({}, ParentNodePatches) : ParentNodePatches;
	Object.assign(ParentNodePatches, QueryPatches);

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var DocumentOrFragmentPatches = getOwnPropertyDescriptors({
	  /**
	   * @this {Element}
	   * @param {string} id
	   */
	  getElementById: function getElementById(id) {
	    if (id === '') {
	      return null;
	    }

	    var result = query(this, function (n) {
	      return n.id == id;
	    }, function (n) {
	      return Boolean(n);
	    })[0];
	    return result || null;
	  }
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	function getDocumentActiveElement() {
	  if (settings.hasDescriptors) {
	    return document[NATIVE_PREFIX + 'activeElement'];
	  } else {
	    return document.activeElement;
	  }
	}

	var DocumentOrShadowRootPatches = getOwnPropertyDescriptors({
	  /** @this {Document|ShadowRoot} */
	  get activeElement() {
	    var active = getDocumentActiveElement(); // In IE11, activeElement might be an empty object if the document is
	    // contained in an iframe.
	    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10998788/

	    if (!active || !active.nodeType) {
	      return null;
	    }

	    var isShadyRoot$1 = !!isShadyRoot(this);

	    if (this !== document) {
	      // If this node isn't a document or shady root, then it doesn't have
	      // an active element.
	      if (!isShadyRoot$1) {
	        return null;
	      } // If this shady root's host is the active element or the active
	      // element is not a descendant of the host (in the composed tree),
	      // then it doesn't have an active element.


	      if (this.host === active || !this.host[NATIVE_PREFIX + 'contains'](active)) {
	        return null;
	      }
	    } // This node is either the document or a shady root of which the active
	    // element is a (composed) descendant of its host; iterate upwards to
	    // find the active element's most shallow host within it.


	    var activeRoot = ownerShadyRootForNode(active);

	    while (activeRoot && activeRoot !== this) {
	      active = activeRoot.host;
	      activeRoot = ownerShadyRootForNode(active);
	    }

	    if (this === document) {
	      // This node is the document, so activeRoot should be null.
	      return activeRoot ? null : active;
	    } else {
	      // This node is a non-document shady root, and it should be
	      // activeRoot.
	      return activeRoot === this ? active : null;
	    }
	  }

	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/** @type {!Document} */

	var inertDoc$1 = document.implementation.createHTMLDocument('inert');
	var ElementOrShadowRootPatches = getOwnPropertyDescriptors({
	  /** @this {Element} */
	  get innerHTML() {
	    if (isTrackingLogicalChildNodes(this)) {
	      var content = this.localName === 'template' ?
	      /** @type {HTMLTemplateElement} */
	      this.content : this;
	      return getInnerHTML(content, childNodesArray);
	    } else {
	      return this[NATIVE_PREFIX + 'innerHTML'];
	    }
	  },

	  /**
	   * @this {Element}
	   * @param {string} value
	   */
	  set innerHTML(value) {
	    if (this.localName === 'template') {
	      this[NATIVE_PREFIX + 'innerHTML'] = value;
	    } else {
	      clearNode$1(this);
	      var containerName = this.localName || 'div';
	      var htmlContainer;

	      if (!this.namespaceURI || this.namespaceURI === inertDoc$1.namespaceURI) {
	        htmlContainer = inertDoc$1.createElement(containerName);
	      } else {
	        htmlContainer = inertDoc$1.createElementNS(this.namespaceURI, containerName);
	      }

	      if (settings.hasDescriptors) {
	        htmlContainer[NATIVE_PREFIX + 'innerHTML'] = value;
	      } else {
	        htmlContainer.innerHTML = value;
	      }

	      var firstChild;

	      while (firstChild = htmlContainer[SHADY_PREFIX + 'firstChild']) {
	        this[SHADY_PREFIX + 'insertBefore'](firstChild);
	      }
	    }
	  }

	});

	var ShadowRootPatches = getOwnPropertyDescriptors({
	  /**
	   * @this {ShadowRoot}
	   * @param {string} type
	   * @param {Function} fn
	   * @param {Object|boolean=} optionsOrCapture
	   */
	  addEventListener: function addEventListener(type, fn, optionsOrCapture) {
	    if (_typeof_1(optionsOrCapture) !== 'object') {
	      optionsOrCapture = {
	        capture: Boolean(optionsOrCapture)
	      };
	    } // Note, `__shadyTarget` may already be set if an event was added on a <slot> child


	    optionsOrCapture.__shadyTarget = optionsOrCapture.__shadyTarget || this;
	    this.host[SHADY_PREFIX + 'addEventListener'](type, fn, optionsOrCapture);
	  },

	  /**
	   * @this {ShadowRoot}
	   * @param {string} type
	   * @param {Function} fn
	   * @param {Object|boolean=} optionsOrCapture
	   */
	  removeEventListener: function removeEventListener(type, fn, optionsOrCapture) {
	    if (_typeof_1(optionsOrCapture) !== 'object') {
	      optionsOrCapture = {
	        capture: Boolean(optionsOrCapture)
	      };
	    } // Note, `__shadyTarget` may already be set if an event was added on a <slot> child


	    optionsOrCapture.__shadyTarget = optionsOrCapture.__shadyTarget || this;
	    this.host[SHADY_PREFIX + 'removeEventListener'](type, fn, optionsOrCapture);
	  }
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/**
	 * @param {!Object} proto
	 * @param {string=} prefix
	 */

	var patchShadyAccessors = function patchShadyAccessors(proto, prefix) {
	  patchProperties(proto, ShadowRootPatches, prefix);
	  patchProperties(proto, DocumentOrShadowRootPatches, prefix);
	  patchProperties(proto, ElementOrShadowRootPatches, prefix); // We ensure ParentNode accessors since these do not exist in Edge/IE on DocumentFragments.

	  patchProperties(proto, ParentNodePatches, prefix); // Ensure `shadowRoot` has basic descriptors when we cannot rely
	  // on them coming from DocumentFragment.
	  //
	  // Case 1, noPatching: Because we want noPatch ShadyRoots to have native property
	  // names so that they do not have to be wrapped...
	  // When we do *not* patch Node/DocumentFragment.prototype
	  // we must manually install those properties on ShadyRoot's prototype.
	  // Note, it's important to only install these in this mode so as not to stomp
	  // over CustomElements polyfill's patches on Node/DocumentFragment methods.

	  if (settings.noPatch && !prefix) {
	    patchProperties(proto, NodePatches, prefix);
	    patchProperties(proto, DocumentOrFragmentPatches, prefix); // Case 2, bad descriptors: Ensure accessors are on ShadowRoot.
	    // These descriptors are normally used for instance patching but because
	    // ShadyRoot can always be patched, just do it to the prototype.
	  } else if (!settings.hasDescriptors) {
	    patchProperties(proto, OutsideDescriptors);
	    patchProperties(proto, InsideDescriptors);
	    patchProperties(proto, TextContentInnerHTMLDescriptors);
	  }
	};

	var patchShadyRoot = function patchShadyRoot(proto) {
	  proto.__proto__ = DocumentFragment.prototype; // patch both prefixed and not, even when noPatch == true.

	  patchShadyAccessors(proto, SHADY_PREFIX);
	  patchShadyAccessors(proto); // Ensure native properties are all safely wrapped since ShadowRoot is not an
	  // actual DocumentFragment instance.

	  Object.defineProperties(proto, {
	    nodeType: {
	      value: Node.DOCUMENT_FRAGMENT_NODE,
	      configurable: true
	    },
	    nodeName: {
	      value: '#document-fragment',
	      configurable: true
	    },
	    nodeValue: {
	      value: null,
	      configurable: true
	    }
	  }); // make undefined

	  ['localName', 'namespaceURI', 'prefix'].forEach(function (prop) {
	    Object.defineProperty(proto, prop, {
	      value: undefined,
	      configurable: true
	    });
	  }); // defer properties to host

	  ['ownerDocument', 'baseURI', 'isConnected'].forEach(function (prop) {
	    Object.defineProperty(proto, prop, {
	      /** @this {ShadowRoot} */
	      get: function get() {
	        return this.host[prop];
	      },
	      configurable: true
	    });
	  });
	};

	// ShadyRoot constructor in `attachShadow` to prevent the constructor from
	// throwing. This prevents the user from being able to manually construct a
	// ShadyRoot (i.e. `new ShadowRoot()`).

	var ShadyRootConstructionToken = {};
	var CATCHALL_NAME = '__catchall';
	var SHADYROOT_NAME = 'ShadyRoot';
	var MODE_CLOSED = 'closed';
	var isRendering = settings['deferConnectionCallbacks'] && document.readyState === 'loading';
	var rootRendered;

	function ancestorList(node) {
	  var ancestors = [];

	  do {
	    ancestors.unshift(node);
	  } while (node = node[SHADY_PREFIX + 'parentNode']);

	  return ancestors;
	}
	/**
	 * @extends {ShadowRoot}
	 */


	var ShadyRoot =
	/*#__PURE__*/
	function () {
	  function ShadyRoot(token, host, options) {
	    classCallCheck(this, ShadyRoot);

	    if (token !== ShadyRootConstructionToken) {
	      throw new TypeError('Illegal constructor');
	    }
	    /** @type {boolean} */


	    this._renderPending;
	    /** @type {boolean} */

	    this._hasRendered;
	    /** @type {?Array<HTMLSlotElement>} */

	    this._slotList = null;
	    /** @type {?Object<string, Array<HTMLSlotElement>>} */

	    this._slotMap;
	    /** @type {?Array<HTMLSlotElement>} */

	    this._pendingSlots;

	    this._init(host, options);
	  }

	  createClass(ShadyRoot, [{
	    key: "_init",
	    value: function _init(host, options) {
	      // NOTE: set a fake local name so this element can be
	      // distinguished from a DocumentFragment when patching.
	      // FF doesn't allow this to be `localName`

	      /** @type {string} */
	      this._localName = SHADYROOT_NAME; // root <=> host

	      this.host = host;
	      /** @type {!string|undefined} */

	      this.mode = options && options.mode;
	      recordChildNodes(this.host);
	      var hostData = ensureShadyDataForNode(this.host);
	      /** @type {!ShadyRoot} */

	      hostData.root = this;
	      hostData.publicRoot = this.mode !== MODE_CLOSED ? this : null; // setup root

	      var rootData = ensureShadyDataForNode(this);
	      rootData.firstChild = rootData.lastChild = rootData.parentNode = rootData.nextSibling = rootData.previousSibling = null; // NOTE: optimization flag, only require an asynchronous render
	      // to record parsed children if flag is not set.

	      if (settings['preferPerformance']) {
	        var n;

	        while (n = this.host[NATIVE_PREFIX + 'firstChild']) {
	          this.host[NATIVE_PREFIX + 'removeChild'](n);
	        }
	      } else {
	        this._asyncRender();
	      }
	    }
	  }, {
	    key: "_asyncRender",
	    value: function _asyncRender() {
	      var _this = this;

	      if (!this._renderPending) {
	        this._renderPending = true;
	        enqueue(function () {
	          return _this._render();
	        });
	      }
	    } // returns the oldest renderPending ancestor root.

	  }, {
	    key: "_getPendingDistributionRoot",
	    value: function _getPendingDistributionRoot() {
	      var renderRoot;
	      var root = this;

	      while (root) {
	        if (root._renderPending) {
	          renderRoot = root;
	        }

	        root = root._getDistributionParent();
	      }

	      return renderRoot;
	    } // Returns the shadyRoot `this.host` if `this.host`
	    // has children that require distribution.

	  }, {
	    key: "_getDistributionParent",
	    value: function _getDistributionParent() {
	      var root = this.host[SHADY_PREFIX + 'getRootNode']();

	      if (!isShadyRoot(root)) {
	        return;
	      }

	      var nodeData = shadyDataForNode(this.host);

	      if (nodeData && nodeData.__childSlotCount > 0) {
	        return root;
	      }
	    } // Renders the top most render pending shadowRoot in the distribution tree.
	    // This is safe because when a distribution parent renders, all children render.

	  }, {
	    key: "_render",
	    value: function _render() {
	      // If this root is not pending, it needs no rendering work. Any pending
	      // parent that needs to render wll cause this root to render.
	      var root = this._renderPending && this._getPendingDistributionRoot();

	      if (root) {
	        root._renderSelf();
	      }
	    }
	  }, {
	    key: "_flushInitial",
	    value: function _flushInitial() {
	      if (!this._hasRendered && this._renderPending) {
	        this._render();
	      }
	    }
	    /** @override */

	  }, {
	    key: "_renderSelf",
	    value: function _renderSelf() {
	      // track rendering state.
	      var wasRendering = isRendering;
	      isRendering = true;
	      this._renderPending = false;

	      if (this._slotList) {
	        this._distribute();

	        this._compose();
	      } // NOTE: optimization flag, only process parsed children
	      // if optimization flag is not set.
	      // on initial render remove any undistributed children.


	      if (!settings['preferPerformance'] && !this._hasRendered) {
	        for (var n = this.host[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	          var data = shadyDataForNode(n);

	          if (n[NATIVE_PREFIX + 'parentNode'] === this.host && (n.localName === 'slot' || !data.assignedSlot)) {
	            this.host[NATIVE_PREFIX + 'removeChild'](n);
	          }
	        }
	      }

	      this._hasRendered = true;
	      isRendering = wasRendering;

	      if (rootRendered) {
	        rootRendered();
	      }
	    }
	  }, {
	    key: "_distribute",
	    value: function _distribute() {
	      this._validateSlots(); // capture # of previously assigned nodes to help determine if dirty.


	      for (var i = 0, slot; i < this._slotList.length; i++) {
	        slot = this._slotList[i];

	        this._clearSlotAssignedNodes(slot);
	      } // distribute host children.


	      for (var n = this.host[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	        this._distributeNodeToSlot(n);
	      } // fallback content, slotchange, and dirty roots


	      for (var _i = 0; _i < this._slotList.length; _i++) {
	        var _slot = this._slotList[_i];
	        var slotData = shadyDataForNode(_slot); // distribute fallback content

	        if (!slotData.assignedNodes.length) {
	          for (var _n = _slot[SHADY_PREFIX + 'firstChild']; _n; _n = _n[SHADY_PREFIX + 'nextSibling']) {
	            this._distributeNodeToSlot(_n, _slot);
	          }
	        }

	        var slotParentData = shadyDataForNode(_slot[SHADY_PREFIX + 'parentNode']);
	        var slotParentRoot = slotParentData && slotParentData.root;

	        if (slotParentRoot && (slotParentRoot._hasInsertionPoint() || slotParentRoot._renderPending)) {
	          slotParentRoot._renderSelf();
	        }

	        this._addAssignedToFlattenedNodes(slotData.flattenedNodes, slotData.assignedNodes);

	        var prevAssignedNodes = slotData._previouslyAssignedNodes;

	        if (prevAssignedNodes) {
	          for (var _i2 = 0; _i2 < prevAssignedNodes.length; _i2++) {
	            shadyDataForNode(prevAssignedNodes[_i2])._prevAssignedSlot = null;
	          }

	          slotData._previouslyAssignedNodes = null; // dirty if previously less assigned nodes than previously assigned.

	          if (prevAssignedNodes.length > slotData.assignedNodes.length) {
	            slotData.dirty = true;
	          }
	        }
	        /* Note: A slot is marked dirty whenever a node is newly assigned to it
	        or a node is assigned to a different slot (done in `_distributeNodeToSlot`)
	        or if the number of nodes assigned to the slot has decreased (done above);
	        */


	        if (slotData.dirty) {
	          slotData.dirty = false;

	          this._fireSlotChange(_slot);
	        }
	      }
	    }
	    /**
	     * Distributes given `node` to the appropriate slot based on its `slot`
	     * attribute. If `forcedSlot` is given, then the node is distributed to the
	     * `forcedSlot`.
	     * Note: slot to which the node is assigned will be marked dirty for firing
	     * `slotchange`.
	     * @param {Node} node
	     * @param {Node=} forcedSlot
	     *
	     */

	  }, {
	    key: "_distributeNodeToSlot",
	    value: function _distributeNodeToSlot(node, forcedSlot) {
	      var nodeData = ensureShadyDataForNode(node);
	      var oldSlot = nodeData._prevAssignedSlot;
	      nodeData._prevAssignedSlot = null;
	      var slot = forcedSlot;

	      if (!slot) {
	        var name = node[SHADY_PREFIX + 'slot'] || CATCHALL_NAME;
	        var list = this._slotMap[name];
	        slot = list && list[0];
	      }

	      if (slot) {
	        var slotData = ensureShadyDataForNode(slot);
	        slotData.assignedNodes.push(node);
	        nodeData.assignedSlot = slot;
	      } else {
	        nodeData.assignedSlot = undefined;
	      }

	      if (oldSlot !== nodeData.assignedSlot) {
	        if (nodeData.assignedSlot) {
	          ensureShadyDataForNode(nodeData.assignedSlot).dirty = true;
	        }
	      }
	    }
	    /**
	     * Clears the assignedNodes tracking data for a given `slot`. Note, the current
	     * assigned node data is tracked (via _previouslyAssignedNodes and
	     * _prevAssignedSlot) to see if `slotchange` should fire. This data may be out
	     *  of date at this time because the assigned nodes may have already been
	     * distributed to another root. This is ok since this data is only used to
	     * track changes.
	     * @param {HTMLSlotElement} slot
	     */

	  }, {
	    key: "_clearSlotAssignedNodes",
	    value: function _clearSlotAssignedNodes(slot) {
	      var slotData = shadyDataForNode(slot);
	      var n$ = slotData.assignedNodes;
	      slotData.assignedNodes = [];
	      slotData.flattenedNodes = [];
	      slotData._previouslyAssignedNodes = n$;

	      if (n$) {
	        for (var i = 0; i < n$.length; i++) {
	          var n = shadyDataForNode(n$[i]);
	          n._prevAssignedSlot = n.assignedSlot; // only clear if it was previously set to this slot;
	          // this helps ensure that if the node has otherwise been distributed
	          // ignore it.

	          if (n.assignedSlot === slot) {
	            n.assignedSlot = null;
	          }
	        }
	      }
	    }
	  }, {
	    key: "_addAssignedToFlattenedNodes",
	    value: function _addAssignedToFlattenedNodes(flattened, assigned) {
	      for (var i = 0, n; i < assigned.length && (n = assigned[i]); i++) {
	        if (n.localName == 'slot') {
	          var nestedAssigned = shadyDataForNode(n).assignedNodes;

	          if (nestedAssigned && nestedAssigned.length) {
	            this._addAssignedToFlattenedNodes(flattened, nestedAssigned);
	          }
	        } else {
	          flattened.push(assigned[i]);
	        }
	      }
	    }
	  }, {
	    key: "_fireSlotChange",
	    value: function _fireSlotChange(slot) {
	      // NOTE: cannot bubble correctly here so not setting bubbles: true
	      // Safari tech preview does not bubble but chrome does
	      // Spec says it bubbles (https://dom.spec.whatwg.org/#mutation-observers)
	      slot[NATIVE_PREFIX + 'dispatchEvent'](new Event('slotchange'));
	      var slotData = shadyDataForNode(slot);

	      if (slotData.assignedSlot) {
	        this._fireSlotChange(slotData.assignedSlot);
	      }
	    } // Reify dom such that it is at its correct rendering position
	    // based on logical distribution.
	    // NOTE: here we only compose parents of <slot> elements and not the
	    // shadowRoot into the host. The latter is performend via a fast path
	    // in the `logical-mutation`.insertBefore.

	  }, {
	    key: "_compose",
	    value: function _compose() {
	      var slots = this._slotList;
	      var composeList = [];

	      for (var i = 0; i < slots.length; i++) {
	        var parent = slots[i][SHADY_PREFIX + 'parentNode'];
	        /* compose node only if:
	          (1) parent does not have a shadowRoot since shadowRoot has already
	          composed into the host
	          (2) we're not already composing it
	          [consider (n^2) but rare better than Set]
	        */

	        var parentData = shadyDataForNode(parent);

	        if (!(parentData && parentData.root) && composeList.indexOf(parent) < 0) {
	          composeList.push(parent);
	        }
	      }

	      for (var _i3 = 0; _i3 < composeList.length; _i3++) {
	        var node = composeList[_i3];
	        var targetNode = node === this ? this.host : node;

	        this._updateChildNodes(targetNode, this._composeNode(node));
	      }
	    } // Returns the list of nodes which should be rendered inside `node`.

	  }, {
	    key: "_composeNode",
	    value: function _composeNode(node) {
	      var children = [];

	      for (var n = node[SHADY_PREFIX + 'firstChild']; n; n = n[SHADY_PREFIX + 'nextSibling']) {
	        // Note: if we see a slot here, the nodes are guaranteed to need to be
	        // composed here. This is because if there is redistribution, it has
	        // already been handled by this point.
	        if (this._isInsertionPoint(n)) {
	          var flattenedNodes = shadyDataForNode(n).flattenedNodes;

	          for (var j = 0; j < flattenedNodes.length; j++) {
	            var distributedNode = flattenedNodes[j];
	            children.push(distributedNode);
	          }
	        } else {
	          children.push(n);
	        }
	      }

	      return children;
	    }
	  }, {
	    key: "_isInsertionPoint",
	    value: function _isInsertionPoint(node) {
	      return node.localName == 'slot';
	    } // Ensures that the rendered node list inside `container` is `children`.

	  }, {
	    key: "_updateChildNodes",
	    value: function _updateChildNodes(container, children) {
	      var composed = nativeChildNodesArray(container);
	      var splices = calculateSplices(children, composed); // process removals

	      for (var i = 0, d = 0, s; i < splices.length && (s = splices[i]); i++) {
	        for (var j = 0, n; j < s.removed.length && (n = s.removed[j]); j++) {
	          // check if the node is still where we expect it is before trying
	          // to remove it; this can happen if we move a node and
	          // then schedule its previous host for distribution resulting in
	          // the node being removed here.
	          if (n[NATIVE_PREFIX + 'parentNode'] === container) {
	            container[NATIVE_PREFIX + 'removeChild'](n);
	          } // TODO(sorvell): avoid the need for splicing here.


	          composed.splice(s.index + d, 1);
	        }

	        d -= s.addedCount;
	      } // process adds


	      for (var _i4 = 0, _s, next; _i4 < splices.length && (_s = splices[_i4]); _i4++) {
	        //eslint-disable-line no-redeclare
	        next = composed[_s.index];

	        for (var _j = _s.index, _n2; _j < _s.index + _s.addedCount; _j++) {
	          _n2 = children[_j];
	          container[NATIVE_PREFIX + 'insertBefore'](_n2, next);
	          composed.splice(_j, 0, _n2);
	        }
	      }
	    }
	  }, {
	    key: "_ensureSlotData",
	    value: function _ensureSlotData() {
	      this._pendingSlots = this._pendingSlots || [];
	      this._slotList = this._slotList || [];
	      this._slotMap = this._slotMap || {};
	    }
	  }, {
	    key: "_addSlots",
	    value: function _addSlots(slots) {
	      var _this$_pendingSlots;

	      this._ensureSlotData();

	      (_this$_pendingSlots = this._pendingSlots).push.apply(_this$_pendingSlots, toConsumableArray(slots));
	    }
	  }, {
	    key: "_validateSlots",
	    value: function _validateSlots() {
	      if (this._pendingSlots && this._pendingSlots.length) {
	        this._mapSlots(this._pendingSlots);

	        this._pendingSlots = [];
	      }
	    }
	    /**
	     * Adds the given slots. Slots are maintained in an dom-ordered list.
	     * In addition a map of name to slot is updated.
	     */

	  }, {
	    key: "_mapSlots",
	    value: function _mapSlots(slots) {
	      var slotNamesToSort;

	      for (var i = 0; i < slots.length; i++) {
	        var slot = slots[i]; // ensure insertionPoints's and their parents have logical dom info.
	        // save logical tree info
	        // a. for shadyRoot
	        // b. for insertion points (fallback)
	        // c. for parents of insertion points

	        recordChildNodes(slot);
	        var slotParent = slot[SHADY_PREFIX + 'parentNode'];
	        recordChildNodes(slotParent);
	        var slotParentData = shadyDataForNode(slotParent);
	        slotParentData.__childSlotCount = (slotParentData.__childSlotCount || 0) + 1;

	        var name = this._nameForSlot(slot);

	        if (this._slotMap[name]) {
	          slotNamesToSort = slotNamesToSort || {};
	          slotNamesToSort[name] = true;

	          this._slotMap[name].push(slot);
	        } else {
	          this._slotMap[name] = [slot];
	        }

	        this._slotList.push(slot);
	      }

	      if (slotNamesToSort) {
	        for (var n in slotNamesToSort) {
	          this._slotMap[n] = this._sortSlots(this._slotMap[n]);
	        }
	      }
	    }
	  }, {
	    key: "_nameForSlot",
	    value: function _nameForSlot(slot) {
	      var name = slot['name'] || slot.getAttribute('name') || CATCHALL_NAME;
	      slot.__slotName = name;
	      return name;
	    }
	    /**
	     * Slots are kept in an ordered list. Slots with the same name
	     * are sorted here by tree order.
	     */

	  }, {
	    key: "_sortSlots",
	    value: function _sortSlots(slots) {
	      // NOTE: Cannot use `compareDocumentPosition` because it's not polyfilled,
	      // but the code here could be used to polyfill the preceeding/following info
	      // in `compareDocumentPosition`.
	      return slots.sort(function (a, b) {
	        var listA = ancestorList(a);
	        var listB = ancestorList(b);

	        for (var i = 0; i < listA.length; i++) {
	          var nA = listA[i];
	          var nB = listB[i];

	          if (nA !== nB) {
	            var c$ = childNodesArray(nA[SHADY_PREFIX + 'parentNode']);
	            return c$.indexOf(nA) - c$.indexOf(nB);
	          }
	        }
	      });
	    }
	    /**
	     * Removes from tracked slot data any slots contained within `container` and
	     * then updates the tracked data (_slotList and _slotMap).
	     * Any removed slots also have their `assignedNodes` removed from comopsed dom.
	     */

	  }, {
	    key: "_removeContainedSlots",
	    value: function _removeContainedSlots(container) {
	      if (!this._slotList) {
	        return;
	      }

	      this._validateSlots();

	      var didRemove;
	      var map = this._slotMap;

	      for (var n in map) {
	        var slots = map[n];

	        for (var i = 0; i < slots.length; i++) {
	          var slot = slots[i];

	          if (contains(container, slot)) {
	            slots.splice(i, 1);

	            var x = this._slotList.indexOf(slot);

	            if (x >= 0) {
	              this._slotList.splice(x, 1);

	              var slotParentData = shadyDataForNode(slot[SHADY_PREFIX + 'parentNode']);

	              if (slotParentData && slotParentData.__childSlotCount) {
	                slotParentData.__childSlotCount--;
	              }
	            }

	            i--;

	            this._removeFlattenedNodes(slot);

	            didRemove = true;
	          }
	        }
	      }

	      return didRemove;
	    }
	  }, {
	    key: "_updateSlotName",
	    value: function _updateSlotName(slot) {
	      if (!this._slotList) {
	        return;
	      } // make sure slotMap is initialized with this slot


	      this._validateSlots();

	      var oldName = slot.__slotName;

	      var name = this._nameForSlot(slot);

	      if (name === oldName) {
	        return;
	      } // remove from existing tracking


	      var slots = this._slotMap[oldName];
	      var i = slots.indexOf(slot);

	      if (i >= 0) {
	        slots.splice(i, 1);
	      } // add to new location and sort if nedessary


	      var list = this._slotMap[name] || (this._slotMap[name] = []);
	      list.push(slot);

	      if (list.length > 1) {
	        this._slotMap[name] = this._sortSlots(list);
	      }
	    }
	  }, {
	    key: "_removeFlattenedNodes",
	    value: function _removeFlattenedNodes(slot) {
	      var data = shadyDataForNode(slot);
	      var n$ = data.flattenedNodes;

	      if (n$) {
	        for (var i = 0; i < n$.length; i++) {
	          var node = n$[i];
	          var parent = node[NATIVE_PREFIX + 'parentNode'];

	          if (parent) {
	            parent[NATIVE_PREFIX + 'removeChild'](node);
	          }
	        }
	      }

	      data.flattenedNodes = [];
	      data.assignedNodes = [];
	    }
	  }, {
	    key: "_hasInsertionPoint",
	    value: function _hasInsertionPoint() {
	      this._validateSlots();

	      return Boolean(this._slotList && this._slotList.length);
	    }
	  }]);

	  return ShadyRoot;
	}();

	patchShadyRoot(ShadyRoot.prototype);
	/**
	  Implements a pared down version of ShadowDOM's scoping, which is easy to
	  polyfill across browsers.
	*/

	var attachShadow = function attachShadow(host, options) {
	  if (!host) {
	    throw new Error('Must provide a host.');
	  }

	  if (!options) {
	    throw new Error('Not enough arguments.');
	  }

	  var root; // Optimization for booting up a shadowRoot from a fragment rather than
	  // creating one.

	  if (options['shadyUpgradeFragment'] && canUpgrade()) {
	    root = options['shadyUpgradeFragment'];
	    root.__proto__ = ShadowRoot.prototype;

	    root._init(host, options);

	    recordChildNodes(root, root); // Note: qsa is native when used with noPatch.

	    /** @type {?NodeList<Element>} */

	    var slotsAdded = root['__noInsertionPoint'] ? null : root.querySelectorAll('slot'); // Reset scoping information so normal scoing rules apply after this.

	    root['__noInsertionPoint'] = undefined; // if a slot is added, must render containing root.

	    if (slotsAdded && slotsAdded.length) {
	      root._addSlots(slotsAdded);

	      root._asyncRender();
	    }
	    /** @type {ShadowRoot} */


	    root.host[NATIVE_PREFIX + 'appendChild'](root);
	  } else {
	    root = new ShadyRoot(ShadyRootConstructionToken, host, options);
	  }

	  return root;
	}; // Mitigate connect/disconnect spam by wrapping custom element classes.

	if (window['customElements'] && settings.inUse && !settings['preferPerformance']) {
	  // process connect/disconnect after roots have rendered to avoid
	  // issues with reaction stack.
	  var connectMap = new Map();

	  rootRendered = function rootRendered() {
	    // allow elements to connect
	    // save map state (without needing polyfills on IE11)
	    var r = [];
	    connectMap.forEach(function (v, k) {
	      r.push([k, v]);
	    });
	    connectMap.clear();

	    for (var i = 0; i < r.length; i++) {
	      var e = r[i][0],
	          value = r[i][1];

	      if (value) {
	        e['__shadydom_connectedCallback']();
	      } else {
	        e['__shadydom_disconnectedCallback']();
	      }
	    }
	  }; // Document is in loading state and flag is set (deferConnectionCallbacks)
	  // so process connection stack when `readystatechange` fires.


	  if (isRendering) {
	    document.addEventListener('readystatechange', function () {
	      isRendering = false;
	      rootRendered();
	    }, {
	      once: true
	    });
	  }
	  /*
	   * (1) elements can only be connected/disconnected if they are in the expected
	   * state.
	   * (2) never run connect/disconnect during rendering to avoid reaction stack issues.
	   */


	  var ManageConnect = function ManageConnect(base, connected, disconnected) {
	    var counter = 0;
	    var connectFlag = "__isConnected".concat(counter++);

	    if (connected || disconnected) {
	      /** @this {!HTMLElement} */
	      base.prototype.connectedCallback = base.prototype['__shadydom_connectedCallback'] = function () {
	        // if rendering defer connected
	        // otherwise connect only if we haven't already
	        if (isRendering) {
	          connectMap.set(this, true);
	        } else if (!this[connectFlag]) {
	          this[connectFlag] = true;

	          if (connected) {
	            connected.call(this);
	          }
	        }
	      };
	      /** @this {!HTMLElement} */


	      base.prototype.disconnectedCallback = base.prototype['__shadydom_disconnectedCallback'] = function () {
	        // if rendering, cancel a pending connection and queue disconnect,
	        // otherwise disconnect only if a connection has been allowed
	        if (isRendering) {
	          // This is necessary only because calling removeChild
	          // on a node that requires distribution leaves it in the DOM tree
	          // until distribution.
	          // NOTE: remember this is checking the patched isConnected to determine
	          // if the node is in the logical tree.
	          if (!this.isConnected) {
	            connectMap.set(this, false);
	          }
	        } else if (this[connectFlag]) {
	          this[connectFlag] = false;

	          if (disconnected) {
	            disconnected.call(this);
	          }
	        }
	      };
	    }

	    return base;
	  };

	  var originalDefine = window['customElements']['define'];

	  var define = function define(name, constructor) {
	    var connected = constructor.prototype.connectedCallback;
	    var disconnected = constructor.prototype.disconnectedCallback;
	    originalDefine.call(window['customElements'], name, ManageConnect(constructor, connected, disconnected)); // unpatch connected/disconnected on class; custom elements tears this off
	    // so the patch is maintained, but if the user calls these methods for
	    // e.g. testing, they will be as expected.

	    constructor.prototype.connectedCallback = connected;
	    constructor.prototype.disconnectedCallback = disconnected;
	  }; // Note, it would be better to only patch the CustomElementRegistry.prototype,
	  // but ShadyCSS patches define directly.


	  window.customElements.define = define; // Still patch the registry directly since Safari 10 loses the patch
	  // unless this is done.

	  Object.defineProperty(window['CustomElementRegistry'].prototype, 'define', {
	    value: define,
	    configurable: true
	  });
	}
	/** @return {!ShadyRoot|undefined} */


	var ownerShadyRootForNode = function ownerShadyRootForNode(node) {
	  var root = node[SHADY_PREFIX + 'getRootNode']();

	  if (isShadyRoot(root)) {
	    return root;
	  }
	};

	/** @implements {IWrapper} */

	var Wrapper =
	/*#__PURE__*/
	function () {
	  /** @param {!Node} node */
	  function Wrapper(node) {
	    classCallCheck(this, Wrapper);

	    this.node = node;
	  } // node


	  createClass(Wrapper, [{
	    key: "addEventListener",
	    value: function addEventListener(name, fn, options) {
	      return this.node[SHADY_PREFIX + 'addEventListener'](name, fn, options);
	    }
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener(name, fn, options) {
	      return this.node[SHADY_PREFIX + 'removeEventListener'](name, fn, options);
	    }
	  }, {
	    key: "appendChild",
	    value: function appendChild(node) {
	      return this.node[SHADY_PREFIX + 'appendChild'](node);
	    }
	  }, {
	    key: "insertBefore",
	    value: function insertBefore(node, ref_node) {
	      return this.node[SHADY_PREFIX + 'insertBefore'](node, ref_node);
	    }
	  }, {
	    key: "removeChild",
	    value: function removeChild(node) {
	      return this.node[SHADY_PREFIX + 'removeChild'](node);
	    }
	  }, {
	    key: "replaceChild",
	    value: function replaceChild(node, ref_node) {
	      return this.node[SHADY_PREFIX + 'replaceChild'](node, ref_node);
	    }
	  }, {
	    key: "cloneNode",
	    value: function cloneNode(deep) {
	      return this.node[SHADY_PREFIX + 'cloneNode'](deep);
	    }
	  }, {
	    key: "getRootNode",
	    value: function getRootNode(options) {
	      return this.node[SHADY_PREFIX + 'getRootNode'](options);
	    }
	  }, {
	    key: "contains",
	    value: function contains(node) {
	      return this.node[SHADY_PREFIX + 'contains'](node);
	    }
	  }, {
	    key: "dispatchEvent",
	    value: function dispatchEvent(event) {
	      return this.node[SHADY_PREFIX + 'dispatchEvent'](event);
	    } // element

	  }, {
	    key: "setAttribute",
	    value: function setAttribute(name, value) {
	      this.node[SHADY_PREFIX + 'setAttribute'](name, value);
	    } // NOTE: not needed, just here for balance

	  }, {
	    key: "getAttribute",
	    value: function getAttribute(name) {
	      return this.node[NATIVE_PREFIX + 'getAttribute'](name);
	    } // NOTE: not needed, just here for balance

	  }, {
	    key: "hasAttribute",
	    value: function hasAttribute(name) {
	      return this.node[NATIVE_PREFIX + 'hasAttribute'](name);
	    }
	  }, {
	    key: "removeAttribute",
	    value: function removeAttribute(name) {
	      this.node[SHADY_PREFIX + 'removeAttribute'](name);
	    }
	  }, {
	    key: "attachShadow",
	    value: function attachShadow(options) {
	      return this.node[SHADY_PREFIX + 'attachShadow'](options);
	    }
	    /** @return {!Node|undefined} */

	  }, {
	    key: "focus",
	    // NOTE: not needed, just here for balance

	    /** @override */
	    value: function focus() {
	      this.node[NATIVE_PREFIX + 'focus']();
	    }
	  }, {
	    key: "blur",
	    value: function blur() {
	      this.node[SHADY_PREFIX + 'blur']();
	    } // document

	  }, {
	    key: "importNode",
	    value: function importNode(node, deep) {
	      if (this.node.nodeType === Node.DOCUMENT_NODE) {
	        return this.node[SHADY_PREFIX + 'importNode'](node, deep);
	      }
	    }
	  }, {
	    key: "getElementById",
	    value: function getElementById(id) {
	      if (this.node.nodeType === Node.DOCUMENT_NODE) {
	        return this.node[SHADY_PREFIX + 'getElementById'](id);
	      }
	    } // query

	  }, {
	    key: "querySelector",
	    value: function querySelector(selector) {
	      return this.node[SHADY_PREFIX + 'querySelector'](selector);
	    }
	  }, {
	    key: "querySelectorAll",
	    value: function querySelectorAll(selector, useNative) {
	      return this.node[SHADY_PREFIX + 'querySelectorAll'](selector, useNative);
	    } // slot

	  }, {
	    key: "assignedNodes",
	    value: function assignedNodes(options) {
	      if (this.node.localName === 'slot') {
	        return this.node[SHADY_PREFIX + 'assignedNodes'](options);
	      }
	    }
	  }, {
	    key: "activeElement",
	    get: function get() {
	      if (isShadyRoot(this.node) || this.node.nodeType === Node.DOCUMENT_NODE) {
	        var e = this.node[SHADY_PREFIX + 'activeElement'];
	        return e;
	      }
	    }
	    /**
	     * Installed for compatibility with browsers (older Chrome/Safari) that do
	     * not have a configurable `activeElement` accessor. Enables noPatch and
	     * patch mode both to consistently use ShadyDOM.wrap(document)._activeElement.
	     * @override
	     * @return {!Node|undefined}
	     */

	  }, {
	    key: "_activeElement",
	    get: function get() {
	      return this.activeElement;
	    }
	  }, {
	    key: "host",
	    get: function get() {
	      if (isShadyRoot(this.node)) {
	        return (
	          /** @type {!ShadowRoot} */
	          this.node.host
	        );
	      }
	    }
	  }, {
	    key: "parentNode",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'parentNode'];
	    }
	  }, {
	    key: "firstChild",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'firstChild'];
	    }
	  }, {
	    key: "lastChild",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'lastChild'];
	    }
	  }, {
	    key: "nextSibling",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'nextSibling'];
	    }
	  }, {
	    key: "previousSibling",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'previousSibling'];
	    }
	  }, {
	    key: "childNodes",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'childNodes'];
	    }
	  }, {
	    key: "parentElement",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'parentElement'];
	    }
	  }, {
	    key: "firstElementChild",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'firstElementChild'];
	    }
	  }, {
	    key: "lastElementChild",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'lastElementChild'];
	    }
	  }, {
	    key: "nextElementSibling",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'nextElementSibling'];
	    }
	  }, {
	    key: "previousElementSibling",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'previousElementSibling'];
	    }
	  }, {
	    key: "children",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'children'];
	    }
	  }, {
	    key: "childElementCount",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'childElementCount'];
	    }
	  }, {
	    key: "shadowRoot",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'shadowRoot'];
	    }
	  }, {
	    key: "assignedSlot",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'assignedSlot'];
	    }
	  }, {
	    key: "isConnected",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'isConnected'];
	    }
	  }, {
	    key: "innerHTML",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'innerHTML'];
	    },
	    set: function set(value) {
	      this.node[SHADY_PREFIX + 'innerHTML'] = value;
	    }
	  }, {
	    key: "textContent",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'textContent'];
	    },
	    set: function set(value) {
	      this.node[SHADY_PREFIX + 'textContent'] = value;
	    }
	  }, {
	    key: "slot",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'slot'];
	    },
	    set: function set(value) {
	      this.node[SHADY_PREFIX + 'slot'] = value;
	    }
	  }, {
	    key: "className",
	    get: function get() {
	      return this.node[SHADY_PREFIX + 'className'];
	    },
	    set: function set(value) {
	      return this.node[SHADY_PREFIX + 'className'] = value;
	    }
	  }]);

	  return Wrapper;
	}();

	eventPropertyNames.forEach(function (name) {
	  Object.defineProperty(Wrapper.prototype, name, {
	    /** @this {Wrapper} */
	    get: function get() {
	      return this.node[SHADY_PREFIX + name];
	    },

	    /** @this {Wrapper} */
	    set: function set(value) {
	      this.node[SHADY_PREFIX + name] = value;
	    },
	    configurable: true
	  });
	});
	var wrapperMap = new WeakMap();
	function wrap$1(obj) {
	  if (isShadyRoot(obj) || obj instanceof Wrapper) {
	    return obj;
	  }

	  var wrapper = wrapperMap.get(obj);

	  if (!wrapper) {
	    wrapper = new Wrapper(obj);
	    wrapperMap.set(obj, wrapper);
	  }

	  return wrapper;
	}

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var EventTargetPatches = getOwnPropertyDescriptors({
	  /** @this {Node} */
	  dispatchEvent: function dispatchEvent(event) {
	    flush();
	    return this[NATIVE_PREFIX + 'dispatchEvent'](event);
	  },
	  addEventListener: addEventListener,
	  removeEventListener: removeEventListener
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var SlotablePatches = getOwnPropertyDescriptors({
	  /** @this {Node} */
	  get assignedSlot() {
	    // Force any parent's shadowRoot to flush so that distribution occurs
	    // and this node has an assignedSlot.
	    var parent = this[SHADY_PREFIX + 'parentNode'];
	    var ownerRoot = parent && parent[SHADY_PREFIX + 'shadowRoot'];

	    if (ownerRoot) {
	      ownerRoot._render();
	    }

	    var nodeData = shadyDataForNode(this);
	    return nodeData && nodeData.assignedSlot || null;
	  }

	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var doc$1 = window.document;
	/**
	 * Should be called whenever an attribute changes. If the `slot` attribute
	 * changes, provokes rendering if necessary. If a `<slot>` element's `name`
	 * attribute changes, updates the root's slot map and renders.
	 * @param {Node} node
	 * @param {string} name
	 */

	function distributeAttributeChange(node, name) {
	  if (name === 'slot') {
	    var parent = node[SHADY_PREFIX + 'parentNode'];

	    if (hasShadowRootWithSlot(parent)) {
	      shadyDataForNode(parent).root._asyncRender();
	    }
	  } else if (node.localName === 'slot' && name === 'name') {
	    var root = ownerShadyRootForNode(node);

	    if (root) {
	      root._updateSlotName(node);

	      root._asyncRender();
	    }
	  }
	}

	var ElementPatches = getOwnPropertyDescriptors({
	  /** @this {Element} */
	  get previousElementSibling() {
	    var nodeData = shadyDataForNode(this);

	    if (nodeData && nodeData.previousSibling !== undefined) {
	      var n = this[SHADY_PREFIX + 'previousSibling'];

	      while (n && n.nodeType !== Node.ELEMENT_NODE) {
	        n = n[SHADY_PREFIX + 'previousSibling'];
	      }

	      return n;
	    } else {
	      return this[NATIVE_PREFIX + 'previousElementSibling'];
	    }
	  },

	  /** @this {Element} */
	  get nextElementSibling() {
	    var nodeData = shadyDataForNode(this);

	    if (nodeData && nodeData.nextSibling !== undefined) {
	      var n = this[SHADY_PREFIX + 'nextSibling'];

	      while (n && n.nodeType !== Node.ELEMENT_NODE) {
	        n = n[SHADY_PREFIX + 'nextSibling'];
	      }

	      return n;
	    } else {
	      return this[NATIVE_PREFIX + 'nextElementSibling'];
	    }
	  },

	  /** @this {Element} */
	  get slot() {
	    return this.getAttribute('slot');
	  },

	  /** @this {Element} */
	  set slot(value) {
	    this[SHADY_PREFIX + 'setAttribute']('slot', value);
	  },

	  // Note: Can be patched on element prototype on all browsers.
	  // Must be patched on instance on browsers that support native Shadow DOM
	  // but do not have builtin accessors (old Chrome).

	  /** @this {Element} */
	  get shadowRoot() {
	    var nodeData = shadyDataForNode(this);
	    return nodeData && nodeData.publicRoot || null;
	  },

	  /** @this {Element} */
	  get className() {
	    return this.getAttribute('class') || '';
	  },

	  /**
	   * @this {Element}
	   * @param {string} value
	   */
	  set className(value) {
	    this[SHADY_PREFIX + 'setAttribute']('class', value);
	  },

	  /**
	   * @this {Element}
	   * @param {string} attr
	   * @param {string} value
	   */
	  setAttribute: function setAttribute(attr, value) {
	    if (this.ownerDocument !== doc$1) {
	      this[NATIVE_PREFIX + 'setAttribute'](attr, value);
	    } else if (!scopeClassAttribute(this, attr, value)) {
	      this[NATIVE_PREFIX + 'setAttribute'](attr, value);
	      distributeAttributeChange(this, attr);
	    }
	  },

	  /**
	   * @this {Element}
	   * @param {string} attr
	   */
	  removeAttribute: function removeAttribute(attr) {
	    this[NATIVE_PREFIX + 'removeAttribute'](attr);
	    distributeAttributeChange(this, attr);
	  },

	  /**
	   * @this {Element}
	   * @param {!{mode: string}} options
	   */
	  attachShadow: function attachShadow$1(options) {
	    return attachShadow(this, options);
	  }
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var HTMLElementPatches = getOwnPropertyDescriptors({
	  /** @this {HTMLElement} */
	  blur: function blur() {
	    var nodeData = shadyDataForNode(this);
	    var root = nodeData && nodeData.root;
	    var shadowActive = root && root.activeElement;

	    if (shadowActive) {
	      shadowActive[SHADY_PREFIX + 'blur']();
	    } else {
	      this[NATIVE_PREFIX + 'blur']();
	    }
	  }
	});
	eventPropertyNames.forEach(function (property) {
	  HTMLElementPatches[property] = {
	    /** @this {HTMLElement} */
	    set: function set(fn) {
	      var shadyData = ensureShadyDataForNode(this);
	      var eventName = property.substring(2);

	      if (!shadyData.__onCallbackListeners) {
	        shadyData.__onCallbackListeners = {};
	      }

	      shadyData.__onCallbackListeners[property] && this.removeEventListener(eventName, shadyData.__onCallbackListeners[property]);
	      this[SHADY_PREFIX + 'addEventListener'](eventName, fn);
	      shadyData.__onCallbackListeners[property] = fn;
	    },

	    /** @this {HTMLElement} */
	    get: function get() {
	      var shadyData = shadyDataForNode(this);
	      return shadyData && shadyData.__onCallbackListeners && shadyData.__onCallbackListeners[property];
	    },
	    configurable: true
	  };
	});

	var SlotPatches = getOwnPropertyDescriptors({
	  /**
	   * @this {HTMLSlotElement}
	   * @param {Object=} options
	   */
	  assignedNodes: function assignedNodes(options) {
	    if (this.localName === 'slot') {
	      // Force any containing shadowRoot to flush so that distribution occurs
	      // and this node has assignedNodes.
	      var root = this[SHADY_PREFIX + 'getRootNode']();

	      if (root && isShadyRoot(root)) {
	        root._render();
	      }

	      var nodeData = shadyDataForNode(this);
	      return nodeData ? (options && options.flatten ? nodeData.flattenedNodes : nodeData.assignedNodes) || [] : [];
	    }
	  },

	  /**
	   * @this {HTMLSlotElement}
	   * @param {string} type
	   * @param {Function} fn
	   * @param {Object|boolean=} optionsOrCapture
	   */
	  addEventListener: function addEventListener$1(type, fn, optionsOrCapture) {
	    // NOTE, check if this is a `slot` because these patches are installed on
	    // Element where browsers don't have `<slot>`
	    if (this.localName !== 'slot' || type === 'slotchange') {
	      addEventListener.call(this, type, fn, optionsOrCapture);
	    } else {
	      if (_typeof_1(optionsOrCapture) !== 'object') {
	        optionsOrCapture = {
	          capture: Boolean(optionsOrCapture)
	        };
	      }

	      var parent = this[SHADY_PREFIX + 'parentNode'];

	      if (!parent) {
	        throw new Error('ShadyDOM cannot attach event to slot unless it has a `parentNode`');
	      }

	      optionsOrCapture.__shadyTarget = this;
	      parent[SHADY_PREFIX + 'addEventListener'](type, fn, optionsOrCapture);
	    }
	  },

	  /**
	   * @this {HTMLSlotElement}
	   * @param {string} type
	   * @param {Function} fn
	   * @param {Object|boolean=} optionsOrCapture
	   */
	  removeEventListener: function removeEventListener$1(type, fn, optionsOrCapture) {
	    // NOTE, check if this is a `slot` because these patches are installed on
	    // Element where browsers don't have `<slot>`
	    if (this.localName !== 'slot' || type === 'slotchange') {
	      removeEventListener.call(this, type, fn, optionsOrCapture);
	    } else {
	      if (_typeof_1(optionsOrCapture) !== 'object') {
	        optionsOrCapture = {
	          capture: Boolean(optionsOrCapture)
	        };
	      }

	      var parent = this[SHADY_PREFIX + 'parentNode'];

	      if (!parent) {
	        throw new Error('ShadyDOM cannot attach event to slot unless it has a `parentNode`');
	      }

	      optionsOrCapture.__shadyTarget = this;
	      parent[SHADY_PREFIX + 'removeEventListener'](type, fn, optionsOrCapture);
	    }
	  }
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var doc$2 = window.document;
	var DocumentPatches = getOwnPropertyDescriptors({
	  // note: Though not technically correct, we fast path `importNode`
	  // when called on a node not owned by the main document.
	  // This allows, for example, elements that cannot
	  // contain custom elements and are therefore not likely to contain shadowRoots
	  // to cloned natively. This is a fairly significant performance win.

	  /**
	   * @this {Document}
	   * @param {Node} node
	   * @param {boolean} deep
	   */
	  importNode: function importNode(node, deep) {
	    // A template element normally has no children with shadowRoots, so make
	    // sure we always make a deep copy to correctly construct the template.content
	    if (node.ownerDocument !== doc$2 || node.localName === 'template') {
	      return this[NATIVE_PREFIX + 'importNode'](node, deep);
	    }

	    var n = this[NATIVE_PREFIX + 'importNode'](node, false);

	    if (deep) {
	      for (var c = node[SHADY_PREFIX + 'firstChild'], nc; c; c = c[SHADY_PREFIX + 'nextSibling']) {
	        nc = this[SHADY_PREFIX + 'importNode'](c, true);
	        n[SHADY_PREFIX + 'appendChild'](nc);
	      }
	    }

	    return n;
	  }
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var WindowPatches = getOwnPropertyDescriptors({
	  // NOTE: ensure these methods are bound to `window` so that `this` is correct
	  // when called directly from global context without a receiver; e.g.
	  // `addEventListener(...)`.
	  addEventListener: addEventListener.bind(window),
	  removeEventListener: removeEventListener.bind(window)
	});

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	var NonStandardHTMLElement = {};

	if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'parentElement')) {
	  NonStandardHTMLElement.parentElement = NodePatches.parentElement;
	}

	if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'contains')) {
	  NonStandardHTMLElement.contains = NodePatches.contains;
	}

	if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'children')) {
	  NonStandardHTMLElement.children = ParentNodePatches.children;
	}

	if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'innerHTML')) {
	  NonStandardHTMLElement.innerHTML = ElementOrShadowRootPatches.innerHTML;
	}

	if (Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'className')) {
	  NonStandardHTMLElement.className = ElementPatches.className;
	} // Avoid patching `innerHTML` if it does not exist on Element (IE)
	// and we can patch accessors (hasDescriptors).


	var ElementShouldHaveInnerHTML = !settings.hasDescriptors || 'innerHTML' in Element.prototype; // setup patching

	var patchMap = {
	  EventTarget: [EventTargetPatches],
	  Node: [NodePatches, !window.EventTarget ? EventTargetPatches : null],
	  Text: [SlotablePatches],
	  Element: [ElementPatches, ParentNodePatches, SlotablePatches, ElementShouldHaveInnerHTML ? ElementOrShadowRootPatches : null, !window.HTMLSlotElement ? SlotPatches : null],
	  HTMLElement: [HTMLElementPatches, NonStandardHTMLElement],
	  HTMLSlotElement: [SlotPatches],
	  DocumentFragment: [ParentNodeDocumentOrFragmentPatches, DocumentOrFragmentPatches],
	  Document: [DocumentPatches, ParentNodeDocumentOrFragmentPatches, DocumentOrFragmentPatches, DocumentOrShadowRootPatches],
	  Window: [WindowPatches]
	};

	var getPatchPrototype = function getPatchPrototype(name) {
	  return window[name] && window[name].prototype;
	}; // Note, must avoid patching accessors on prototypes when descriptors are not correct
	// because the CustomElements polyfill checks if these exist before patching instances.
	// CustomElements polyfill *only* cares about these accessors.


	var disallowedNativePatches = settings.hasDescriptors ? null : ['innerHTML', 'textContent'];
	/** @param {string=} prefix */

	var applyPatches = function applyPatches(prefix) {
	  var disallowed = prefix ? null : disallowedNativePatches;

	  var _loop = function _loop(p) {
	    var proto = getPatchPrototype(p);
	    patchMap[p].forEach(function (patch) {
	      return proto && patch && patchProperties(proto, patch, prefix, disallowed);
	    });
	  };

	  for (var p in patchMap) {
	    _loop(p);
	  }
	};
	var addShadyPrefixedProperties = function addShadyPrefixedProperties() {
	  // perform shady patches
	  applyPatches(SHADY_PREFIX); // install `_activeElement` because some browsers (older Chrome/Safari) do not have
	  // a 'configurable' `activeElement` accesssor.

	  var descriptor = DocumentOrShadowRootPatches.activeElement;
	  Object.defineProperty(document, '_activeElement', descriptor); // On Window, we're patching `addEventListener` which is a weird auto-bound
	  // property that is not directly on the Window prototype.

	  patchProperties(Window.prototype, WindowPatches, SHADY_PREFIX);
	};

	/**
	@license
	Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	if (settings.inUse) {
	  var ShadyDOM = {
	    // TODO(sorvell): remove when Polymer does not depend on this.
	    'inUse': settings.inUse,
	    // NOTE: old browsers without prototype accessors (very old Chrome
	    // and Safari) need manually patched accessors to properly set
	    // `innerHTML` and `textContent` when an element is:
	    // (1) inside a shadowRoot
	    // (2) does not have special (slot) children itself
	    // (3) and setting the property needs to provoke distribution (because
	    // a nested slot is added/removed)
	    'patch': function patch(node) {
	      patchInsideElementAccessors(node);
	      patchOutsideElementAccessors(node);
	      return node;
	    },
	    'isShadyRoot': isShadyRoot,
	    'enqueue': enqueue,
	    'flush': flush,
	    'flushInitial': function flushInitial(root) {
	      root._flushInitial();
	    },
	    'settings': settings,
	    'filterMutations': filterMutations,
	    'observeChildren': observeChildren,
	    'unobserveChildren': unobserveChildren,
	    // Set to true to defer native custom elements connection until the
	    // document has fully parsed. This enables custom elements that create
	    // shadowRoots to be defined while the document is loading. Elements
	    // customized as they are created by the parser will successfully
	    // render with this flag on.
	    'deferConnectionCallbacks': settings['deferConnectionCallbacks'],
	    // Set to true to speed up the polyfill slightly at the cost of correctness
	    // * does not patch querySelector/All on Document or DocumentFragment
	    // * does not wrap connected/disconnected callbacks to de-dup these
	    // when using native customElements
	    // * does not wait to process children of elements with shadowRoots
	    // meaning shadowRoots should not be created while an element is parsing
	    // (e.g. if a custom element that creates a shadowRoot is defined before
	    // a candidate element in the document below it.
	    'preferPerformance': settings['preferPerformance'],
	    // Integration point with ShadyCSS to disable styling MutationObserver,
	    // as ShadyDOM will now handle dynamic scoping.
	    'handlesDynamicScoping': true,
	    'wrap': settings.noPatch ? wrap$1 : function (n) {
	      return n;
	    },
	    'Wrapper': Wrapper,
	    'composedPath': composedPath,
	    // Set to true to avoid patching regular platform property names. When set,
	    // Shadow DOM compatible behavior is only available when accessing DOM
	    // API using `ShadyDOM.wrap`, e.g. `ShadyDOM.wrap(element).shadowRoot`.
	    // This setting provides a small performance boost, but requires all DOM API
	    // access that requires Shadow DOM behavior to be proxied via `ShadyDOM.wrap`.
	    'noPatch': settings.noPatch,
	    'nativeMethods': nativeMethods,
	    'nativeTree': nativeTree
	  };
	  window['ShadyDOM'] = ShadyDOM; // Modifies native prototypes for Node, Element, etc. to
	  // make native platform behavior available at prefixed names, e.g.
	  // `utils.NATIVE_PREFIX + 'firstChild'` or `__shady_native_firstChild`.
	  // This allows the standard names to be safely patched while retaining the
	  // ability for native behavior to be used. This polyfill manipulates DOM
	  // by using this saved native behavior.
	  // Note, some browsers do not have proper element descriptors for
	  // accessors; in this case, native behavior for these accessors is simulated
	  // via a TreeWalker.

	  addNativePrefixedProperties(); // Modifies native prototypes for Node, Element, etc. to make ShadowDOM
	  // behavior available at prefixed names, e.g.
	  // `utils.SHADY_PREFIX + 'firstChild` or `__shady_firstChild`. This is done
	  // so this polyfill can perform Shadow DOM style DOM manipulation.
	  // Because patching normal platform property names is optional, these prefixed
	  // names are used internally.

	  addShadyPrefixedProperties(); // Modifies native prototypes for Node, Element, etc. to patch
	  // regular platform property names to have Shadow DOM compatible API behavior.
	  // This applies the utils.SHADY_PREFIX behavior to normal names. For example,
	  // if `noPatch` is not set, then `el.__shady_firstChild` is equivalent to
	  // `el.firstChild`.
	  // NOTE, on older browsers (old Chrome/Safari) native accessors cannot be
	  // patched on prototypes (e.g. Node.prototype.firstChild cannot be modified).
	  // On these browsers, instance level patching is performed where needed; this
	  // instance patching is only done when `noPatch` is *not* set.

	  if (!settings.noPatch) {
	    applyPatches(); // Patch click event behavior only if we're patching

	    patchClick();
	  } // For simplicity, patch events unconditionally.
	  // Patches the event system to have Shadow DOM compatible behavior (e.g.
	  // event retargeting). When `noPatch` is set, retargeting is only available
	  // when adding event listeners and dispatching events via `ShadyDOM.wrap`
	  // (e.g. `ShadyDOM.wrap(element).addEventListener(...)`).


	  patchEvents();
	  window.ShadowRoot =
	  /** @type {function(new:ShadowRoot)} */
	  ShadyRoot;
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	var reservedTagList = new Set(['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph']);
	/**
	 * @param {string} localName
	 * @returns {boolean}
	 */

	function isValidCustomElementName(localName) {
	  var reserved = reservedTagList.has(localName);
	  var validForm = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(localName);
	  return !reserved && validForm;
	}
	/**
	 * @param {!Node} node
	 * @return {boolean}
	 */

	function isConnected(node) {
	  // Use `Node#isConnected`, if defined.
	  var nativeValue = node.isConnected;

	  if (nativeValue !== undefined) {
	    return nativeValue;
	  }
	  /** @type {?Node|undefined} */


	  var current = node;

	  while (current && !(current.__CE_isImportDocument || current instanceof Document)) {
	    current = current.parentNode || (window.ShadowRoot && current instanceof ShadowRoot ? current.host : undefined);
	  }

	  return !!(current && (current.__CE_isImportDocument || current instanceof Document));
	}
	/**
	 * @param {!Node} root
	 * @param {!Node} start
	 * @return {?Node}
	 */

	function nextSiblingOrAncestorSibling(root, start) {
	  var node = start;

	  while (node && node !== root && !node.nextSibling) {
	    node = node.parentNode;
	  }

	  return !node || node === root ? null : node.nextSibling;
	}
	/**
	 * @param {!Node} root
	 * @param {!Node} start
	 * @return {?Node}
	 */


	function nextNode(root, start) {
	  return start.firstChild ? start.firstChild : nextSiblingOrAncestorSibling(root, start);
	}
	/**
	 * @param {!Node} root
	 * @param {!function(!Element)} callback
	 * @param {!Set<Node>=} visitedImports
	 */


	function walkDeepDescendantElements(root, callback) {
	  var visitedImports = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();
	  var node = root;

	  while (node) {
	    if (node.nodeType === Node.ELEMENT_NODE) {
	      var element =
	      /** @type {!Element} */
	      node;
	      callback(element);
	      var localName = element.localName;

	      if (localName === 'link' && element.getAttribute('rel') === 'import') {
	        // If this import (polyfilled or not) has it's root node available,
	        // walk it.
	        var importNode =
	        /** @type {!Node} */
	        element.import;

	        if (importNode instanceof Node && !visitedImports.has(importNode)) {
	          // Prevent multiple walks of the same import root.
	          visitedImports.add(importNode);

	          for (var child = importNode.firstChild; child; child = child.nextSibling) {
	            walkDeepDescendantElements(child, callback, visitedImports);
	          }
	        } // Ignore descendants of import links to prevent attempting to walk the
	        // elements created by the HTML Imports polyfill that we just walked
	        // above.


	        node = nextSiblingOrAncestorSibling(root, element);
	        continue;
	      } else if (localName === 'template') {
	        // Ignore descendants of templates. There shouldn't be any descendants
	        // because they will be moved into `.content` during construction in
	        // browsers that support template but, in case they exist and are still
	        // waiting to be moved by a polyfill, they will be ignored.
	        node = nextSiblingOrAncestorSibling(root, element);
	        continue;
	      } // Walk shadow roots.


	      var shadowRoot = element.__CE_shadowRoot;

	      if (shadowRoot) {
	        for (var _child = shadowRoot.firstChild; _child; _child = _child.nextSibling) {
	          walkDeepDescendantElements(_child, callback, visitedImports);
	        }
	      }
	    }

	    node = nextNode(root, node);
	  }
	}
	/**
	 * Used to suppress Closure's "Modifying the prototype is only allowed if the
	 * constructor is in the same scope" warning without using
	 * `@suppress {newCheckTypes, duplicate}` because `newCheckTypes` is too broad.
	 *
	 * @param {!Object} destination
	 * @param {string} name
	 * @param {*} value
	 */

	function setPropertyUnchecked(destination, name, value) {
	  destination[name] = value;
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	/**
	 * @enum {number}
	 */
	var CustomElementState = {
	  custom: 1,
	  failed: 2
	};

	var CustomElementInternals =
	/*#__PURE__*/
	function () {
	  function CustomElementInternals() {
	    classCallCheck(this, CustomElementInternals);

	    /** @type {!Map<string, !CustomElementDefinition>} */
	    this._localNameToDefinition = new Map();
	    /** @type {!Map<!Function, !CustomElementDefinition>} */

	    this._constructorToDefinition = new Map();
	    /** @type {!Array<!function(!Node)>} */

	    this._patchesNode = [];
	    /** @type {!Array<!function(!Element)>} */

	    this._patchesElement = [];
	    /** @type {boolean} */

	    this._hasPatches = false;
	  }
	  /**
	   * @param {string} localName
	   * @param {!CustomElementDefinition} definition
	   */


	  createClass(CustomElementInternals, [{
	    key: "setDefinition",
	    value: function setDefinition(localName, definition) {
	      this._localNameToDefinition.set(localName, definition);

	      this._constructorToDefinition.set(definition.constructorFunction, definition);
	    }
	    /**
	     * @param {string} localName
	     * @return {!CustomElementDefinition|undefined}
	     */

	  }, {
	    key: "localNameToDefinition",
	    value: function localNameToDefinition(localName) {
	      return this._localNameToDefinition.get(localName);
	    }
	    /**
	     * @param {!Function} constructor
	     * @return {!CustomElementDefinition|undefined}
	     */

	  }, {
	    key: "constructorToDefinition",
	    value: function constructorToDefinition(constructor) {
	      return this._constructorToDefinition.get(constructor);
	    }
	    /**
	     * @param {!function(!Node)} patch
	     */

	  }, {
	    key: "addNodePatch",
	    value: function addNodePatch(patch) {
	      this._hasPatches = true;

	      this._patchesNode.push(patch);
	    }
	    /**
	     * @param {!function(!Element)} patch
	     */

	  }, {
	    key: "addElementPatch",
	    value: function addElementPatch(patch) {
	      this._hasPatches = true;

	      this._patchesElement.push(patch);
	    }
	    /**
	     * @param {!Node} node
	     */

	  }, {
	    key: "patchTree",
	    value: function patchTree(node) {
	      var _this = this;

	      if (!this._hasPatches) return;
	      walkDeepDescendantElements(node, function (element) {
	        return _this.patchElement(element);
	      });
	    }
	    /**
	     * @param {!Node} node
	     */

	  }, {
	    key: "patchNode",
	    value: function patchNode(node) {
	      if (!this._hasPatches) return;
	      if (node.__CE_patched) return;
	      node.__CE_patched = true;

	      for (var i = 0; i < this._patchesNode.length; i++) {
	        this._patchesNode[i](node);
	      }
	    }
	    /**
	     * @param {!Element} element
	     */

	  }, {
	    key: "patchElement",
	    value: function patchElement(element) {
	      if (!this._hasPatches) return;
	      if (element.__CE_patched) return;
	      element.__CE_patched = true;

	      for (var i = 0; i < this._patchesNode.length; i++) {
	        this._patchesNode[i](element);
	      }

	      for (var _i = 0; _i < this._patchesElement.length; _i++) {
	        this._patchesElement[_i](element);
	      }
	    }
	    /**
	     * @param {!Node} root
	     */

	  }, {
	    key: "connectTree",
	    value: function connectTree(root) {
	      var elements = [];
	      walkDeepDescendantElements(root, function (element) {
	        return elements.push(element);
	      });

	      for (var i = 0; i < elements.length; i++) {
	        var element = elements[i];

	        if (element.__CE_state === CustomElementState.custom) {
	          this.connectedCallback(element);
	        } else {
	          this.upgradeElement(element);
	        }
	      }
	    }
	    /**
	     * @param {!Node} root
	     */

	  }, {
	    key: "disconnectTree",
	    value: function disconnectTree(root) {
	      var elements = [];
	      walkDeepDescendantElements(root, function (element) {
	        return elements.push(element);
	      });

	      for (var i = 0; i < elements.length; i++) {
	        var element = elements[i];

	        if (element.__CE_state === CustomElementState.custom) {
	          this.disconnectedCallback(element);
	        }
	      }
	    }
	    /**
	     * Upgrades all uncustomized custom elements at and below a root node for
	     * which there is a definition. When custom element reaction callbacks are
	     * assumed to be called synchronously (which, by the current DOM / HTML spec
	     * definitions, they are *not*), callbacks for both elements customized
	     * synchronously by the parser and elements being upgraded occur in the same
	     * relative order.
	     *
	     * NOTE: This function, when used to simulate the construction of a tree that
	     * is already created but not customized (i.e. by the parser), does *not*
	     * prevent the element from reading the 'final' (true) state of the tree. For
	     * example, the element, during truly synchronous parsing / construction would
	     * see that it contains no children as they have not yet been inserted.
	     * However, this function does not modify the tree, the element will
	     * (incorrectly) have children. Additionally, self-modification restrictions
	     * for custom element constructors imposed by the DOM spec are *not* enforced.
	     *
	     *
	     * The following nested list shows the steps extending down from the HTML
	     * spec's parsing section that cause elements to be synchronously created and
	     * upgraded:
	     *
	     * The "in body" insertion mode:
	     * https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
	     * - Switch on token:
	     *   .. other cases ..
	     *   -> Any other start tag
	     *      - [Insert an HTML element](below) for the token.
	     *
	     * Insert an HTML element:
	     * https://html.spec.whatwg.org/multipage/syntax.html#insert-an-html-element
	     * - Insert a foreign element for the token in the HTML namespace:
	     *   https://html.spec.whatwg.org/multipage/syntax.html#insert-a-foreign-element
	     *   - Create an element for a token:
	     *     https://html.spec.whatwg.org/multipage/syntax.html#create-an-element-for-the-token
	     *     - Will execute script flag is true?
	     *       - (Element queue pushed to the custom element reactions stack.)
	     *     - Create an element:
	     *       https://dom.spec.whatwg.org/#concept-create-element
	     *       - Sync CE flag is true?
	     *         - Constructor called.
	     *         - Self-modification restrictions enforced.
	     *       - Sync CE flag is false?
	     *         - (Upgrade reaction enqueued.)
	     *     - Attributes appended to element.
	     *       (`attributeChangedCallback` reactions enqueued.)
	     *     - Will execute script flag is true?
	     *       - (Element queue popped from the custom element reactions stack.
	     *         Reactions in the popped stack are invoked.)
	     *   - (Element queue pushed to the custom element reactions stack.)
	     *   - Insert the element:
	     *     https://dom.spec.whatwg.org/#concept-node-insert
	     *     - Shadow-including descendants are connected. During parsing
	     *       construction, there are no shadow-*excluding* descendants.
	     *       However, the constructor may have validly attached a shadow
	     *       tree to itself and added descendants to that shadow tree.
	     *       (`connectedCallback` reactions enqueued.)
	     *   - (Element queue popped from the custom element reactions stack.
	     *     Reactions in the popped stack are invoked.)
	     *
	     * @param {!Node} root
	     * @param {{
	     *   visitedImports: (!Set<!Node>|undefined),
	     *   upgrade: (!function(!Element)|undefined),
	     * }=} options
	     */

	  }, {
	    key: "patchAndUpgradeTree",
	    value: function patchAndUpgradeTree(root) {
	      var _this2 = this;

	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var visitedImports = options.visitedImports || new Set();

	      var upgrade = options.upgrade || function (element) {
	        return _this2.upgradeElement(element);
	      };

	      var elements = [];

	      var gatherElements = function gatherElements(element) {
	        if (element.localName === 'link' && element.getAttribute('rel') === 'import') {
	          // The HTML Imports polyfill sets a descendant element of the link to
	          // the `import` property, specifically this is *not* a Document.
	          var importNode =
	          /** @type {?Node} */
	          element.import;

	          if (importNode instanceof Node) {
	            importNode.__CE_isImportDocument = true; // Connected links are associated with the registry.

	            importNode.__CE_hasRegistry = true;
	          }

	          if (importNode && importNode.readyState === 'complete') {
	            importNode.__CE_documentLoadHandled = true;
	          } else {
	            // If this link's import root is not available, its contents can't be
	            // walked. Wait for 'load' and walk it when it's ready.
	            element.addEventListener('load', function () {
	              var importNode =
	              /** @type {!Node} */
	              element.import;
	              if (importNode.__CE_documentLoadHandled) return;
	              importNode.__CE_documentLoadHandled = true; // Clone the `visitedImports` set that was populated sync during
	              // the `patchAndUpgradeTree` call that caused this 'load' handler to
	              // be added. Then, remove *this* link's import node so that we can
	              // walk that import again, even if it was partially walked later
	              // during the same `patchAndUpgradeTree` call.

	              var clonedVisitedImports = new Set(visitedImports);
	              clonedVisitedImports.delete(importNode);

	              _this2.patchAndUpgradeTree(importNode, {
	                visitedImports: clonedVisitedImports,
	                upgrade: upgrade
	              });
	            });
	          }
	        } else {
	          elements.push(element);
	        }
	      }; // `walkDeepDescendantElements` populates (and internally checks against)
	      // `visitedImports` when traversing a loaded import.


	      walkDeepDescendantElements(root, gatherElements, visitedImports);

	      if (this._hasPatches) {
	        for (var i = 0; i < elements.length; i++) {
	          this.patchElement(elements[i]);
	        }
	      }

	      for (var _i2 = 0; _i2 < elements.length; _i2++) {
	        upgrade(elements[_i2]);
	      }
	    }
	    /**
	     * @param {!HTMLElement} element
	     */

	  }, {
	    key: "upgradeElement",
	    value: function upgradeElement(element) {
	      var currentState = element.__CE_state;
	      if (currentState !== undefined) return; // Prevent elements created in documents without a browsing context from
	      // upgrading.
	      //
	      // https://html.spec.whatwg.org/multipage/custom-elements.html#look-up-a-custom-element-definition
	      //   "If document does not have a browsing context, return null."
	      //
	      // https://html.spec.whatwg.org/multipage/window-object.html#dom-document-defaultview
	      //   "The defaultView IDL attribute of the Document interface, on getting,
	      //   must return this Document's browsing context's WindowProxy object, if
	      //   this Document has an associated browsing context, or null otherwise."

	      var ownerDocument = element.ownerDocument;
	      if (!ownerDocument.defaultView && !(ownerDocument.__CE_isImportDocument && ownerDocument.__CE_hasRegistry)) return;
	      var definition = this.localNameToDefinition(element.localName);
	      if (!definition) return;
	      definition.constructionStack.push(element);
	      var constructor = definition.constructorFunction;

	      try {
	        try {
	          var result = new constructor();

	          if (result !== element) {
	            throw new Error('The custom element constructor did not produce the element being upgraded.');
	          }
	        } finally {
	          definition.constructionStack.pop();
	        }
	      } catch (e) {
	        element.__CE_state = CustomElementState.failed;
	        throw e;
	      }

	      element.__CE_state = CustomElementState.custom;
	      element.__CE_definition = definition;

	      if (definition.attributeChangedCallback) {
	        var observedAttributes = definition.observedAttributes;

	        for (var i = 0; i < observedAttributes.length; i++) {
	          var name = observedAttributes[i];
	          var value = element.getAttribute(name);

	          if (value !== null) {
	            this.attributeChangedCallback(element, name, null, value, null);
	          }
	        }
	      }

	      if (isConnected(element)) {
	        this.connectedCallback(element);
	      }
	    }
	    /**
	     * @param {!Element} element
	     */

	  }, {
	    key: "connectedCallback",
	    value: function connectedCallback(element) {
	      var definition = element.__CE_definition;

	      if (definition.connectedCallback) {
	        definition.connectedCallback.call(element);
	      }
	    }
	    /**
	     * @param {!Element} element
	     */

	  }, {
	    key: "disconnectedCallback",
	    value: function disconnectedCallback(element) {
	      var definition = element.__CE_definition;

	      if (definition.disconnectedCallback) {
	        definition.disconnectedCallback.call(element);
	      }
	    }
	    /**
	     * @param {!Element} element
	     * @param {string} name
	     * @param {?string} oldValue
	     * @param {?string} newValue
	     * @param {?string} namespace
	     */

	  }, {
	    key: "attributeChangedCallback",
	    value: function attributeChangedCallback(element, name, oldValue, newValue, namespace) {
	      var definition = element.__CE_definition;

	      if (definition.attributeChangedCallback && definition.observedAttributes.indexOf(name) > -1) {
	        definition.attributeChangedCallback.call(element, name, oldValue, newValue, namespace);
	      }
	    }
	  }]);

	  return CustomElementInternals;
	}();

	var DocumentConstructionObserver =
	/*#__PURE__*/
	function () {
	  function DocumentConstructionObserver(internals, doc) {
	    classCallCheck(this, DocumentConstructionObserver);

	    /**
	     * @type {!CustomElementInternals}
	     */
	    this._internals = internals;
	    /**
	     * @type {!Document}
	     */

	    this._document = doc;
	    /**
	     * @type {MutationObserver|undefined}
	     */

	    this._observer = undefined; // Simulate tree construction for all currently accessible nodes in the
	    // document.

	    this._internals.patchAndUpgradeTree(this._document);

	    if (this._document.readyState === 'loading') {
	      this._observer = new MutationObserver(this._handleMutations.bind(this)); // Nodes created by the parser are given to the observer *before* the next
	      // task runs. Inline scripts are run in a new task. This means that the
	      // observer will be able to handle the newly parsed nodes before the inline
	      // script is run.

	      this._observer.observe(this._document, {
	        childList: true,
	        subtree: true
	      });
	    }
	  }

	  createClass(DocumentConstructionObserver, [{
	    key: "disconnect",
	    value: function disconnect() {
	      if (this._observer) {
	        this._observer.disconnect();
	      }
	    }
	    /**
	     * @param {!Array<!MutationRecord>} mutations
	     */

	  }, {
	    key: "_handleMutations",
	    value: function _handleMutations(mutations) {
	      // Once the document's `readyState` is 'interactive' or 'complete', all new
	      // nodes created within that document will be the result of script and
	      // should be handled by patching.
	      var readyState = this._document.readyState;

	      if (readyState === 'interactive' || readyState === 'complete') {
	        this.disconnect();
	      }

	      for (var i = 0; i < mutations.length; i++) {
	        var addedNodes = mutations[i].addedNodes;

	        for (var j = 0; j < addedNodes.length; j++) {
	          var node = addedNodes[j];

	          this._internals.patchAndUpgradeTree(node);
	        }
	      }
	    }
	  }]);

	  return DocumentConstructionObserver;
	}();

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	/**
	 * @template T
	 */
	var Deferred =
	/*#__PURE__*/
	function () {
	  function Deferred() {
	    var _this = this;

	    classCallCheck(this, Deferred);

	    /**
	     * @private
	     * @type {T|undefined}
	     */
	    this._value = undefined;
	    /**
	     * @private
	     * @type {Function|undefined}
	     */

	    this._resolve = undefined;
	    /**
	     * @private
	     * @type {!Promise<T>}
	     */

	    this._promise = new Promise(function (resolve) {
	      _this._resolve = resolve;

	      if (_this._value) {
	        resolve(_this._value);
	      }
	    });
	  }
	  /**
	   * @param {T} value
	   */


	  createClass(Deferred, [{
	    key: "resolve",
	    value: function resolve(value) {
	      if (this._value) {
	        throw new Error('Already resolved.');
	      }

	      this._value = value;

	      if (this._resolve) {
	        this._resolve(value);
	      }
	    }
	    /**
	     * @return {!Promise<T>}
	     */

	  }, {
	    key: "toPromise",
	    value: function toPromise() {
	      return this._promise;
	    }
	  }]);

	  return Deferred;
	}();

	/**
	 * @unrestricted
	 */

	var CustomElementRegistry =
	/*#__PURE__*/
	function () {
	  /**
	   * @param {!CustomElementInternals} internals
	   */
	  function CustomElementRegistry(internals) {
	    classCallCheck(this, CustomElementRegistry);

	    /**
	     * @private
	     * @type {boolean}
	     */
	    this._elementDefinitionIsRunning = false;
	    /**
	     * @private
	     * @type {!CustomElementInternals}
	     */

	    this._internals = internals;
	    /**
	     * @private
	     * @type {!Map<string, !Deferred<undefined>>}
	     */

	    this._whenDefinedDeferred = new Map();
	    /**
	     * The default flush callback triggers the document walk synchronously.
	     * @private
	     * @type {!Function}
	     */

	    this._flushCallback = function (fn) {
	      return fn();
	    };
	    /**
	     * @private
	     * @type {boolean}
	     */


	    this._flushPending = false;
	    /**
	     * @private
	     * @type {!Array<!CustomElementDefinition>}
	     */

	    this._pendingDefinitions = [];
	    /**
	     * @private
	     * @type {!DocumentConstructionObserver}
	     */

	    this._documentConstructionObserver = new DocumentConstructionObserver(internals, document);
	  }
	  /**
	   * @param {string} localName
	   * @param {!Function} constructor
	   */


	  createClass(CustomElementRegistry, [{
	    key: "define",
	    value: function define(localName, constructor) {
	      var _this = this;

	      if (!(constructor instanceof Function)) {
	        throw new TypeError('Custom element constructors must be functions.');
	      }

	      if (!isValidCustomElementName(localName)) {
	        throw new SyntaxError("The element name '".concat(localName, "' is not valid."));
	      }

	      if (this._internals.localNameToDefinition(localName)) {
	        throw new Error("A custom element with name '".concat(localName, "' has already been defined."));
	      }

	      if (this._elementDefinitionIsRunning) {
	        throw new Error('A custom element is already being defined.');
	      }

	      this._elementDefinitionIsRunning = true;
	      var connectedCallback;
	      var disconnectedCallback;
	      var adoptedCallback;
	      var attributeChangedCallback;
	      var observedAttributes;

	      try {
	        var getCallback = function getCallback(name) {
	          var callbackValue = prototype[name];

	          if (callbackValue !== undefined && !(callbackValue instanceof Function)) {
	            throw new Error("The '".concat(name, "' callback must be a function."));
	          }

	          return callbackValue;
	        };

	        /** @type {!Object} */
	        var prototype = constructor.prototype;

	        if (!(prototype instanceof Object)) {
	          throw new TypeError('The custom element constructor\'s prototype is not an object.');
	        }

	        connectedCallback = getCallback('connectedCallback');
	        disconnectedCallback = getCallback('disconnectedCallback');
	        adoptedCallback = getCallback('adoptedCallback');
	        attributeChangedCallback = getCallback('attributeChangedCallback');
	        observedAttributes = constructor['observedAttributes'] || [];
	      } catch (e) {
	        return;
	      } finally {
	        this._elementDefinitionIsRunning = false;
	      }

	      var definition = {
	        localName: localName,
	        constructorFunction: constructor,
	        connectedCallback: connectedCallback,
	        disconnectedCallback: disconnectedCallback,
	        adoptedCallback: adoptedCallback,
	        attributeChangedCallback: attributeChangedCallback,
	        observedAttributes: observedAttributes,
	        constructionStack: []
	      };

	      this._internals.setDefinition(localName, definition);

	      this._pendingDefinitions.push(definition); // If we've already called the flush callback and it hasn't called back yet,
	      // don't call it again.


	      if (!this._flushPending) {
	        this._flushPending = true;

	        this._flushCallback(function () {
	          return _this._flush();
	        });
	      }
	    }
	  }, {
	    key: "upgrade",
	    value: function upgrade(element) {
	      this._internals.patchAndUpgradeTree(element);
	    }
	  }, {
	    key: "_flush",
	    value: function _flush() {
	      var _this2 = this;

	      // If no new definitions were defined, don't attempt to flush. This could
	      // happen if a flush callback keeps the function it is given and calls it
	      // multiple times.
	      if (this._flushPending === false) return;
	      this._flushPending = false;
	      var pendingDefinitions = this._pendingDefinitions;
	      /**
	       * Unupgraded elements with definitions that were defined *before* the last
	       * flush, in document order.
	       * @type {!Array<!HTMLElement>}
	       */

	      var elementsWithStableDefinitions = [];
	      /**
	       * A map from `localName`s of definitions that were defined *after* the last
	       * flush to unupgraded elements matching that definition, in document order.
	       * @type {!Map<string, !Array<!HTMLElement>>}
	       */

	      var elementsWithPendingDefinitions = new Map();

	      for (var i = 0; i < pendingDefinitions.length; i++) {
	        elementsWithPendingDefinitions.set(pendingDefinitions[i].localName, []);
	      }

	      this._internals.patchAndUpgradeTree(document, {
	        upgrade: function upgrade(element) {
	          // Ignore the element if it has already upgraded or failed to upgrade.
	          if (element.__CE_state !== undefined) return;
	          var localName = element.localName; // If there is an applicable pending definition for the element, add the
	          // element to the list of elements to be upgraded with that definition.

	          var pendingElements = elementsWithPendingDefinitions.get(localName);

	          if (pendingElements) {
	            pendingElements.push(element); // If there is *any other* applicable definition for the element, add it
	            // to the list of elements with stable definitions that need to be upgraded.
	          } else if (_this2._internals.localNameToDefinition(localName)) {
	            elementsWithStableDefinitions.push(element);
	          }
	        }
	      }); // Upgrade elements with 'stable' definitions first.


	      for (var _i = 0; _i < elementsWithStableDefinitions.length; _i++) {
	        this._internals.upgradeElement(elementsWithStableDefinitions[_i]);
	      } // Upgrade elements with 'pending' definitions in the order they were defined.


	      while (pendingDefinitions.length > 0) {
	        var definition = pendingDefinitions.shift();
	        var localName = definition.localName; // Attempt to upgrade all applicable elements.

	        var pendingUpgradableElements = elementsWithPendingDefinitions.get(definition.localName);

	        for (var _i2 = 0; _i2 < pendingUpgradableElements.length; _i2++) {
	          this._internals.upgradeElement(pendingUpgradableElements[_i2]);
	        } // Resolve any promises created by `whenDefined` for the definition.


	        var deferred = this._whenDefinedDeferred.get(localName);

	        if (deferred) {
	          deferred.resolve(undefined);
	        }
	      }
	    }
	    /**
	     * @param {string} localName
	     * @return {Function|undefined}
	     */

	  }, {
	    key: "get",
	    value: function get(localName) {
	      var definition = this._internals.localNameToDefinition(localName);

	      if (definition) {
	        return definition.constructorFunction;
	      }

	      return undefined;
	    }
	    /**
	     * @param {string} localName
	     * @return {!Promise<undefined>}
	     */

	  }, {
	    key: "whenDefined",
	    value: function whenDefined(localName) {
	      if (!isValidCustomElementName(localName)) {
	        return Promise.reject(new SyntaxError("'".concat(localName, "' is not a valid custom element name.")));
	      }

	      var prior = this._whenDefinedDeferred.get(localName);

	      if (prior) {
	        return prior.toPromise();
	      }

	      var deferred = new Deferred();

	      this._whenDefinedDeferred.set(localName, deferred);

	      var definition = this._internals.localNameToDefinition(localName); // Resolve immediately only if the given local name has a definition *and*
	      // the full document walk to upgrade elements with that local name has
	      // already happened.


	      if (definition && !this._pendingDefinitions.some(function (d) {
	        return d.localName === localName;
	      })) {
	        deferred.resolve(undefined);
	      }

	      return deferred.toPromise();
	    }
	  }, {
	    key: "polyfillWrapFlushCallback",
	    value: function polyfillWrapFlushCallback(outer) {
	      this._documentConstructionObserver.disconnect();

	      var inner = this._flushCallback;

	      this._flushCallback = function (flush) {
	        return outer(function () {
	          return inner(flush);
	        });
	      };
	    }
	  }]);

	  return CustomElementRegistry;
	}(); // Closure compiler exports.
	window['CustomElementRegistry'] = CustomElementRegistry;
	CustomElementRegistry.prototype['define'] = CustomElementRegistry.prototype.define;
	CustomElementRegistry.prototype['upgrade'] = CustomElementRegistry.prototype.upgrade;
	CustomElementRegistry.prototype['get'] = CustomElementRegistry.prototype.get;
	CustomElementRegistry.prototype['whenDefined'] = CustomElementRegistry.prototype.whenDefined;
	CustomElementRegistry.prototype['polyfillWrapFlushCallback'] = CustomElementRegistry.prototype.polyfillWrapFlushCallback;

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	var Native = {
	  Document_createElement: window.Document.prototype.createElement,
	  Document_createElementNS: window.Document.prototype.createElementNS,
	  Document_importNode: window.Document.prototype.importNode,
	  Document_prepend: window.Document.prototype['prepend'],
	  Document_append: window.Document.prototype['append'],
	  DocumentFragment_prepend: window.DocumentFragment.prototype['prepend'],
	  DocumentFragment_append: window.DocumentFragment.prototype['append'],
	  Node_cloneNode: window.Node.prototype.cloneNode,
	  Node_appendChild: window.Node.prototype.appendChild,
	  Node_insertBefore: window.Node.prototype.insertBefore,
	  Node_removeChild: window.Node.prototype.removeChild,
	  Node_replaceChild: window.Node.prototype.replaceChild,
	  Node_textContent: Object.getOwnPropertyDescriptor(window.Node.prototype, 'textContent'),
	  Element_attachShadow: window.Element.prototype['attachShadow'],
	  Element_innerHTML: Object.getOwnPropertyDescriptor(window.Element.prototype, 'innerHTML'),
	  Element_getAttribute: window.Element.prototype.getAttribute,
	  Element_setAttribute: window.Element.prototype.setAttribute,
	  Element_removeAttribute: window.Element.prototype.removeAttribute,
	  Element_getAttributeNS: window.Element.prototype.getAttributeNS,
	  Element_setAttributeNS: window.Element.prototype.setAttributeNS,
	  Element_removeAttributeNS: window.Element.prototype.removeAttributeNS,
	  Element_insertAdjacentElement: window.Element.prototype['insertAdjacentElement'],
	  Element_insertAdjacentHTML: window.Element.prototype['insertAdjacentHTML'],
	  Element_prepend: window.Element.prototype['prepend'],
	  Element_append: window.Element.prototype['append'],
	  Element_before: window.Element.prototype['before'],
	  Element_after: window.Element.prototype['after'],
	  Element_replaceWith: window.Element.prototype['replaceWith'],
	  Element_remove: window.Element.prototype['remove'],
	  HTMLElement: window.HTMLElement,
	  HTMLElement_innerHTML: Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML'),
	  HTMLElement_insertAdjacentElement: window.HTMLElement.prototype['insertAdjacentElement'],
	  HTMLElement_insertAdjacentHTML: window.HTMLElement.prototype['insertAdjacentHTML']
	};

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */

	/**
	 * This class exists only to work around Closure's lack of a way to describe
	 * singletons. It represents the 'already constructed marker' used in custom
	 * element construction stacks.
	 *
	 * https://html.spec.whatwg.org/#concept-already-constructed-marker
	 * @extends AlreadyConstructedMarkerType
	 */
	var AlreadyConstructedMarker = function AlreadyConstructedMarker() {
	  classCallCheck(this, AlreadyConstructedMarker);
	};

	var AlreadyConstructedMarker$1 = new AlreadyConstructedMarker();

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	/**
	 * @param {!CustomElementInternals} internals
	 */

	function PatchHTMLElement (internals) {
	  window['HTMLElement'] = function () {
	    /**
	     * @type {function(new: HTMLElement): !HTMLElement}
	     */
	    function HTMLElement() {
	      // This should really be `new.target` but `new.target` can't be emulated
	      // in ES5. Assuming the user keeps the default value of the constructor's
	      // prototype's `constructor` property, this is equivalent.
	      var constructor =
	      /** @type {!Function} */
	      this.constructor;
	      var definition = internals.constructorToDefinition(constructor);

	      if (!definition) {
	        throw new Error('The custom element being constructed was not registered with `customElements`.');
	      }

	      var constructionStack = definition.constructionStack;

	      if (constructionStack.length === 0) {
	        var _element =
	        /** @type {!HTMLElement} */
	        Native.Document_createElement.call(document, definition.localName);

	        Object.setPrototypeOf(_element, constructor.prototype);
	        _element.__CE_state = CustomElementState.custom;
	        _element.__CE_definition = definition;
	        internals.patchElement(_element);
	        return _element;
	      }

	      var lastIndex = constructionStack.length - 1;
	      var element = constructionStack[lastIndex];

	      if (element === AlreadyConstructedMarker$1) {
	        throw new Error('The HTMLElement constructor was either called reentrantly for this constructor or called multiple times.');
	      }

	      var toConstructElement =
	      /** @type {!HTMLElement} */
	      element;
	      constructionStack[lastIndex] = AlreadyConstructedMarker$1;
	      Object.setPrototypeOf(toConstructElement, constructor.prototype);
	      internals.patchElement(toConstructElement);
	      return toConstructElement;
	    }

	    HTMLElement.prototype = Native.HTMLElement.prototype; // Safari 9 has `writable: false` on the propertyDescriptor
	    // Make it writable so that TypeScript can patch up the
	    // constructor in the ES5 compiled code.

	    Object.defineProperty(HTMLElement.prototype, 'constructor', {
	      writable: true,
	      configurable: true,
	      enumerable: false,
	      value: HTMLElement
	    });
	    return HTMLElement;
	  }();
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	/**
	 * @param {!CustomElementInternals} internals
	 * @param {!Object} destination
	 * @param {!ParentNodeNativeMethods} builtIn
	 */

	function PatchParentNode (internals, destination, builtIn) {
	  /**
	   * @param {!function(...(!Node|string))} builtInMethod
	   * @return {!function(...(!Node|string))}
	   */
	  function appendPrependPatch(builtInMethod) {
	    return (
	      /** @this {!Node} */
	      function () {
	        /**
	         * A copy of `nodes`, with any DocumentFragment replaced by its children.
	         * @type {!Array<!Node>}
	         */
	        var flattenedNodes = [];
	        /**
	         * Elements in `nodes` that were connected before this call.
	         * @type {!Array<!Node>}
	         */

	        var connectedElements = [];

	        for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
	          nodes[_key] = arguments[_key];
	        }

	        for (var i = 0; i < nodes.length; i++) {
	          var node = nodes[i];

	          if (node instanceof Element && isConnected(node)) {
	            connectedElements.push(node);
	          }

	          if (node instanceof DocumentFragment) {
	            for (var child = node.firstChild; child; child = child.nextSibling) {
	              flattenedNodes.push(child);
	            }
	          } else {
	            flattenedNodes.push(node);
	          }
	        }

	        builtInMethod.apply(this, nodes);

	        for (var _i = 0; _i < connectedElements.length; _i++) {
	          internals.disconnectTree(connectedElements[_i]);
	        }

	        if (isConnected(this)) {
	          for (var _i2 = 0; _i2 < flattenedNodes.length; _i2++) {
	            var _node = flattenedNodes[_i2];

	            if (_node instanceof Element) {
	              internals.connectTree(_node);
	            }
	          }
	        }
	      }
	    );
	  }

	  if (builtIn.prepend !== undefined) {
	    setPropertyUnchecked(destination, 'prepend', appendPrependPatch(builtIn.prepend));
	  }

	  if (builtIn.append !== undefined) {
	    setPropertyUnchecked(destination, 'append', appendPrependPatch(builtIn.append));
	  }
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	/**
	 * @param {!CustomElementInternals} internals
	 */

	function PatchDocument (internals) {
	  setPropertyUnchecked(Document.prototype, 'createElement',
	  /**
	   * @this {Document}
	   * @param {string} localName
	   * @return {!Element}
	   */
	  function (localName) {
	    // Only create custom elements if this document is associated with the registry.
	    if (this.__CE_hasRegistry) {
	      var definition = internals.localNameToDefinition(localName);

	      if (definition) {
	        return new definition.constructorFunction();
	      }
	    }

	    var result =
	    /** @type {!Element} */
	    Native.Document_createElement.call(this, localName);
	    internals.patchElement(result);
	    return result;
	  });
	  setPropertyUnchecked(Document.prototype, 'importNode',
	  /**
	   * @this {Document}
	   * @param {!Node} node
	   * @param {boolean=} deep
	   * @return {!Node}
	   */
	  function (node, deep) {
	    var clone =
	    /** @type {!Node} */
	    Native.Document_importNode.call(this, node, !!deep); // Only create custom elements if this document is associated with the registry.

	    if (!this.__CE_hasRegistry) {
	      internals.patchTree(clone);
	    } else {
	      internals.patchAndUpgradeTree(clone);
	    }

	    return clone;
	  });
	  var NS_HTML = "http://www.w3.org/1999/xhtml";
	  setPropertyUnchecked(Document.prototype, 'createElementNS',
	  /**
	   * @this {Document}
	   * @param {?string} namespace
	   * @param {string} localName
	   * @return {!Element}
	   */
	  function (namespace, localName) {
	    // Only create custom elements if this document is associated with the registry.
	    if (this.__CE_hasRegistry && (namespace === null || namespace === NS_HTML)) {
	      var definition = internals.localNameToDefinition(localName);

	      if (definition) {
	        return new definition.constructorFunction();
	      }
	    }

	    var result =
	    /** @type {!Element} */
	    Native.Document_createElementNS.call(this, namespace, localName);
	    internals.patchElement(result);
	    return result;
	  });
	  PatchParentNode(internals, Document.prototype, {
	    prepend: Native.Document_prepend,
	    append: Native.Document_append
	  });
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	/**
	 * @param {!CustomElementInternals} internals
	 */

	function PatchDocumentFragment (internals) {
	  PatchParentNode(internals, DocumentFragment.prototype, {
	    prepend: Native.DocumentFragment_prepend,
	    append: Native.DocumentFragment_append
	  });
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	/**
	 * @param {!CustomElementInternals} internals
	 */

	function PatchNode (internals) {
	  // `Node#nodeValue` is implemented on `Attr`.
	  // `Node#textContent` is implemented on `Attr`, `Element`.
	  setPropertyUnchecked(Node.prototype, 'insertBefore',
	  /**
	   * @this {Node}
	   * @param {!Node} node
	   * @param {?Node} refNode
	   * @return {!Node}
	   */
	  function (node, refNode) {
	    if (node instanceof DocumentFragment) {
	      var insertedNodes = Array.prototype.slice.apply(node.childNodes);

	      var _nativeResult = Native.Node_insertBefore.call(this, node, refNode); // DocumentFragments can't be connected, so `disconnectTree` will never
	      // need to be called on a DocumentFragment's children after inserting it.


	      if (isConnected(this)) {
	        for (var i = 0; i < insertedNodes.length; i++) {
	          internals.connectTree(insertedNodes[i]);
	        }
	      }

	      return _nativeResult;
	    }

	    var nodeWasConnected = isConnected(node);
	    var nativeResult = Native.Node_insertBefore.call(this, node, refNode);

	    if (nodeWasConnected) {
	      internals.disconnectTree(node);
	    }

	    if (isConnected(this)) {
	      internals.connectTree(node);
	    }

	    return nativeResult;
	  });
	  setPropertyUnchecked(Node.prototype, 'appendChild',
	  /**
	   * @this {Node}
	   * @param {!Node} node
	   * @return {!Node}
	   */
	  function (node) {
	    if (node instanceof DocumentFragment) {
	      var insertedNodes = Array.prototype.slice.apply(node.childNodes);

	      var _nativeResult2 = Native.Node_appendChild.call(this, node); // DocumentFragments can't be connected, so `disconnectTree` will never
	      // need to be called on a DocumentFragment's children after inserting it.


	      if (isConnected(this)) {
	        for (var i = 0; i < insertedNodes.length; i++) {
	          internals.connectTree(insertedNodes[i]);
	        }
	      }

	      return _nativeResult2;
	    }

	    var nodeWasConnected = isConnected(node);
	    var nativeResult = Native.Node_appendChild.call(this, node);

	    if (nodeWasConnected) {
	      internals.disconnectTree(node);
	    }

	    if (isConnected(this)) {
	      internals.connectTree(node);
	    }

	    return nativeResult;
	  });
	  setPropertyUnchecked(Node.prototype, 'cloneNode',
	  /**
	   * @this {Node}
	   * @param {boolean=} deep
	   * @return {!Node}
	   */
	  function (deep) {
	    var clone = Native.Node_cloneNode.call(this, !!deep); // Only create custom elements if this element's owner document is
	    // associated with the registry.

	    if (!this.ownerDocument.__CE_hasRegistry) {
	      internals.patchTree(clone);
	    } else {
	      internals.patchAndUpgradeTree(clone);
	    }

	    return clone;
	  });
	  setPropertyUnchecked(Node.prototype, 'removeChild',
	  /**
	   * @this {Node}
	   * @param {!Node} node
	   * @return {!Node}
	   */
	  function (node) {
	    var nodeWasConnected = isConnected(node);
	    var nativeResult = Native.Node_removeChild.call(this, node);

	    if (nodeWasConnected) {
	      internals.disconnectTree(node);
	    }

	    return nativeResult;
	  });
	  setPropertyUnchecked(Node.prototype, 'replaceChild',
	  /**
	   * @this {Node}
	   * @param {!Node} nodeToInsert
	   * @param {!Node} nodeToRemove
	   * @return {!Node}
	   */
	  function (nodeToInsert, nodeToRemove) {
	    if (nodeToInsert instanceof DocumentFragment) {
	      var insertedNodes = Array.prototype.slice.apply(nodeToInsert.childNodes);

	      var _nativeResult3 = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove); // DocumentFragments can't be connected, so `disconnectTree` will never
	      // need to be called on a DocumentFragment's children after inserting it.


	      if (isConnected(this)) {
	        internals.disconnectTree(nodeToRemove);

	        for (var i = 0; i < insertedNodes.length; i++) {
	          internals.connectTree(insertedNodes[i]);
	        }
	      }

	      return _nativeResult3;
	    }

	    var nodeToInsertWasConnected = isConnected(nodeToInsert);
	    var nativeResult = Native.Node_replaceChild.call(this, nodeToInsert, nodeToRemove);
	    var thisIsConnected = isConnected(this);

	    if (thisIsConnected) {
	      internals.disconnectTree(nodeToRemove);
	    }

	    if (nodeToInsertWasConnected) {
	      internals.disconnectTree(nodeToInsert);
	    }

	    if (thisIsConnected) {
	      internals.connectTree(nodeToInsert);
	    }

	    return nativeResult;
	  });

	  function patch_textContent(destination, baseDescriptor) {
	    Object.defineProperty(destination, 'textContent', {
	      enumerable: baseDescriptor.enumerable,
	      configurable: true,
	      get: baseDescriptor.get,
	      set:
	      /** @this {Node} */
	      function set(assignedValue) {
	        // If this is a text node then there are no nodes to disconnect.
	        if (this.nodeType === Node.TEXT_NODE) {
	          baseDescriptor.set.call(this, assignedValue);
	          return;
	        }

	        var removedNodes = undefined; // Checking for `firstChild` is faster than reading `childNodes.length`
	        // to compare with 0.

	        if (this.firstChild) {
	          // Using `childNodes` is faster than `children`, even though we only
	          // care about elements.
	          var childNodes = this.childNodes;
	          var childNodesLength = childNodes.length;

	          if (childNodesLength > 0 && isConnected(this)) {
	            // Copying an array by iterating is faster than using slice.
	            removedNodes = new Array(childNodesLength);

	            for (var i = 0; i < childNodesLength; i++) {
	              removedNodes[i] = childNodes[i];
	            }
	          }
	        }

	        baseDescriptor.set.call(this, assignedValue);

	        if (removedNodes) {
	          for (var _i = 0; _i < removedNodes.length; _i++) {
	            internals.disconnectTree(removedNodes[_i]);
	          }
	        }
	      }
	    });
	  }

	  if (Native.Node_textContent && Native.Node_textContent.get) {
	    patch_textContent(Node.prototype, Native.Node_textContent);
	  } else {
	    internals.addNodePatch(function (element) {
	      patch_textContent(element, {
	        enumerable: true,
	        configurable: true,
	        // NOTE: This implementation of the `textContent` getter assumes that
	        // text nodes' `textContent` getter will not be patched.
	        get:
	        /** @this {Node} */
	        function get() {
	          /** @type {!Array<string>} */
	          var parts = [];

	          for (var i = 0; i < this.childNodes.length; i++) {
	            var childNode = this.childNodes[i];

	            if (childNode.nodeType === Node.COMMENT_NODE) {
	              continue;
	            }

	            parts.push(childNode.textContent);
	          }

	          return parts.join('');
	        },
	        set:
	        /** @this {Node} */
	        function set(assignedValue) {
	          while (this.firstChild) {
	            Native.Node_removeChild.call(this, this.firstChild);
	          } // `textContent = null | undefined | ''` does not result in
	          // a TextNode childNode


	          if (assignedValue != null && assignedValue !== '') {
	            Native.Node_appendChild.call(this, document.createTextNode(assignedValue));
	          }
	        }
	      });
	    });
	  }
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	/**
	 * @param {!CustomElementInternals} internals
	 * @param {!Object} destination
	 * @param {!ChildNodeNativeMethods} builtIn
	 */

	function PatchChildNode (internals, destination, builtIn) {
	  /**
	   * @param {!function(...(!Node|string))} builtInMethod
	   * @return {!function(...(!Node|string))}
	   */
	  function beforeAfterPatch(builtInMethod) {
	    return (
	      /** @this {!Node} */
	      function () {
	        /**
	         * A copy of `nodes`, with any DocumentFragment replaced by its children.
	         * @type {!Array<!Node>}
	         */
	        var flattenedNodes = [];
	        /**
	         * Elements in `nodes` that were connected before this call.
	         * @type {!Array<!Node>}
	         */

	        var connectedElements = [];

	        for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
	          nodes[_key] = arguments[_key];
	        }

	        for (var i = 0; i < nodes.length; i++) {
	          var node = nodes[i];

	          if (node instanceof Element && isConnected(node)) {
	            connectedElements.push(node);
	          }

	          if (node instanceof DocumentFragment) {
	            for (var child = node.firstChild; child; child = child.nextSibling) {
	              flattenedNodes.push(child);
	            }
	          } else {
	            flattenedNodes.push(node);
	          }
	        }

	        builtInMethod.apply(this, nodes);

	        for (var _i = 0; _i < connectedElements.length; _i++) {
	          internals.disconnectTree(connectedElements[_i]);
	        }

	        if (isConnected(this)) {
	          for (var _i2 = 0; _i2 < flattenedNodes.length; _i2++) {
	            var _node = flattenedNodes[_i2];

	            if (_node instanceof Element) {
	              internals.connectTree(_node);
	            }
	          }
	        }
	      }
	    );
	  }

	  if (builtIn.before !== undefined) {
	    setPropertyUnchecked(destination, 'before', beforeAfterPatch(builtIn.before));
	  }

	  if (builtIn.before !== undefined) {
	    setPropertyUnchecked(destination, 'after', beforeAfterPatch(builtIn.after));
	  }

	  if (builtIn.replaceWith !== undefined) {
	    setPropertyUnchecked(destination, 'replaceWith',
	    /**
	     * @param {...(!Node|string)} nodes
	     * @this {!Node}
	     */
	    function () {
	      /**
	       * A copy of `nodes`, with any DocumentFragment replaced by its children.
	       * @type {!Array<!Node|string>}
	       */
	      var flattenedNodes = [];
	      /**
	       * Elements in `nodes` that were connected before this call.
	       * @type {!Array<!Node>}
	       */

	      var connectedElements = [];

	      for (var _len2 = arguments.length, nodes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        nodes[_key2] = arguments[_key2];
	      }

	      for (var i = 0; i < nodes.length; i++) {
	        var node = nodes[i];

	        if (node instanceof Element && isConnected(node)) {
	          connectedElements.push(node);
	        }

	        if (node instanceof DocumentFragment) {
	          for (var child = node.firstChild; child; child = child.nextSibling) {
	            flattenedNodes.push(child);
	          }
	        } else {
	          flattenedNodes.push(node);
	        }
	      }

	      var wasConnected = isConnected(this);
	      builtIn.replaceWith.apply(this, nodes);

	      for (var _i3 = 0; _i3 < connectedElements.length; _i3++) {
	        internals.disconnectTree(connectedElements[_i3]);
	      }

	      if (wasConnected) {
	        internals.disconnectTree(this);

	        for (var _i4 = 0; _i4 < flattenedNodes.length; _i4++) {
	          var _node2 = flattenedNodes[_i4];

	          if (_node2 instanceof Element) {
	            internals.connectTree(_node2);
	          }
	        }
	      }
	    });
	  }

	  if (builtIn.remove !== undefined) {
	    setPropertyUnchecked(destination, 'remove',
	    /** @this {!Node} */
	    function () {
	      var wasConnected = isConnected(this);
	      builtIn.remove.call(this);

	      if (wasConnected) {
	        internals.disconnectTree(this);
	      }
	    });
	  }
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	/**
	 * @param {!CustomElementInternals} internals
	 */

	function PatchElement (internals) {
	  if (Native.Element_attachShadow) {
	    setPropertyUnchecked(Element.prototype, 'attachShadow',
	    /**
	     * @this {Element}
	     * @param {!{mode: string}} init
	     * @return {ShadowRoot}
	     */
	    function (init) {
	      var shadowRoot = Native.Element_attachShadow.call(this, init);
	      internals.patchNode(shadowRoot);
	      this.__CE_shadowRoot = shadowRoot;
	      return shadowRoot;
	    });
	  }

	  function patch_innerHTML(destination, baseDescriptor) {
	    Object.defineProperty(destination, 'innerHTML', {
	      enumerable: baseDescriptor.enumerable,
	      configurable: true,
	      get: baseDescriptor.get,
	      set:
	      /** @this {Element} */
	      function set(htmlString) {
	        var _this = this;

	        var isConnected$1 = isConnected(this); // NOTE: In IE11, when using the native `innerHTML` setter, all nodes
	        // that were previously descendants of the context element have all of
	        // their children removed as part of the set - the entire subtree is
	        // 'disassembled'. This work around walks the subtree *before* using the
	        // native setter.

	        /** @type {!Array<!Element>|undefined} */

	        var removedElements = undefined;

	        if (isConnected$1) {
	          removedElements = [];
	          walkDeepDescendantElements(this, function (element) {
	            if (element !== _this) {
	              removedElements.push(element);
	            }
	          });
	        }

	        baseDescriptor.set.call(this, htmlString);

	        if (removedElements) {
	          for (var i = 0; i < removedElements.length; i++) {
	            var element = removedElements[i];

	            if (element.__CE_state === CustomElementState.custom) {
	              internals.disconnectedCallback(element);
	            }
	          }
	        } // Only create custom elements if this element's owner document is
	        // associated with the registry.


	        if (!this.ownerDocument.__CE_hasRegistry) {
	          internals.patchTree(this);
	        } else {
	          internals.patchAndUpgradeTree(this);
	        }

	        return htmlString;
	      }
	    });
	  }

	  if (Native.Element_innerHTML && Native.Element_innerHTML.get) {
	    patch_innerHTML(Element.prototype, Native.Element_innerHTML);
	  } else if (Native.HTMLElement_innerHTML && Native.HTMLElement_innerHTML.get) {
	    patch_innerHTML(HTMLElement.prototype, Native.HTMLElement_innerHTML);
	  } else {
	    internals.addElementPatch(function (element) {
	      patch_innerHTML(element, {
	        enumerable: true,
	        configurable: true,
	        // Implements getting `innerHTML` by performing an unpatched `cloneNode`
	        // of the element and returning the resulting element's `innerHTML`.
	        // TODO: Is this too expensive?
	        get:
	        /** @this {Element} */
	        function get() {
	          return (
	            /** @type {!Element} */
	            Native.Node_cloneNode.call(this, true).innerHTML
	          );
	        },
	        // Implements setting `innerHTML` by creating an unpatched element,
	        // setting `innerHTML` of that element and replacing the target
	        // element's children with those of the unpatched element.
	        set:
	        /** @this {Element} */
	        function set(assignedValue) {
	          // NOTE: re-route to `content` for `template` elements.
	          // We need to do this because `template.appendChild` does not
	          // route into `template.content`.
	          var isTemplate = this.localName === 'template';
	          /** @type {!Node} */

	          var content = isTemplate ?
	          /** @type {!HTMLTemplateElement} */
	          this.content : this;
	          /** @type {!Element} */

	          var rawElement = Native.Document_createElementNS.call(document, this.namespaceURI, this.localName);
	          rawElement.innerHTML = assignedValue;

	          while (content.childNodes.length > 0) {
	            Native.Node_removeChild.call(content, content.childNodes[0]);
	          }

	          var container = isTemplate ?
	          /** @type {!HTMLTemplateElement} */
	          rawElement.content : rawElement;

	          while (container.childNodes.length > 0) {
	            Native.Node_appendChild.call(content, container.childNodes[0]);
	          }
	        }
	      });
	    });
	  }

	  setPropertyUnchecked(Element.prototype, 'setAttribute',
	  /**
	   * @this {Element}
	   * @param {string} name
	   * @param {string} newValue
	   */
	  function (name, newValue) {
	    // Fast path for non-custom elements.
	    if (this.__CE_state !== CustomElementState.custom) {
	      return Native.Element_setAttribute.call(this, name, newValue);
	    }

	    var oldValue = Native.Element_getAttribute.call(this, name);
	    Native.Element_setAttribute.call(this, name, newValue);
	    newValue = Native.Element_getAttribute.call(this, name);
	    internals.attributeChangedCallback(this, name, oldValue, newValue, null);
	  });
	  setPropertyUnchecked(Element.prototype, 'setAttributeNS',
	  /**
	   * @this {Element}
	   * @param {?string} namespace
	   * @param {string} name
	   * @param {string} newValue
	   */
	  function (namespace, name, newValue) {
	    // Fast path for non-custom elements.
	    if (this.__CE_state !== CustomElementState.custom) {
	      return Native.Element_setAttributeNS.call(this, namespace, name, newValue);
	    }

	    var oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
	    Native.Element_setAttributeNS.call(this, namespace, name, newValue);
	    newValue = Native.Element_getAttributeNS.call(this, namespace, name);
	    internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
	  });
	  setPropertyUnchecked(Element.prototype, 'removeAttribute',
	  /**
	   * @this {Element}
	   * @param {string} name
	   */
	  function (name) {
	    // Fast path for non-custom elements.
	    if (this.__CE_state !== CustomElementState.custom) {
	      return Native.Element_removeAttribute.call(this, name);
	    }

	    var oldValue = Native.Element_getAttribute.call(this, name);
	    Native.Element_removeAttribute.call(this, name);

	    if (oldValue !== null) {
	      internals.attributeChangedCallback(this, name, oldValue, null, null);
	    }
	  });
	  setPropertyUnchecked(Element.prototype, 'removeAttributeNS',
	  /**
	   * @this {Element}
	   * @param {?string} namespace
	   * @param {string} name
	   */
	  function (namespace, name) {
	    // Fast path for non-custom elements.
	    if (this.__CE_state !== CustomElementState.custom) {
	      return Native.Element_removeAttributeNS.call(this, namespace, name);
	    }

	    var oldValue = Native.Element_getAttributeNS.call(this, namespace, name);
	    Native.Element_removeAttributeNS.call(this, namespace, name); // In older browsers, `Element#getAttributeNS` may return the empty string
	    // instead of null if the attribute does not exist. For details, see;
	    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNS#Notes

	    var newValue = Native.Element_getAttributeNS.call(this, namespace, name);

	    if (oldValue !== newValue) {
	      internals.attributeChangedCallback(this, name, oldValue, newValue, namespace);
	    }
	  });

	  function patch_insertAdjacentElement(destination, baseMethod) {
	    setPropertyUnchecked(destination, 'insertAdjacentElement',
	    /**
	     * @this {Element}
	     * @param {string} position
	     * @param {!Element} element
	     * @return {?Element}
	     */
	    function (position, element) {
	      var wasConnected = isConnected(element);
	      var insertedElement =
	      /** @type {!Element} */
	      baseMethod.call(this, position, element);

	      if (wasConnected) {
	        internals.disconnectTree(element);
	      }

	      if (isConnected(insertedElement)) {
	        internals.connectTree(element);
	      }

	      return insertedElement;
	    });
	  }

	  if (Native.HTMLElement_insertAdjacentElement) {
	    patch_insertAdjacentElement(HTMLElement.prototype, Native.HTMLElement_insertAdjacentElement);
	  } else if (Native.Element_insertAdjacentElement) {
	    patch_insertAdjacentElement(Element.prototype, Native.Element_insertAdjacentElement);
	  } else {
	    console.warn('Custom Elements: `Element#insertAdjacentElement` was not patched.');
	  }

	  function patch_insertAdjacentHTML(destination, baseMethod) {
	    /**
	     * Patches and upgrades all nodes which are siblings between `start`
	     * (inclusive) and `end` (exclusive). If `end` is `null`, then all siblings
	     * following `start` will be patched and upgraded.
	     * @param {!Node} start
	     * @param {?Node} end
	     */
	    function upgradeNodesInRange(start, end) {
	      var nodes = [];

	      for (var node = start; node !== end; node = node.nextSibling) {
	        nodes.push(node);
	      }

	      for (var i = 0; i < nodes.length; i++) {
	        internals.patchAndUpgradeTree(nodes[i]);
	      }
	    }

	    setPropertyUnchecked(destination, 'insertAdjacentHTML',
	    /**
	     * @this {Element}
	     * @param {string} position
	     * @param {string} text
	     */
	    function (position, text) {
	      position = position.toLowerCase();

	      if (position === "beforebegin") {
	        var marker = this.previousSibling;
	        baseMethod.call(this, position, text);
	        upgradeNodesInRange(marker ||
	        /** @type {!Node} */
	        this.parentNode.firstChild, this);
	      } else if (position === "afterbegin") {
	        var _marker = this.firstChild;
	        baseMethod.call(this, position, text);
	        upgradeNodesInRange(
	        /** @type {!Node} */
	        this.firstChild, _marker);
	      } else if (position === "beforeend") {
	        var _marker2 = this.lastChild;
	        baseMethod.call(this, position, text);
	        upgradeNodesInRange(_marker2 ||
	        /** @type {!Node} */
	        this.firstChild, null);
	      } else if (position === "afterend") {
	        var _marker3 = this.nextSibling;
	        baseMethod.call(this, position, text);
	        upgradeNodesInRange(
	        /** @type {!Node} */
	        this.nextSibling, _marker3);
	      } else {
	        throw new SyntaxError("The value provided (".concat(String(position), ") is ") + "not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
	      }
	    });
	  }

	  if (Native.HTMLElement_insertAdjacentHTML) {
	    patch_insertAdjacentHTML(HTMLElement.prototype, Native.HTMLElement_insertAdjacentHTML);
	  } else if (Native.Element_insertAdjacentHTML) {
	    patch_insertAdjacentHTML(Element.prototype, Native.Element_insertAdjacentHTML);
	  } else {
	    console.warn('Custom Elements: `Element#insertAdjacentHTML` was not patched.');
	  }

	  PatchParentNode(internals, Element.prototype, {
	    prepend: Native.Element_prepend,
	    append: Native.Element_append
	  });
	  PatchChildNode(internals, Element.prototype, {
	    before: Native.Element_before,
	    after: Native.Element_after,
	    replaceWith: Native.Element_replaceWith,
	    remove: Native.Element_remove
	  });
	}

	/**
	 * @license
	 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
	 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	 * Code distributed by Google as part of the polymer project is also
	 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	 */
	var priorCustomElements = window['customElements'];

	if (!priorCustomElements || priorCustomElements['forcePolyfill'] || typeof priorCustomElements['define'] != 'function' || typeof priorCustomElements['get'] != 'function') {
	  /** @type {!CustomElementInternals} */
	  var internals = new CustomElementInternals();
	  PatchHTMLElement(internals);
	  PatchDocument(internals);
	  PatchDocumentFragment(internals);
	  PatchNode(internals);
	  PatchElement(internals); // The main document is always associated with the registry.

	  document.__CE_hasRegistry = true;
	  /** @type {!CustomElementRegistry} */

	  var customElements$1 = new CustomElementRegistry(internals);
	  Object.defineProperty(window, 'customElements', {
	    configurable: true,
	    enumerable: true,
	    value: customElements$1
	  });
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	var StyleNode = function StyleNode() {
	  classCallCheck(this, StyleNode);

	  /** @type {number} */
	  this['start'] = 0;
	  /** @type {number} */

	  this['end'] = 0;
	  /** @type {StyleNode} */

	  this['previous'] = null;
	  /** @type {StyleNode} */

	  this['parent'] = null;
	  /** @type {Array<StyleNode>} */

	  this['rules'] = null;
	  /** @type {string} */

	  this['parsedCssText'] = '';
	  /** @type {string} */

	  this['cssText'] = '';
	  /** @type {boolean} */

	  this['atRule'] = false;
	  /** @type {number} */

	  this['type'] = 0;
	  /** @type {string} */

	  this['keyframesName'] = '';
	  /** @type {string} */

	  this['selector'] = '';
	  /** @type {string} */

	  this['parsedSelector'] = '';
	};

	/**
	 * @param {string} text
	 * @return {StyleNode}
	 */

	function parse(text) {
	  text = clean(text);
	  return parseCss(lex(text), text);
	} // remove stuff we don't care about that may hinder parsing

	/**
	 * @param {string} cssText
	 * @return {string}
	 */

	function clean(cssText) {
	  return cssText.replace(RX.comments, '').replace(RX.port, '');
	} // super simple {...} lexer that returns a node tree

	/**
	 * @param {string} text
	 * @return {StyleNode}
	 */


	function lex(text) {
	  var root = new StyleNode();
	  root['start'] = 0;
	  root['end'] = text.length;
	  var n = root;

	  for (var i = 0, l = text.length; i < l; i++) {
	    if (text[i] === OPEN_BRACE) {
	      if (!n['rules']) {
	        n['rules'] = [];
	      }

	      var p = n;
	      var previous = p['rules'][p['rules'].length - 1] || null;
	      n = new StyleNode();
	      n['start'] = i + 1;
	      n['parent'] = p;
	      n['previous'] = previous;
	      p['rules'].push(n);
	    } else if (text[i] === CLOSE_BRACE) {
	      n['end'] = i + 1;
	      n = n['parent'] || root;
	    }
	  }

	  return root;
	} // add selectors/cssText to node tree

	/**
	 * @param {StyleNode} node
	 * @param {string} text
	 * @return {StyleNode}
	 */


	function parseCss(node, text) {
	  var t = text.substring(node['start'], node['end'] - 1);
	  node['parsedCssText'] = node['cssText'] = t.trim();

	  if (node['parent']) {
	    var ss = node['previous'] ? node['previous']['end'] : node['parent']['start'];
	    t = text.substring(ss, node['start'] - 1);
	    t = _expandUnicodeEscapes(t);
	    t = t.replace(RX.multipleSpaces, ' '); // TODO(sorvell): ad hoc; make selector include only after last ;
	    // helps with mixin syntax

	    t = t.substring(t.lastIndexOf(';') + 1);
	    var s = node['parsedSelector'] = node['selector'] = t.trim();
	    node['atRule'] = s.indexOf(AT_START) === 0; // note, support a subset of rule types...

	    if (node['atRule']) {
	      if (s.indexOf(MEDIA_START) === 0) {
	        node['type'] = types.MEDIA_RULE;
	      } else if (s.match(RX.keyframesRule)) {
	        node['type'] = types.KEYFRAMES_RULE;
	        node['keyframesName'] = node['selector'].split(RX.multipleSpaces).pop();
	      }
	    } else {
	      if (s.indexOf(VAR_START) === 0) {
	        node['type'] = types.MIXIN_RULE;
	      } else {
	        node['type'] = types.STYLE_RULE;
	      }
	    }
	  }

	  var r$ = node['rules'];

	  if (r$) {
	    for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
	      parseCss(r, text);
	    }
	  }

	  return node;
	}
	/**
	 * conversion of sort unicode escapes with spaces like `\33 ` (and longer) into
	 * expanded form that doesn't require trailing space `\000033`
	 * @param {string} s
	 * @return {string}
	 */


	function _expandUnicodeEscapes(s) {
	  return s.replace(/\\([0-9a-f]{1,6})\s/gi, function () {
	    var code = arguments[1],
	        repeat = 6 - code.length;

	    while (repeat--) {
	      code = '0' + code;
	    }

	    return '\\' + code;
	  });
	}
	/**
	 * stringify parsed css.
	 * @param {StyleNode} node
	 * @param {boolean=} preserveProperties
	 * @param {string=} text
	 * @return {string}
	 */


	function stringify(node, preserveProperties) {
	  var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  // calc rule cssText
	  var cssText = '';

	  if (node['cssText'] || node['rules']) {
	    var r$ = node['rules'];

	    if (r$ && !_hasMixinRules(r$)) {
	      for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
	        cssText = stringify(r, preserveProperties, cssText);
	      }
	    } else {
	      cssText = preserveProperties ? node['cssText'] : removeCustomProps(node['cssText']);
	      cssText = cssText.trim();

	      if (cssText) {
	        cssText = '  ' + cssText + '\n';
	      }
	    }
	  } // emit rule if there is cssText


	  if (cssText) {
	    if (node['selector']) {
	      text += node['selector'] + ' ' + OPEN_BRACE + '\n';
	    }

	    text += cssText;

	    if (node['selector']) {
	      text += CLOSE_BRACE + '\n\n';
	    }
	  }

	  return text;
	}
	/**
	 * @param {Array<StyleNode>} rules
	 * @return {boolean}
	 */

	function _hasMixinRules(rules) {
	  var r = rules[0];
	  return Boolean(r) && Boolean(r['selector']) && r['selector'].indexOf(VAR_START) === 0;
	}
	/**
	 * @param {string} cssText
	 * @return {string}
	 */


	function removeCustomProps(cssText) {
	  cssText = removeCustomPropAssignment(cssText);
	  return removeCustomPropApply(cssText);
	}
	/**
	 * @param {string} cssText
	 * @return {string}
	 */


	function removeCustomPropAssignment(cssText) {
	  return cssText.replace(RX.customProp, '').replace(RX.mixinProp, '');
	}
	/**
	 * @param {string} cssText
	 * @return {string}
	 */

	function removeCustomPropApply(cssText) {
	  return cssText.replace(RX.mixinApply, '').replace(RX.varApply, '');
	}
	/** @enum {number} */


	var types = {
	  STYLE_RULE: 1,
	  KEYFRAMES_RULE: 7,
	  MEDIA_RULE: 4,
	  MIXIN_RULE: 1000
	};
	var OPEN_BRACE = '{';
	var CLOSE_BRACE = '}'; // helper regexp's

	var RX = {
	  comments: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,
	  port: /@import[^;]*;/gim,
	  customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
	  mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
	  mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
	  varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
	  keyframesRule: /^@[^\s]*keyframes/,
	  multipleSpaces: /\s+/g
	};
	var VAR_START = '--';
	var MEDIA_START = '@media';
	var AT_START = '@';

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	var nativeShadow = !(window['ShadyDOM'] && window['ShadyDOM']['inUse']);
	var nativeCssVariables_;
	/**
	 * @param {(ShadyCSSOptions | ShadyCSSInterface)=} settings
	 */

	function calcCssVariables(settings) {
	  if (settings && settings['shimcssproperties']) {
	    nativeCssVariables_ = false;
	  } else {
	    // chrome 49 has semi-working css vars, check if box-shadow works
	    // safari 9.1 has a recalc bug: https://bugs.webkit.org/show_bug.cgi?id=155782
	    // However, shim css custom properties are only supported with ShadyDOM enabled,
	    // so fall back on native if we do not detect ShadyDOM
	    // Edge 15: custom properties used in ::before and ::after will also be used in the parent element
	    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12414257/
	    nativeCssVariables_ = nativeShadow || Boolean(!navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports('box-shadow', '0 0 0 var(--foo)'));
	  }
	}
	/** @type {string | undefined} */


	var cssBuild;

	if (window.ShadyCSS && window.ShadyCSS.cssBuild !== undefined) {
	  cssBuild = window.ShadyCSS.cssBuild;
	}
	/** @type {boolean} */


	var disableRuntime = Boolean(window.ShadyCSS && window.ShadyCSS.disableRuntime);

	if (window.ShadyCSS && window.ShadyCSS.nativeCss !== undefined) {
	  nativeCssVariables_ = window.ShadyCSS.nativeCss;
	} else if (window.ShadyCSS) {
	  calcCssVariables(window.ShadyCSS); // reset window variable to let ShadyCSS API take its place

	  window.ShadyCSS = undefined;
	} else {
	  calcCssVariables(window['WebComponents'] && window['WebComponents']['flags']);
	} // Hack for type error under new type inference which doesn't like that
	// nativeCssVariables is updated in a function and assigns the type
	// `function(): ?` instead of `boolean`.


	var nativeCssVariables =
	/** @type {boolean} */
	nativeCssVariables_;

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var VAR_ASSIGN = /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};{])+)|\{([^}]*)\}(?:(?=[;\s}])|$))/gi;
	var MIXIN_MATCH = /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi;
	var VAR_CONSUMED = /(--[\w-]+)\s*([:,;)]|$)/gi;
	var ANIMATION_MATCH = /(animation\s*:)|(animation-name\s*:)/;
	var MEDIA_MATCH = /@media\s(.*)/;
	var BRACKETED = /\{[^}]*\}/g;
	var HOST_PREFIX = '(?:^|[^.#[:])';
	var HOST_SUFFIX = '($|[.:[\\s>+~])';

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/** @type {!Set<string>} */

	var styleTextSet = new Set();
	var scopingAttribute = 'shady-unscoped';
	/**
	 * Add a specifically-marked style to the document directly, and only one copy of that style.
	 *
	 * @param {!HTMLStyleElement} style
	 * @return {undefined}
	 */

	function processUnscopedStyle(style) {
	  var text = style.textContent;

	  if (!styleTextSet.has(text)) {
	    styleTextSet.add(text);
	    var newStyle = style.cloneNode(true);
	    document.head.appendChild(newStyle);
	  }
	}
	/**
	 * Check if a style is supposed to be unscoped
	 * @param {!HTMLStyleElement} style
	 * @return {boolean} true if the style has the unscoping attribute
	 */

	function isUnscopedStyle(style) {
	  return style.hasAttribute(scopingAttribute);
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/**
	 * @param {string|StyleNode} rules
	 * @param {function(StyleNode)=} callback
	 * @return {string}
	 */

	function toCssText(rules, callback) {
	  if (!rules) {
	    return '';
	  }

	  if (typeof rules === 'string') {
	    rules = parse(rules);
	  }

	  if (callback) {
	    forEachRule(rules, callback);
	  }

	  return stringify(rules, nativeCssVariables);
	}
	/**
	 * @param {HTMLStyleElement} style
	 * @return {StyleNode}
	 */

	function rulesForStyle(style) {
	  if (!style['__cssRules'] && style.textContent) {
	    style['__cssRules'] = parse(style.textContent);
	  }

	  return style['__cssRules'] || null;
	} // Tests if a rule is a keyframes selector, which looks almost exactly
	// like a normal selector but is not (it has nothing to do with scoping
	// for example).

	/**
	 * @param {StyleNode} rule
	 * @return {boolean}
	 */

	function isKeyframesSelector(rule) {
	  return Boolean(rule['parent']) && rule['parent']['type'] === types.KEYFRAMES_RULE;
	}
	/**
	 * @param {StyleNode} node
	 * @param {Function=} styleRuleCallback
	 * @param {Function=} keyframesRuleCallback
	 * @param {boolean=} onlyActiveRules
	 */

	function forEachRule(node, styleRuleCallback, keyframesRuleCallback, onlyActiveRules) {
	  if (!node) {
	    return;
	  }

	  var skipRules = false;
	  var type = node['type'];

	  if (onlyActiveRules) {
	    if (type === types.MEDIA_RULE) {
	      var matchMedia = node['selector'].match(MEDIA_MATCH);

	      if (matchMedia) {
	        // if rule is a non matching @media rule, skip subrules
	        if (!window.matchMedia(matchMedia[1]).matches) {
	          skipRules = true;
	        }
	      }
	    }
	  }

	  if (type === types.STYLE_RULE) {
	    styleRuleCallback(node);
	  } else if (keyframesRuleCallback && type === types.KEYFRAMES_RULE) {
	    keyframesRuleCallback(node);
	  } else if (type === types.MIXIN_RULE) {
	    skipRules = true;
	  }

	  var r$ = node['rules'];

	  if (r$ && !skipRules) {
	    for (var i = 0, l = r$.length, r; i < l && (r = r$[i]); i++) {
	      forEachRule(r, styleRuleCallback, keyframesRuleCallback, onlyActiveRules);
	    }
	  }
	} // add a string of cssText to the document.

	/**
	 * @param {string} cssText
	 * @param {string} moniker
	 * @param {Node} target
	 * @param {Node} contextNode
	 * @return {HTMLStyleElement}
	 */

	function applyCss(cssText, moniker, target, contextNode) {
	  var style = createScopeStyle(cssText, moniker);
	  applyStyle(style, target, contextNode);
	  return style;
	}
	/**
	 * @param {string} cssText
	 * @param {string} moniker
	 * @return {HTMLStyleElement}
	 */

	function createScopeStyle(cssText, moniker) {
	  var style =
	  /** @type {HTMLStyleElement} */
	  document.createElement('style');

	  if (moniker) {
	    style.setAttribute('scope', moniker);
	  }

	  style.textContent = cssText;
	  return style;
	}
	/**
	 * Track the position of the last added style for placing placeholders
	 * @type {Node}
	 */

	var lastHeadApplyNode = null; // insert a comment node as a styling position placeholder.

	/**
	 * @param {string} moniker
	 * @return {!Comment}
	 */

	function applyStylePlaceHolder(moniker) {
	  var placeHolder = document.createComment(' Shady DOM styles for ' + moniker + ' ');
	  var after = lastHeadApplyNode ? lastHeadApplyNode['nextSibling'] : null;
	  var scope = document.head;
	  scope.insertBefore(placeHolder, after || scope.firstChild);
	  lastHeadApplyNode = placeHolder;
	  return placeHolder;
	}
	/**
	 * @param {HTMLStyleElement} style
	 * @param {?Node} target
	 * @param {?Node} contextNode
	 */

	function applyStyle(style, target, contextNode) {
	  target = target || document.head;
	  var after = contextNode && contextNode.nextSibling || target.firstChild;
	  target.insertBefore(style, after);

	  if (!lastHeadApplyNode) {
	    lastHeadApplyNode = style;
	  } else {
	    // only update lastHeadApplyNode if the new style is inserted after the old lastHeadApplyNode
	    var position = style.compareDocumentPosition(lastHeadApplyNode);

	    if (position === Node.DOCUMENT_POSITION_PRECEDING) {
	      lastHeadApplyNode = style;
	    }
	  }
	}
	/**
	 * Walk from text[start] matching parens and
	 * returns position of the outer end paren
	 * @param {string} text
	 * @param {number} start
	 * @return {number}
	 */

	function findMatchingParen(text, start) {
	  var level = 0;

	  for (var i = start, l = text.length; i < l; i++) {
	    if (text[i] === '(') {
	      level++;
	    } else if (text[i] === ')') {
	      if (--level === 0) {
	        return i;
	      }
	    }
	  }

	  return -1;
	}
	/**
	 * @param {string} str
	 * @param {function(string, string, string, string)} callback
	 */

	function processVariableAndFallback(str, callback) {
	  // find 'var('
	  var start = str.indexOf('var(');

	  if (start === -1) {
	    // no var?, everything is prefix
	    return callback(str, '', '', '');
	  } //${prefix}var(${inner})${suffix}


	  var end = findMatchingParen(str, start + 3);
	  var inner = str.substring(start + 4, end);
	  var prefix = str.substring(0, start); // suffix may have other variables

	  var suffix = processVariableAndFallback(str.substring(end + 1), callback);
	  var comma = inner.indexOf(','); // value and fallback args should be trimmed to match in property lookup

	  if (comma === -1) {
	    // variable, no fallback
	    return callback(prefix, inner.trim(), '', suffix);
	  } // var(${value},${fallback})


	  var value = inner.substring(0, comma).trim();
	  var fallback = inner.substring(comma + 1).trim();
	  return callback(prefix, value, fallback, suffix);
	}
	/**
	 * @param {Element} element
	 * @param {string} value
	 */

	function setElementClassRaw(element, value) {
	  // use native setAttribute provided by ShadyDOM when setAttribute is patched
	  if (nativeShadow) {
	    element.setAttribute('class', value);
	  } else {
	    window['ShadyDOM']['nativeMethods']['setAttribute'].call(element, 'class', value);
	  }
	}
	/**
	 * @type {function(*):*}
	 */

	var wrap$2 = window['ShadyDOM'] && window['ShadyDOM']['wrap'] || function (node) {
	  return node;
	};
	/**
	 * @param {Element | {is: string, extends: string}} element
	 * @return {{is: string, typeExtension: string}}
	 */

	function getIsExtends(element) {
	  var localName = element['localName'];
	  var is = '',
	      typeExtension = '';
	  /*
	  NOTE: technically, this can be wrong for certain svg elements
	  with `-` in the name like `<font-face>`
	  */

	  if (localName) {
	    if (localName.indexOf('-') > -1) {
	      is = localName;
	    } else {
	      typeExtension = localName;
	      is = element.getAttribute && element.getAttribute('is') || '';
	    }
	  } else {
	    is =
	    /** @type {?} */
	    element.is;
	    typeExtension =
	    /** @type {?} */
	    element.extends;
	  }

	  return {
	    is: is,
	    typeExtension: typeExtension
	  };
	}
	/**
	 * @param {Element|DocumentFragment} element
	 * @return {string}
	 */

	function gatherStyleText(element) {
	  /** @type {!Array<string>} */
	  var styleTextParts = [];
	  var styles =
	  /** @type {!NodeList<!HTMLStyleElement>} */
	  element.querySelectorAll('style');

	  for (var i = 0; i < styles.length; i++) {
	    var style = styles[i];

	    if (isUnscopedStyle(style)) {
	      if (!nativeShadow) {
	        processUnscopedStyle(style);
	        style.parentNode.removeChild(style);
	      }
	    } else {
	      styleTextParts.push(style.textContent);
	      style.parentNode.removeChild(style);
	    }
	  }

	  return styleTextParts.join('').trim();
	}
	/**
	 * Split a selector separated by commas into an array in a smart way
	 * @param {string} selector
	 * @return {!Array<string>}
	 */

	function splitSelectorList(selector) {
	  var parts = [];
	  var part = '';

	  for (var i = 0; i >= 0 && i < selector.length; i++) {
	    // A selector with parentheses will be one complete part
	    if (selector[i] === '(') {
	      // find the matching paren
	      var end = findMatchingParen(selector, i); // push the paren block into the part

	      part += selector.slice(i, end + 1); // move the index to after the paren block

	      i = end;
	    } else if (selector[i] === ',') {
	      parts.push(part);
	      part = '';
	    } else {
	      part += selector[i];
	    }
	  } // catch any pieces after the last comma


	  if (part) {
	    parts.push(part);
	  }

	  return parts;
	}
	var CSS_BUILD_ATTR = 'css-build';
	/**
	 * Return the polymer-css-build "build type" applied to this element
	 *
	 * @param {!HTMLElement} element
	 * @return {string} Can be "", "shady", or "shadow"
	 */

	function getCssBuild(element) {
	  if (cssBuild !== undefined) {
	    return (
	      /** @type {string} */
	      cssBuild
	    );
	  }

	  if (element.__cssBuild === undefined) {
	    // try attribute first, as it is the common case
	    var attrValue = element.getAttribute(CSS_BUILD_ATTR);

	    if (attrValue) {
	      element.__cssBuild = attrValue;
	    } else {
	      var buildComment = getBuildComment(element);

	      if (buildComment !== '') {
	        // remove build comment so it is not needlessly copied into every element instance
	        removeBuildComment(element);
	      }

	      element.__cssBuild = buildComment;
	    }
	  }

	  return element.__cssBuild || '';
	}
	/**
	 * Check if the given element, either a <template> or <style>, has been processed
	 * by polymer-css-build.
	 *
	 * If so, then we can make a number of optimizations:
	 * - polymer-css-build will decompose mixins into individual CSS Custom Properties,
	 * so the ApplyShim can be skipped entirely.
	 * - Under native ShadowDOM, the style text can just be copied into each instance
	 * without modification
	 * - If the build is "shady" and ShadyDOM is in use, the styling does not need
	 * scoping beyond the shimming of CSS Custom Properties
	 *
	 * @param {!HTMLElement} element
	 * @return {boolean}
	 */

	function elementHasBuiltCss(element) {
	  return getCssBuild(element) !== '';
	}
	/**
	 * For templates made with tagged template literals, polymer-css-build will
	 * insert a comment of the form `<!--css-build:shadow-->`
	 *
	 * @param {!HTMLElement} element
	 * @return {string}
	 */

	function getBuildComment(element) {
	  var buildComment = element.localName === 'template' ?
	  /** @type {!HTMLTemplateElement} */
	  element.content.firstChild : element.firstChild;

	  if (buildComment instanceof Comment) {
	    var commentParts = buildComment.textContent.trim().split(':');

	    if (commentParts[0] === CSS_BUILD_ATTR) {
	      return commentParts[1];
	    }
	  }

	  return '';
	}
	/**
	 * Check if the css build status is optimal, and do no unneeded work.
	 *
	 * @param {string=} cssBuild CSS build status
	 * @return {boolean} css build is optimal or not
	 */

	function isOptimalCssBuild() {
	  var cssBuild = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	  // CSS custom property shim always requires work
	  if (cssBuild === '' || !nativeCssVariables) {
	    return false;
	  }

	  return nativeShadow ? cssBuild === 'shadow' : cssBuild === 'shady';
	}
	/**
	 * @param {!HTMLElement} element
	 */

	function removeBuildComment(element) {
	  var buildComment = element.localName === 'template' ?
	  /** @type {!HTMLTemplateElement} */
	  element.content.firstChild : element.firstChild;
	  buildComment.parentNode.removeChild(buildComment);
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/* Transforms ShadowDOM styling into ShadyDOM styling

	* scoping:

	  * elements in scope get scoping selector class="x-foo-scope"
	  * selectors re-written as follows:

	    div button -> div.x-foo-scope button.x-foo-scope

	* :host -> scopeName

	* :host(...) -> scopeName...

	* ::slotted(...) -> scopeName > ...

	* ...:dir(ltr|rtl) -> [dir="ltr|rtl"] ..., ...[dir="ltr|rtl"]

	* :host(:dir[rtl]) -> scopeName:dir(rtl) -> [dir="rtl"] scopeName, scopeName[dir="rtl"]

	*/

	var SCOPE_NAME = 'style-scope';

	var StyleTransformer =
	/*#__PURE__*/
	function () {
	  function StyleTransformer() {
	    classCallCheck(this, StyleTransformer);
	  }

	  createClass(StyleTransformer, [{
	    key: "dom",

	    /**
	     * Given a node and scope name, add a scoping class to each node
	     * in the tree. This facilitates transforming css into scoped rules.
	     * @param {!Node} node
	     * @param {string} scope
	     * @param {boolean=} shouldRemoveScope
	     * @deprecated
	     */
	    value: function dom(node, scope, shouldRemoveScope) {
	      var _this = this;

	      var fn = function fn(node) {
	        _this.element(node, scope || '', shouldRemoveScope);
	      };

	      this._transformDom(node, fn);
	    }
	    /**
	     * Given a node and scope name, add a scoping class to each node in the tree.
	     * @param {!Node} node
	     * @param {string} scope
	     */

	  }, {
	    key: "domAddScope",
	    value: function domAddScope(node, scope) {
	      var _this2 = this;

	      var fn = function fn(node) {
	        _this2.element(node, scope || '');
	      };

	      this._transformDom(node, fn);
	    }
	    /**
	     * @param {!Node} startNode
	     * @param {!function(!Node)} transformer
	     */

	  }, {
	    key: "_transformDom",
	    value: function _transformDom(startNode, transformer) {
	      if (startNode.nodeType === Node.ELEMENT_NODE) {
	        transformer(startNode);
	      }

	      var c$;

	      if (startNode.localName === 'template') {
	        var template =
	        /** @type {!HTMLTemplateElement} */
	        startNode; // In case the template is in svg context, fall back to the node
	        // since it won't be an HTMLTemplateElement with a .content property

	        c$ = (template.content || template._content || template).childNodes;
	      } else {
	        c$ =
	        /** @type {!ParentNode} */
	        startNode.children || startNode.childNodes;
	      }

	      if (c$) {
	        for (var i = 0; i < c$.length; i++) {
	          this._transformDom(c$[i], transformer);
	        }
	      }
	    }
	    /**
	     * @param {?} element
	     * @param {?} scope
	     * @param {?=} shouldRemoveScope
	     */

	  }, {
	    key: "element",
	    value: function element(_element, scope, shouldRemoveScope) {
	      // note: if using classes, we add both the general 'style-scope' class
	      // as well as the specific scope. This enables easy filtering of all
	      // `style-scope` elements
	      if (scope) {
	        // note: svg on IE does not have classList so fallback to class
	        if (_element.classList) {
	          if (shouldRemoveScope) {
	            _element.classList.remove(SCOPE_NAME);

	            _element.classList.remove(scope);
	          } else {
	            _element.classList.add(SCOPE_NAME);

	            _element.classList.add(scope);
	          }
	        } else if (_element.getAttribute) {
	          var c = _element.getAttribute(CLASS);

	          if (shouldRemoveScope) {
	            if (c) {
	              var newValue = c.replace(SCOPE_NAME, '').replace(scope, '');
	              setElementClassRaw(_element, newValue);
	            }
	          } else {
	            var _newValue = (c ? c + ' ' : '') + SCOPE_NAME + ' ' + scope;

	            setElementClassRaw(_element, _newValue);
	          }
	        }
	      }
	    }
	    /**
	     * Given a node, replace the scoping class to each subnode in the tree.
	     * @param {!Node} node
	     * @param {string} oldScope
	     * @param {string} newScope
	     */

	  }, {
	    key: "domReplaceScope",
	    value: function domReplaceScope(node, oldScope, newScope) {
	      var _this3 = this;

	      var fn = function fn(node) {
	        _this3.element(node, oldScope, true);

	        _this3.element(node, newScope);
	      };

	      this._transformDom(node, fn);
	    }
	    /**
	     * Given a node, remove the scoping class to each subnode in the tree.
	     * @param {!Node} node
	     * @param {string} oldScope
	     */

	  }, {
	    key: "domRemoveScope",
	    value: function domRemoveScope(node, oldScope) {
	      var _this4 = this;

	      var fn = function fn(node) {
	        _this4.element(node, oldScope || '', true);
	      };

	      this._transformDom(node, fn);
	    }
	    /**
	     * @param {?} element
	     * @param {?} styleRules
	     * @param {?=} callback
	     * @param {string=} cssBuild
	     * @param {string=} cssText
	     * @return {string}
	     */

	  }, {
	    key: "elementStyles",
	    value: function elementStyles(element, styleRules, callback) {
	      var cssBuild = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
	      var cssText = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';

	      // no need to shim selectors if settings.useNativeShadow, also
	      // a shady css build will already have transformed selectors
	      // NOTE: This method may be called as part of static or property shimming.
	      // When there is a targeted build it will not be called for static shimming,
	      // but when the property shim is used it is called and should opt out of
	      // static shimming work when a proper build exists.
	      if (cssText === '') {
	        if (nativeShadow || cssBuild === 'shady') {
	          cssText = toCssText(styleRules, callback);
	        } else {
	          var _StyleUtil$getIsExten = getIsExtends(element),
	              is = _StyleUtil$getIsExten.is,
	              typeExtension = _StyleUtil$getIsExten.typeExtension;

	          cssText = this.css(styleRules, is, typeExtension, callback) + '\n\n';
	        }
	      }

	      return cssText.trim();
	    } // Given a string of cssText and a scoping string (scope), returns
	    // a string of scoped css where each selector is transformed to include
	    // a class created from the scope. ShadowDOM selectors are also transformed
	    // (e.g. :host) to use the scoping selector.

	  }, {
	    key: "css",
	    value: function css(rules, scope, ext, callback) {
	      var hostScope = this._calcHostScope(scope, ext);

	      scope = this._calcElementScope(scope);
	      var self = this;
	      return toCssText(rules, function (
	      /** StyleNode */
	      rule) {
	        if (!rule.isScoped) {
	          self.rule(rule, scope, hostScope);
	          rule.isScoped = true;
	        }

	        if (callback) {
	          callback(rule, scope, hostScope);
	        }
	      });
	    }
	  }, {
	    key: "_calcElementScope",
	    value: function _calcElementScope(scope) {
	      if (scope) {
	        return CSS_CLASS_PREFIX + scope;
	      } else {
	        return '';
	      }
	    }
	  }, {
	    key: "_calcHostScope",
	    value: function _calcHostScope(scope, ext) {
	      return ext ? "[is=".concat(scope, "]") : scope;
	    }
	  }, {
	    key: "rule",
	    value: function rule(_rule, scope, hostScope) {
	      this._transformRule(_rule, this._transformComplexSelector, scope, hostScope);
	    }
	    /**
	     * transforms a css rule to a scoped rule.
	     *
	     * @param {StyleNode} rule
	     * @param {Function} transformer
	     * @param {string=} scope
	     * @param {string=} hostScope
	     */

	  }, {
	    key: "_transformRule",
	    value: function _transformRule(rule, transformer, scope, hostScope) {
	      // NOTE: save transformedSelector for subsequent matching of elements
	      // against selectors (e.g. when calculating style properties)
	      rule['selector'] = rule.transformedSelector = this._transformRuleCss(rule, transformer, scope, hostScope);
	    }
	    /**
	     * @param {StyleNode} rule
	     * @param {Function} transformer
	     * @param {string=} scope
	     * @param {string=} hostScope
	     */

	  }, {
	    key: "_transformRuleCss",
	    value: function _transformRuleCss(rule, transformer, scope, hostScope) {
	      var p$ = splitSelectorList(rule['selector']); // we want to skip transformation of rules that appear in keyframes,
	      // because they are keyframe selectors, not element selectors.

	      if (!isKeyframesSelector(rule)) {
	        for (var i = 0, l = p$.length, p; i < l && (p = p$[i]); i++) {
	          p$[i] = transformer.call(this, p, scope, hostScope);
	        }
	      }

	      return p$.filter(function (part) {
	        return Boolean(part);
	      }).join(COMPLEX_SELECTOR_SEP);
	    }
	    /**
	     * @param {string} selector
	     * @return {string}
	     */

	  }, {
	    key: "_twiddleNthPlus",
	    value: function _twiddleNthPlus(selector) {
	      return selector.replace(NTH, function (m, type, inside) {
	        if (inside.indexOf('+') > -1) {
	          inside = inside.replace(/\+/g, '___');
	        } else if (inside.indexOf('___') > -1) {
	          inside = inside.replace(/___/g, '+');
	        }

	        return ":".concat(type, "(").concat(inside, ")");
	      });
	    }
	    /**
	     * Preserve `:matches()` selectors by replacing them with MATCHES_REPLACMENT
	     * and returning an array of `:matches()` selectors.
	     * Use `_replacesMatchesPseudo` to replace the `:matches()` parts
	     *
	     * @param {string} selector
	     * @return {{selector: string, matches: !Array<string>}}
	     */

	  }, {
	    key: "_preserveMatchesPseudo",
	    value: function _preserveMatchesPseudo(selector) {
	      /** @type {!Array<string>} */
	      var matches = [];
	      var match;

	      while (match = selector.match(MATCHES)) {
	        var start = match.index;
	        var end = findMatchingParen(selector, start);

	        if (end === -1) {
	          throw new Error("".concat(match.input, " selector missing ')'"));
	        }

	        var part = selector.slice(start, end + 1);
	        selector = selector.replace(part, MATCHES_REPLACEMENT);
	        matches.push(part);
	      }

	      return {
	        selector: selector,
	        matches: matches
	      };
	    }
	    /**
	     * Replace MATCHES_REPLACMENT character with the given set of `:matches()`
	     * selectors.
	     *
	     * @param {string} selector
	     * @param {!Array<string>} matches
	     * @return {string}
	     */

	  }, {
	    key: "_replaceMatchesPseudo",
	    value: function _replaceMatchesPseudo(selector, matches) {
	      var parts = selector.split(MATCHES_REPLACEMENT);
	      return matches.reduce(function (acc, cur, idx) {
	        return acc + cur + parts[idx + 1];
	      }, parts[0]);
	    }
	    /**
	     * @param {string} selector
	     * @param {string} scope
	     * @param {string=} hostScope
	     */

	  }, {
	    key: "_transformComplexSelector",
	    value: function _transformComplexSelector(selector, scope, hostScope) {
	      var _this5 = this;

	      var stop = false;
	      selector = selector.trim(); // Remove spaces inside of selectors like `:nth-of-type` because it confuses SIMPLE_SELECTOR_SEP

	      var isNth = NTH.test(selector);

	      if (isNth) {
	        selector = selector.replace(NTH, function (m, type, inner) {
	          return ":".concat(type, "(").concat(inner.replace(/\s/g, ''), ")");
	        });
	        selector = this._twiddleNthPlus(selector);
	      } // Preserve selectors like `:-webkit-any` so that SIMPLE_SELECTOR_SEP does
	      // not get confused by spaces inside the pseudo selector


	      var isMatches = MATCHES.test(selector);
	      /** @type {!Array<string>} */

	      var matches;

	      if (isMatches) {
	        var _this$_preserveMatche = this._preserveMatchesPseudo(selector);

	        selector = _this$_preserveMatche.selector;
	        matches = _this$_preserveMatche.matches;
	      }

	      selector = selector.replace(SLOTTED_START, "".concat(HOST, " $1"));
	      selector = selector.replace(SIMPLE_SELECTOR_SEP, function (m, c, s) {
	        if (!stop) {
	          var info = _this5._transformCompoundSelector(s, c, scope, hostScope);

	          stop = stop || info.stop;
	          c = info.combinator;
	          s = info.value;
	        }

	        return c + s;
	      }); // replace `:matches()` selectors

	      if (isMatches) {
	        selector = this._replaceMatchesPseudo(selector, matches);
	      }

	      if (isNth) {
	        selector = this._twiddleNthPlus(selector);
	      }

	      selector = selector.replace(DIR_PAREN, function (m, before, dir, after) {
	        return "[dir=\"".concat(dir, "\"] ").concat(before).concat(after, ", ").concat(before, "[dir=\"").concat(dir, "\"]").concat(after);
	      });
	      return selector;
	    }
	  }, {
	    key: "_transformCompoundSelector",
	    value: function _transformCompoundSelector(selector, combinator, scope, hostScope) {
	      // replace :host with host scoping class
	      var slottedIndex = selector.indexOf(SLOTTED);

	      if (selector.indexOf(HOST) >= 0) {
	        selector = this._transformHostSelector(selector, hostScope); // replace other selectors with scoping class
	      } else if (slottedIndex !== 0) {
	        selector = scope ? this._transformSimpleSelector(selector, scope) : selector;
	      } // mark ::slotted() scope jump to replace with descendant selector + arg
	      // also ignore left-side combinator


	      var slotted = false;

	      if (slottedIndex >= 0) {
	        combinator = '';
	        slotted = true;
	      } // process scope jumping selectors up to the scope jump and then stop


	      var stop;

	      if (slotted) {
	        stop = true;

	        if (slotted) {
	          // .zonk ::slotted(.foo) -> .zonk.scope > .foo
	          selector = selector.replace(SLOTTED_PAREN, function (m, paren) {
	            return " > ".concat(paren);
	          });
	        }
	      }

	      return {
	        value: selector,
	        combinator: combinator,
	        stop: stop
	      };
	    }
	  }, {
	    key: "_transformSimpleSelector",
	    value: function _transformSimpleSelector(selector, scope) {
	      var attributes = selector.split(/(\[.+?\])/);
	      var output = [];

	      for (var i = 0; i < attributes.length; i++) {
	        // Do not attempt to transform any attribute selector content
	        if (i % 2 === 1) {
	          output.push(attributes[i]);
	        } else {
	          var part = attributes[i];

	          if (!(part === '' && i === attributes.length - 1)) {
	            var p$ = part.split(PSEUDO_PREFIX);
	            p$[0] += scope;
	            output.push(p$.join(PSEUDO_PREFIX));
	          }
	        }
	      }

	      return output.join('');
	    } // :host(...) -> scopeName...

	  }, {
	    key: "_transformHostSelector",
	    value: function _transformHostSelector(selector, hostScope) {
	      var m = selector.match(HOST_PAREN);
	      var paren = m && m[2].trim() || '';

	      if (paren) {
	        if (!paren[0].match(SIMPLE_SELECTOR_PREFIX)) {
	          // paren starts with a type selector
	          var typeSelector = paren.split(SIMPLE_SELECTOR_PREFIX)[0]; // if the type selector is our hostScope then avoid pre-pending it

	          if (typeSelector === hostScope) {
	            return paren; // otherwise, this selector should not match in this scope so
	            // output a bogus selector.
	          } else {
	            return SELECTOR_NO_MATCH;
	          }
	        } else {
	          // make sure to do a replace here to catch selectors like:
	          // `:host(.foo)::before`
	          return selector.replace(HOST_PAREN, function (m, host, paren) {
	            return hostScope + paren;
	          });
	        } // if no paren, do a straight :host replacement.
	        // TODO(sorvell): this should not strictly be necessary but
	        // it's needed to maintain support for `:host[foo]` type selectors
	        // which have been improperly used under Shady DOM. This should be
	        // deprecated.

	      } else {
	        return selector.replace(HOST, hostScope);
	      }
	    }
	    /**
	     * @param {StyleNode} rule
	     */

	  }, {
	    key: "documentRule",
	    value: function documentRule(rule) {
	      // reset selector in case this is redone.
	      rule['selector'] = rule['parsedSelector'];
	      this.normalizeRootSelector(rule);

	      this._transformRule(rule, this._transformDocumentSelector);
	    }
	    /**
	     * @param {StyleNode} rule
	     */

	  }, {
	    key: "normalizeRootSelector",
	    value: function normalizeRootSelector(rule) {
	      if (rule['selector'] === ROOT) {
	        rule['selector'] = 'html';
	      }
	    }
	    /**
	     * @param {string} selector
	     */

	  }, {
	    key: "_transformDocumentSelector",
	    value: function _transformDocumentSelector(selector) {
	      if (selector.match(HOST)) {
	        // remove ':host' type selectors in document rules
	        return '';
	      } else if (selector.match(SLOTTED)) {
	        return this._transformComplexSelector(selector, SCOPE_DOC_SELECTOR);
	      } else {
	        return this._transformSimpleSelector(selector.trim(), SCOPE_DOC_SELECTOR);
	      }
	    }
	  }, {
	    key: "SCOPE_NAME",
	    get: function get() {
	      return SCOPE_NAME;
	    }
	  }]);

	  return StyleTransformer;
	}();

	var NTH = /:(nth[-\w]+)\(([^)]+)\)/;
	var SCOPE_DOC_SELECTOR = ":not(.".concat(SCOPE_NAME, ")");
	var COMPLEX_SELECTOR_SEP = ',';
	var SIMPLE_SELECTOR_SEP = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=[])+)/g;
	var SIMPLE_SELECTOR_PREFIX = /[[.:#*]/;
	var HOST = ':host';
	var ROOT = ':root';
	var SLOTTED = '::slotted';
	var SLOTTED_START = new RegExp("^(".concat(SLOTTED, ")")); // NOTE: this supports 1 nested () pair for things like
	// :host(:not([selected]), more general support requires
	// parsing which seems like overkill

	var HOST_PAREN = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/; // similar to HOST_PAREN

	var SLOTTED_PAREN = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/;
	var DIR_PAREN = /(.*):dir\((?:(ltr|rtl))\)(.*)/;
	var CSS_CLASS_PREFIX = '.';
	var PSEUDO_PREFIX = ':';
	var CLASS = 'class';
	var SELECTOR_NO_MATCH = 'should_not_match';
	var MATCHES = /:(?:matches|any|-(?:webkit|moz)-any)/;
	var MATCHES_REPLACEMENT = "\uE000";
	var StyleTransformer$1 = new StyleTransformer();

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	/** @const {string} */

	var infoKey = '__styleInfo';

	var StyleInfo =
	/*#__PURE__*/
	function () {
	  createClass(StyleInfo, null, [{
	    key: "get",

	    /**
	     * @param {Element} node
	     * @return {StyleInfo}
	     */
	    value: function get(node) {
	      if (node) {
	        return node[infoKey];
	      } else {
	        return null;
	      }
	    }
	    /**
	     * @param {!Element} node
	     * @param {StyleInfo} styleInfo
	     * @return {StyleInfo}
	     */

	  }, {
	    key: "set",
	    value: function set(node, styleInfo) {
	      node[infoKey] = styleInfo;
	      return styleInfo;
	    }
	    /**
	     * @param {StyleNode} ast
	     * @param {Node=} placeholder
	     * @param {Array<string>=} ownStylePropertyNames
	     * @param {string=} elementName
	     * @param {string=} typeExtension
	     * @param {string=} cssBuild
	     */

	  }]);

	  function StyleInfo(ast, placeholder, ownStylePropertyNames, elementName, typeExtension, cssBuild) {
	    classCallCheck(this, StyleInfo);

	    /** @type {StyleNode} */
	    this.styleRules = ast || null;
	    /** @type {Node} */

	    this.placeholder = placeholder || null;
	    /** @type {!Array<string>} */

	    this.ownStylePropertyNames = ownStylePropertyNames || [];
	    /** @type {Object} */

	    this.overrideStyleProperties = null;
	    /** @type {string} */

	    this.elementName = elementName || '';
	    /** @type {string} */

	    this.cssBuild = cssBuild || '';
	    /** @type {string} */

	    this.typeExtension = typeExtension || '';
	    /** @type {Object<string, string>} */

	    this.styleProperties = null;
	    /** @type {?string} */

	    this.scopeSelector = null;
	    /** @type {HTMLStyleElement} */

	    this.customStyle = null;
	  }

	  createClass(StyleInfo, [{
	    key: "_getStyleRules",
	    value: function _getStyleRules() {
	      return this.styleRules;
	    }
	  }]);

	  return StyleInfo;
	}();
	StyleInfo.prototype['_getStyleRules'] = StyleInfo.prototype._getStyleRules;

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	/**
	 * @param {string} selector
	 * @return {boolean}
	 * @this {Element}
	 */

	var matchesSelector$1 = function matchesSelector(selector) {
	  var method = this.matches || this.matchesSelector || this.mozMatchesSelector || this.msMatchesSelector || this.oMatchesSelector || this.webkitMatchesSelector;
	  return method && method.call(this, selector);
	};

	var IS_IE$1 = navigator.userAgent.match('Trident');
	var XSCOPE_NAME = 'x-scope';

	var StyleProperties =
	/*#__PURE__*/
	function () {
	  function StyleProperties() {
	    classCallCheck(this, StyleProperties);
	  }

	  createClass(StyleProperties, [{
	    key: "decorateStyles",

	    /**
	     * decorates styles with rule info and returns an array of used style property names
	     *
	     * @param {StyleNode} rules
	     * @return {Array<string>}
	     */
	    value: function decorateStyles(rules) {
	      var self = this,
	          props = {},
	          keyframes = [],
	          ruleIndex = 0;
	      forEachRule(rules, function (rule) {
	        self.decorateRule(rule); // mark in-order position of ast rule in styles block, used for cache key

	        rule.index = ruleIndex++;
	        self.collectPropertiesInCssText(rule.propertyInfo.cssText, props);
	      }, function onKeyframesRule(rule) {
	        keyframes.push(rule);
	      }); // Cache all found keyframes rules for later reference:

	      rules._keyframes = keyframes; // return this list of property names *consumes* in these styles.

	      var names = [];

	      for (var i in props) {
	        names.push(i);
	      }

	      return names;
	    } // decorate a single rule with property info

	  }, {
	    key: "decorateRule",
	    value: function decorateRule(rule) {
	      if (rule.propertyInfo) {
	        return rule.propertyInfo;
	      }

	      var info = {},
	          properties = {};
	      var hasProperties = this.collectProperties(rule, properties);

	      if (hasProperties) {
	        info.properties = properties; // TODO(sorvell): workaround parser seeing mixins as additional rules

	        rule['rules'] = null;
	      }

	      info.cssText = this.collectCssText(rule);
	      rule.propertyInfo = info;
	      return info;
	    } // collects the custom properties from a rule's cssText

	  }, {
	    key: "collectProperties",
	    value: function collectProperties(rule, properties) {
	      var info = rule.propertyInfo;

	      if (info) {
	        if (info.properties) {
	          Object.assign(properties, info.properties);
	          return true;
	        }
	      } else {
	        var m,
	            rx = VAR_ASSIGN;
	        var cssText = rule['parsedCssText'];
	        var value;
	        var any;

	        while (m = rx.exec(cssText)) {
	          // note: group 2 is var, 3 is mixin
	          value = (m[2] || m[3]).trim(); // value of 'inherit' or 'unset' is equivalent to not setting the property here

	          if (value !== 'inherit' || value !== 'unset') {
	            properties[m[1].trim()] = value;
	          }

	          any = true;
	        }

	        return any;
	      }
	    } // returns cssText of properties that consume variables/mixins

	  }, {
	    key: "collectCssText",
	    value: function collectCssText(rule) {
	      return this.collectConsumingCssText(rule['parsedCssText']);
	    } // NOTE: we support consumption inside mixin assignment
	    // but not production, so strip out {...}

	  }, {
	    key: "collectConsumingCssText",
	    value: function collectConsumingCssText(cssText) {
	      return cssText.replace(BRACKETED, '').replace(VAR_ASSIGN, '');
	    }
	  }, {
	    key: "collectPropertiesInCssText",
	    value: function collectPropertiesInCssText(cssText, props) {
	      var m;

	      while (m = VAR_CONSUMED.exec(cssText)) {
	        var name = m[1]; // This regex catches all variable names, and following non-whitespace char
	        // If next char is not ':', then variable is a consumer

	        if (m[2] !== ':') {
	          props[name] = true;
	        }
	      }
	    } // turns custom properties into realized values.

	  }, {
	    key: "reify",
	    value: function reify(props) {
	      // big perf optimization here: reify only *own* properties
	      // since this object has __proto__ of the element's scope properties
	      var names = Object.getOwnPropertyNames(props);

	      for (var i = 0, n; i < names.length; i++) {
	        n = names[i];
	        props[n] = this.valueForProperty(props[n], props);
	      }
	    } // given a property value, returns the reified value
	    // a property value may be:
	    // (1) a literal value like: red or 5px;
	    // (2) a variable value like: var(--a), var(--a, red), or var(--a, --b) or
	    // var(--a, var(--b));
	    // (3) a literal mixin value like { properties }. Each of these properties
	    // can have values that are: (a) literal, (b) variables, (c) @apply mixins.

	  }, {
	    key: "valueForProperty",
	    value: function valueForProperty(property, props) {
	      // case (1) default
	      // case (3) defines a mixin and we have to reify the internals
	      if (property) {
	        if (property.indexOf(';') >= 0) {
	          property = this.valueForProperties(property, props);
	        } else {
	          // case (2) variable
	          var self = this;

	          var fn = function fn(prefix, value, fallback, suffix) {
	            if (!value) {
	              return prefix + suffix;
	            }

	            var propertyValue = self.valueForProperty(props[value], props); // if value is "initial", then the variable should be treated as unset

	            if (!propertyValue || propertyValue === 'initial') {
	              // fallback may be --a or var(--a) or literal
	              propertyValue = self.valueForProperty(props[fallback] || fallback, props) || fallback;
	            } else if (propertyValue === 'apply-shim-inherit') {
	              // CSS build will replace `inherit` with `apply-shim-inherit`
	              // for use with native css variables.
	              // Since we have full control, we can use `inherit` directly.
	              propertyValue = 'inherit';
	            }

	            return prefix + (propertyValue || '') + suffix;
	          };

	          property = processVariableAndFallback(property, fn);
	        }
	      }

	      return property && property.trim() || '';
	    } // note: we do not yet support mixin within mixin

	  }, {
	    key: "valueForProperties",
	    value: function valueForProperties(property, props) {
	      var parts = property.split(';');

	      for (var i = 0, p, m; i < parts.length; i++) {
	        if (p = parts[i]) {
	          MIXIN_MATCH.lastIndex = 0;
	          m = MIXIN_MATCH.exec(p);

	          if (m) {
	            p = this.valueForProperty(props[m[1]], props);
	          } else {
	            var colon = p.indexOf(':');

	            if (colon !== -1) {
	              var pp = p.substring(colon);
	              pp = pp.trim();
	              pp = this.valueForProperty(pp, props) || pp;
	              p = p.substring(0, colon) + pp;
	            }
	          }

	          parts[i] = p && p.lastIndexOf(';') === p.length - 1 ? // strip trailing ;
	          p.slice(0, -1) : p || '';
	        }
	      }

	      return parts.join(';');
	    }
	  }, {
	    key: "applyProperties",
	    value: function applyProperties(rule, props) {
	      var output = ''; // dynamically added sheets may not be decorated so ensure they are.

	      if (!rule.propertyInfo) {
	        this.decorateRule(rule);
	      }

	      if (rule.propertyInfo.cssText) {
	        output = this.valueForProperties(rule.propertyInfo.cssText, props);
	      }

	      rule['cssText'] = output;
	    } // Apply keyframe transformations to the cssText of a given rule. The
	    // keyframeTransforms object is a map of keyframe names to transformer
	    // functions which take in cssText and spit out transformed cssText.

	  }, {
	    key: "applyKeyframeTransforms",
	    value: function applyKeyframeTransforms(rule, keyframeTransforms) {
	      var input = rule['cssText'];
	      var output = rule['cssText'];

	      if (rule.hasAnimations == null) {
	        // Cache whether or not the rule has any animations to begin with:
	        rule.hasAnimations = ANIMATION_MATCH.test(input);
	      } // If there are no animations referenced, we can skip transforms:


	      if (rule.hasAnimations) {
	        var transform; // If we haven't transformed this rule before, we iterate over all
	        // transforms:

	        if (rule.keyframeNamesToTransform == null) {
	          rule.keyframeNamesToTransform = [];

	          for (var keyframe in keyframeTransforms) {
	            transform = keyframeTransforms[keyframe];
	            output = transform(input); // If the transform actually changed the CSS text, we cache the
	            // transform name for future use:

	            if (input !== output) {
	              input = output;
	              rule.keyframeNamesToTransform.push(keyframe);
	            }
	          }
	        } else {
	          // If we already have a list of keyframe names that apply to this
	          // rule, we apply only those keyframe name transforms:
	          for (var i = 0; i < rule.keyframeNamesToTransform.length; ++i) {
	            transform = keyframeTransforms[rule.keyframeNamesToTransform[i]];
	            input = transform(input);
	          }

	          output = input;
	        }
	      }

	      rule['cssText'] = output;
	    } // Test if the rules in these styles matches the given `element` and if so,
	    // collect any custom properties into `props`.

	    /**
	     * @param {StyleNode} rules
	     * @param {Element} element
	     */

	  }, {
	    key: "propertyDataFromStyles",
	    value: function propertyDataFromStyles(rules, element) {
	      var _this = this;

	      var props = {}; // generates a unique key for these matches

	      var o = []; // note: active rules excludes non-matching @media rules

	      forEachRule(rules, function (rule) {
	        // TODO(sorvell): we could trim the set of rules at declaration
	        // time to only include ones that have properties
	        if (!rule.propertyInfo) {
	          _this.decorateRule(rule);
	        } // match element against transformedSelector: selector may contain
	        // unwanted uniquification and parsedSelector does not directly match
	        // for :host selectors.


	        var selectorToMatch = rule.transformedSelector || rule['parsedSelector'];

	        if (element && rule.propertyInfo.properties && selectorToMatch) {
	          if (matchesSelector$1.call(element, selectorToMatch)) {
	            _this.collectProperties(rule, props); // produce numeric key for these matches for lookup


	            addToBitMask(rule.index, o);
	          }
	        }
	      }, null, true);
	      return {
	        properties: props,
	        key: o
	      };
	    }
	    /**
	     * @param {Element} scope
	     * @param {StyleNode} rule
	     * @param {string} cssBuild
	     * @param {function(Object)} callback
	     */

	  }, {
	    key: "whenHostOrRootRule",
	    value: function whenHostOrRootRule(scope, rule, cssBuild, callback) {
	      if (!rule.propertyInfo) {
	        this.decorateRule(rule);
	      }

	      if (!rule.propertyInfo.properties) {
	        return;
	      }

	      var _StyleUtil$getIsExten = getIsExtends(scope),
	          is = _StyleUtil$getIsExten.is,
	          typeExtension = _StyleUtil$getIsExten.typeExtension;

	      var hostScope = is ? StyleTransformer$1._calcHostScope(is, typeExtension) : 'html';
	      var parsedSelector = rule['parsedSelector'];
	      var isRoot = parsedSelector === ':host > *' || parsedSelector === 'html';
	      var isHost = parsedSelector.indexOf(':host') === 0 && !isRoot; // build info is either in scope (when scope is an element) or in the style
	      // when scope is the default scope; note: this allows default scope to have
	      // mixed mode built and unbuilt styles.

	      if (cssBuild === 'shady') {
	        // :root -> x-foo > *.x-foo for elements and html for custom-style
	        isRoot = parsedSelector === hostScope + ' > *.' + hostScope || parsedSelector.indexOf('html') !== -1; // :host -> x-foo for elements, but sub-rules have .x-foo in them

	        isHost = !isRoot && parsedSelector.indexOf(hostScope) === 0;
	      }

	      if (!isRoot && !isHost) {
	        return;
	      }

	      var selectorToMatch = hostScope;

	      if (isHost) {
	        // need to transform :host because `:host` does not work with `matches`
	        if (!rule.transformedSelector) {
	          // transform :host into a matchable selector
	          rule.transformedSelector = StyleTransformer$1._transformRuleCss(rule, StyleTransformer$1._transformComplexSelector, StyleTransformer$1._calcElementScope(is), hostScope);
	        }

	        selectorToMatch = rule.transformedSelector || hostScope;
	      }

	      callback({
	        selector: selectorToMatch,
	        isHost: isHost,
	        isRoot: isRoot
	      });
	    }
	    /**
	     * @param {Element} scope
	     * @param {StyleNode} rules
	     * @param {string} cssBuild
	     * @return {Object}
	     */

	  }, {
	    key: "hostAndRootPropertiesForScope",
	    value: function hostAndRootPropertiesForScope(scope, rules, cssBuild) {
	      var _this2 = this;

	      var hostProps = {},
	          rootProps = {}; // note: active rules excludes non-matching @media rules

	      forEachRule(rules, function (rule) {
	        // if scope is StyleDefaults, use _element for matchesSelector
	        _this2.whenHostOrRootRule(scope, rule, cssBuild, function (info) {
	          var element = scope._element || scope;

	          if (matchesSelector$1.call(element, info.selector)) {
	            if (info.isHost) {
	              _this2.collectProperties(rule, hostProps);
	            } else {
	              _this2.collectProperties(rule, rootProps);
	            }
	          }
	        });
	      }, null, true);
	      return {
	        rootProps: rootProps,
	        hostProps: hostProps
	      };
	    }
	    /**
	     * @param {Element} element
	     * @param {Object} properties
	     * @param {string} scopeSelector
	     */

	  }, {
	    key: "transformStyles",
	    value: function transformStyles(element, properties, scopeSelector) {
	      var self = this;

	      var _StyleUtil$getIsExten2 = getIsExtends(element),
	          is = _StyleUtil$getIsExten2.is,
	          typeExtension = _StyleUtil$getIsExten2.typeExtension;

	      var hostSelector = StyleTransformer$1._calcHostScope(is, typeExtension);

	      var rxHostSelector = element.extends ? '\\' + hostSelector.slice(0, -1) + '\\]' : hostSelector;
	      var hostRx = new RegExp(HOST_PREFIX + rxHostSelector + HOST_SUFFIX);

	      var _StyleInfo$get = StyleInfo.get(element),
	          rules = _StyleInfo$get.styleRules,
	          cssBuild = _StyleInfo$get.cssBuild;

	      var keyframeTransforms = this._elementKeyframeTransforms(element, rules, scopeSelector);

	      return StyleTransformer$1.elementStyles(element, rules, function (rule) {
	        self.applyProperties(rule, properties);

	        if (!nativeShadow && !isKeyframesSelector(rule) && rule['cssText']) {
	          // NOTE: keyframe transforms only scope munge animation names, so it
	          // is not necessary to apply them in ShadowDOM.
	          self.applyKeyframeTransforms(rule, keyframeTransforms);

	          self._scopeSelector(rule, hostRx, hostSelector, scopeSelector);
	        }
	      }, cssBuild);
	    }
	    /**
	     * @param {Element} element
	     * @param {StyleNode} rules
	     * @param {string} scopeSelector
	     * @return {Object}
	     */

	  }, {
	    key: "_elementKeyframeTransforms",
	    value: function _elementKeyframeTransforms(element, rules, scopeSelector) {
	      var keyframesRules = rules._keyframes;
	      var keyframeTransforms = {};

	      if (!nativeShadow && keyframesRules) {
	        // For non-ShadowDOM, we transform all known keyframes rules in
	        // advance for the current scope. This allows us to catch keyframes
	        // rules that appear anywhere in the stylesheet:
	        for (var i = 0, keyframesRule = keyframesRules[i]; i < keyframesRules.length; keyframesRule = keyframesRules[++i]) {
	          this._scopeKeyframes(keyframesRule, scopeSelector);

	          keyframeTransforms[keyframesRule['keyframesName']] = this._keyframesRuleTransformer(keyframesRule);
	        }
	      }

	      return keyframeTransforms;
	    } // Generate a factory for transforming a chunk of CSS text to handle a
	    // particular scoped keyframes rule.

	    /**
	     * @param {StyleNode} keyframesRule
	     * @return {function(string):string}
	     */

	  }, {
	    key: "_keyframesRuleTransformer",
	    value: function _keyframesRuleTransformer(keyframesRule) {
	      return function (cssText) {
	        return cssText.replace(keyframesRule.keyframesNameRx, keyframesRule.transformedKeyframesName);
	      };
	    }
	    /**
	     * Transforms `@keyframes` names to be unique for the current host.
	     * Example: @keyframes foo-anim -> @keyframes foo-anim-x-foo-0
	     *
	     * @param {StyleNode} rule
	     * @param {string} scopeId
	     */

	  }, {
	    key: "_scopeKeyframes",
	    value: function _scopeKeyframes(rule, scopeId) {
	      // Animation names are of the form [\w-], so ensure that the name regex does not partially apply
	      // to similarly named keyframe names by checking for a word boundary at the beginning and
	      // a non-word boundary or `-` at the end.
	      rule.keyframesNameRx = new RegExp("\\b".concat(rule['keyframesName'], "(?!\\B|-)"), 'g');
	      rule.transformedKeyframesName = rule['keyframesName'] + '-' + scopeId;
	      rule.transformedSelector = rule.transformedSelector || rule['selector'];
	      rule['selector'] = rule.transformedSelector.replace(rule['keyframesName'], rule.transformedKeyframesName);
	    } // Strategy: x scope shim a selector e.g. to scope `.x-foo-42` (via classes):
	    // non-host selector: .a.x-foo -> .x-foo-42 .a.x-foo
	    // host selector: x-foo.wide -> .x-foo-42.wide
	    // note: we use only the scope class (.x-foo-42) and not the hostSelector
	    // (x-foo) to scope :host rules; this helps make property host rules
	    // have low specificity. They are overrideable by class selectors but,
	    // unfortunately, not by type selectors (e.g. overriding via
	    // `.special` is ok, but not by `x-foo`).

	    /**
	     * @param {StyleNode} rule
	     * @param {RegExp} hostRx
	     * @param {string} hostSelector
	     * @param {string} scopeId
	     */

	  }, {
	    key: "_scopeSelector",
	    value: function _scopeSelector(rule, hostRx, hostSelector, scopeId) {
	      rule.transformedSelector = rule.transformedSelector || rule['selector'];
	      var selector = rule.transformedSelector;
	      var scope = '.' + scopeId;
	      var parts = splitSelectorList(selector);

	      for (var i = 0, l = parts.length, p; i < l && (p = parts[i]); i++) {
	        parts[i] = p.match(hostRx) ? p.replace(hostSelector, scope) : scope + ' ' + p;
	      }

	      rule['selector'] = parts.join(',');
	    }
	    /**
	     * @param {Element} element
	     * @param {string} selector
	     * @param {string} old
	     */

	  }, {
	    key: "applyElementScopeSelector",
	    value: function applyElementScopeSelector(element, selector, old) {
	      var c = element.getAttribute('class') || '';
	      var v = c;

	      if (old) {
	        v = c.replace(new RegExp('\\s*' + XSCOPE_NAME + '\\s*' + old + '\\s*', 'g'), ' ');
	      }

	      v += (v ? ' ' : '') + XSCOPE_NAME + ' ' + selector;

	      if (c !== v) {
	        setElementClassRaw(element, v);
	      }
	    }
	    /**
	     * @param {HTMLElement} element
	     * @param {Object} properties
	     * @param {string} selector
	     * @param {HTMLStyleElement} style
	     * @return {HTMLStyleElement}
	     */

	  }, {
	    key: "applyElementStyle",
	    value: function applyElementStyle(element, properties, selector, style) {
	      // calculate cssText to apply
	      var cssText = style ? style.textContent || '' : this.transformStyles(element, properties, selector); // if shady and we have a cached style that is not style, decrement

	      var styleInfo = StyleInfo.get(element);
	      var s = styleInfo.customStyle;

	      if (s && !nativeShadow && s !== style) {
	        s['_useCount']--;

	        if (s['_useCount'] <= 0 && s.parentNode) {
	          s.parentNode.removeChild(s);
	        }
	      } // apply styling always under native or if we generated style
	      // or the cached style is not in document(!)


	      if (nativeShadow) {
	        // update existing style only under native
	        if (styleInfo.customStyle) {
	          styleInfo.customStyle.textContent = cssText;
	          style = styleInfo.customStyle; // otherwise, if we have css to apply, do so
	        } else if (cssText) {
	          // apply css after the scope style of the element to help with
	          // style precedence rules.
	          style = applyCss(cssText, selector, element.shadowRoot, styleInfo.placeholder);
	        }
	      } else {
	        // shady and no cache hit
	        if (!style) {
	          // apply css after the scope style of the element to help with
	          // style precedence rules.
	          if (cssText) {
	            style = applyCss(cssText, selector, null, styleInfo.placeholder);
	          } // shady and cache hit but not in document

	        } else if (!style.parentNode) {
	          if (IS_IE$1 && cssText.indexOf('@media') > -1) {
	            // @media rules may be stale in IE 10 and 11
	            // refresh the text content of the style to revalidate them.
	            style.textContent = cssText;
	          }

	          applyStyle(style, null, styleInfo.placeholder);
	        }
	      } // ensure this style is our custom style and increment its use count.


	      if (style) {
	        style['_useCount'] = style['_useCount'] || 0; // increment use count if we changed styles

	        if (styleInfo.customStyle != style) {
	          style['_useCount']++;
	        }

	        styleInfo.customStyle = style;
	      }

	      return style;
	    }
	    /**
	     * @param {Element} style
	     * @param {Object} properties
	     */

	  }, {
	    key: "applyCustomStyle",
	    value: function applyCustomStyle(style, properties) {
	      var rules = rulesForStyle(
	      /** @type {HTMLStyleElement} */
	      style);
	      var self = this;
	      style.textContent = toCssText(rules, function (
	      /** StyleNode */
	      rule) {
	        var css = rule['cssText'] = rule['parsedCssText'];

	        if (rule.propertyInfo && rule.propertyInfo.cssText) {
	          // remove property assignments
	          // so next function isn't confused
	          // NOTE: we have 3 categories of css:
	          // (1) normal properties,
	          // (2) custom property assignments (--foo: red;),
	          // (3) custom property usage: border: var(--foo); @apply(--foo);
	          // In elements, 1 and 3 are separated for efficiency; here they
	          // are not and this makes this case unique.
	          css = removeCustomPropAssignment(
	          /** @type {string} */
	          css); // replace with reified properties, scenario is same as mixin

	          rule['cssText'] = self.valueForProperties(css, properties);
	        }
	      });
	    }
	  }, {
	    key: "XSCOPE_NAME",
	    get: function get() {
	      return XSCOPE_NAME;
	    }
	  }]);

	  return StyleProperties;
	}();
	/**
	 * @param {number} n
	 * @param {Array<number>} bits
	 */


	function addToBitMask(n, bits) {
	  var o = parseInt(n / 32, 10);
	  var v = 1 << n % 32;
	  bits[o] = (bits[o] || 0) | v;
	}

	var StyleProperties$1 = new StyleProperties();

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/** @type {!Object<string, !Node>} */

	var placeholderMap = {};
	/**
	 * @param {string} elementName
	 * @return {Node}
	 */

	function getStylePlaceholder(elementName) {
	  return placeholderMap[elementName] || null;
	}
	/**
	 * @param {string} elementName
	 */

	function ensureStylePlaceholder(elementName) {
	  if (!placeholderMap[elementName]) {
	    placeholderMap[elementName] = applyStylePlaceHolder(elementName);
	  }
	}
	/**
	 * @const {CustomElementRegistry}
	 */

	var ce = window['customElements'];

	if (ce && !nativeShadow && !disableRuntime) {
	  /**
	   * @const {function(this:CustomElementRegistry, string,function(new:HTMLElement),{extends: string}=)}
	   */
	  var origDefine = ce['define'];
	  /**
	   * @param {string} name
	   * @param {function(new:HTMLElement)} clazz
	   * @param {{extends: string}=} options
	   */

	  var wrappedDefine = function wrappedDefine(name, clazz, options) {
	    ensureStylePlaceholder(name);
	    origDefine.call(
	    /** @type {!CustomElementRegistry} */
	    ce, name, clazz, options);
	  };

	  ce['define'] = wrappedDefine;
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	var StyleCache =
	/*#__PURE__*/
	function () {
	  function StyleCache() {
	    var typeMax = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;

	    classCallCheck(this, StyleCache);

	    // map element name -> [{properties, styleElement, scopeSelector}]
	    this.cache = {};
	    /** @type {number} */

	    this.typeMax = typeMax;
	  }

	  createClass(StyleCache, [{
	    key: "_validate",
	    value: function _validate(cacheEntry, properties, ownPropertyNames) {
	      for (var idx = 0; idx < ownPropertyNames.length; idx++) {
	        var pn = ownPropertyNames[idx];

	        if (cacheEntry.properties[pn] !== properties[pn]) {
	          return false;
	        }
	      }

	      return true;
	    }
	  }, {
	    key: "store",
	    value: function store(tagname, properties, styleElement, scopeSelector) {
	      var list = this.cache[tagname] || [];
	      list.push({
	        properties: properties,
	        styleElement: styleElement,
	        scopeSelector: scopeSelector
	      });

	      if (list.length > this.typeMax) {
	        list.shift();
	      }

	      this.cache[tagname] = list;
	    }
	  }, {
	    key: "fetch",
	    value: function fetch(tagname, properties, ownPropertyNames) {
	      var list = this.cache[tagname];

	      if (!list) {
	        return;
	      } // reverse list for most-recent lookups


	      for (var idx = list.length - 1; idx >= 0; idx--) {
	        var entry = list[idx];

	        if (this._validate(entry, properties, ownPropertyNames)) {
	          return entry;
	        }
	      }
	    }
	  }]);

	  return StyleCache;
	}();

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var flush$1 = function flush() {};
	/**
	 * @param {!Element} element
	 * @return {string}
	 */

	function getClasses(element) {
	  if (element.classList && element.classList.value) {
	    return element.classList.value;
	  } else {
	    // NOTE: className is patched to remove scoping classes in ShadyDOM
	    // use getAttribute('class') instead, which is unpatched
	    return element.getAttribute('class') || '';
	  }
	}

	var scopeRegExp = new RegExp("".concat(StyleTransformer$1.SCOPE_NAME, "\\s*([^\\s]*)"));
	/**
	 * @param {!Element} element
	 * @return {string}
	 */

	function getCurrentScope(element) {
	  var match = getClasses(element).match(scopeRegExp);

	  if (match) {
	    return match[1];
	  } else {
	    return '';
	  }
	}
	/**
	 * @param {!Node} node
	 */

	function getOwnerScope(node) {
	  var ownerRoot = wrap$2(node).getRootNode();

	  if (ownerRoot === node || ownerRoot === node.ownerDocument) {
	    return '';
	  }

	  var host =
	  /** @type {!ShadowRoot} */
	  ownerRoot.host;

	  if (!host) {
	    // this may actually be a document fragment
	    return '';
	  }

	  return getIsExtends(host).is;
	}
	/**
	 * @param {!HTMLElement|!HTMLDocument} element
	 */

	function ensureCorrectSubtreeScoping(element) {
	  // find unscoped subtree nodes
	  var unscopedNodes = window['ShadyDOM']['nativeMethods']['querySelectorAll'].call(element, ":not(.".concat(StyleTransformer$1.SCOPE_NAME, ")"));

	  for (var j = 0; j < unscopedNodes.length; j++) {
	    // it's possible, during large batch inserts, that nodes that aren't
	    // scoped within the current scope were added.
	    // To make sure that any unscoped nodes that were inserted in the current batch are correctly styled,
	    // query all unscoped nodes and force their style-scope to be applied.
	    // This could happen if a sub-element appended an unscoped node in its shadowroot and this function
	    // runs on a parent element of the host of that unscoped node:
	    // parent-element -> element -> unscoped node
	    // Here unscoped node should have the style-scope element, not parent-element.
	    var unscopedNode = unscopedNodes[j];
	    var scopeForPreviouslyUnscopedNode = getOwnerScope(unscopedNode);

	    if (scopeForPreviouslyUnscopedNode) {
	      StyleTransformer$1.element(unscopedNode, scopeForPreviouslyUnscopedNode);
	    }
	  }
	}
	/**
	 * @param {HTMLElement} el
	 * @return {boolean}
	 */

	function isElementWithBuiltCss(el) {
	  if (el.localName === 'style' || el.localName === 'template') {
	    return elementHasBuiltCss(el);
	  }

	  return false;
	}
	/**
	 * @param {Array<MutationRecord|null>|null} mxns
	 */


	function handler(mxns) {
	  for (var x = 0; x < mxns.length; x++) {
	    var mxn = mxns[x];

	    if (mxn.target === document.documentElement || mxn.target === document.head) {
	      continue;
	    }

	    for (var i = 0; i < mxn.addedNodes.length; i++) {
	      var n = mxn.addedNodes[i];

	      if (n.nodeType !== Node.ELEMENT_NODE) {
	        continue;
	      }

	      n =
	      /** @type {HTMLElement} */
	      n; // eslint-disable-line no-self-assign

	      var root = n.getRootNode();
	      var currentScope = getCurrentScope(n); // node was scoped, but now is in document
	      // If this element has built css, we must not remove scoping as this node
	      // will be used as a template or style without re - applying scoping as an optimization

	      if (currentScope && root === n.ownerDocument && !isElementWithBuiltCss(n)) {
	        StyleTransformer$1.domRemoveScope(n, currentScope);
	      } else if (root instanceof ShadowRoot) {
	        var newScope = getOwnerScope(n); // rescope current node and subtree if necessary

	        if (newScope !== currentScope) {
	          StyleTransformer$1.domReplaceScope(n, currentScope, newScope);
	        } // make sure all the subtree elements are scoped correctly


	        ensureCorrectSubtreeScoping(n);
	      }
	    }
	  }
	} // if native Shadow DOM is being used, or ShadyDOM handles dynamic scoiping, do not activate the MutationObserver


	if (!nativeShadow && !(window['ShadyDOM'] && window['ShadyDOM']['handlesDynamicScoping'])) {
	  var observer = new MutationObserver(handler);

	  var start = function start(node) {
	    observer.observe(node, {
	      childList: true,
	      subtree: true
	    });
	  };

	  var nativeCustomElements = window['customElements'] && !window['customElements']['polyfillWrapFlushCallback']; // need to start immediately with native custom elements
	  // TODO(dfreedm): with polyfilled HTMLImports and native custom elements
	  // excessive mutations may be observed; this can be optimized via cooperation
	  // with the HTMLImports polyfill.

	  if (nativeCustomElements) {
	    start(document);
	  } else {
	    var delayedStart = function delayedStart() {
	      start(document.body);
	    }; // use polyfill timing if it's available


	    if (window['HTMLImports']) {
	      window['HTMLImports']['whenReady'](delayedStart); // otherwise push beyond native imports being ready
	      // which requires RAF + readystate interactive.
	    } else {
	      requestAnimationFrame(function () {
	        if (document.readyState === 'loading') {
	          var listener = function listener() {
	            delayedStart();
	            document.removeEventListener('readystatechange', listener);
	          };

	          document.addEventListener('readystatechange', listener);
	        } else {
	          delayedStart();
	        }
	      });
	    }
	  }

	  flush$1 = function flush() {
	    handler(observer.takeRecords());
	  };
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/**
	 * @const {!Object<string, !HTMLTemplateElement>}
	 */

	var templateMap = {};

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	/*
	 * Utilities for handling invalidating apply-shim mixins for a given template.
	 *
	 * The invalidation strategy involves keeping track of the "current" version of a template's mixins, and updating that count when a mixin is invalidated.
	 * The template
	 */

	/** @const {string} */

	var CURRENT_VERSION = '_applyShimCurrentVersion';
	/** @const {string} */

	var NEXT_VERSION = '_applyShimNextVersion';
	/** @const {string} */

	var VALIDATING_VERSION = '_applyShimValidatingVersion';
	/**
	 * @const {Promise<void>}
	 */

	var promise = Promise.resolve();
	/**
	 * @param {string} elementName
	 */

	function invalidate(elementName) {
	  var template = templateMap[elementName];

	  if (template) {
	    invalidateTemplate(template);
	  }
	}
	/**
	 * This function can be called multiple times to mark a template invalid
	 * and signal that the style inside must be regenerated.
	 *
	 * Use `startValidatingTemplate` to begin an asynchronous validation cycle.
	 * During that cycle, call `templateIsValidating` to see if the template must
	 * be revalidated
	 * @param {HTMLTemplateElement} template
	 */

	function invalidateTemplate(template) {
	  // default the current version to 0
	  template[CURRENT_VERSION] = template[CURRENT_VERSION] || 0; // ensure the "validating for" flag exists

	  template[VALIDATING_VERSION] = template[VALIDATING_VERSION] || 0; // increment the next version

	  template[NEXT_VERSION] = (template[NEXT_VERSION] || 0) + 1;
	}
	/**
	 * @param {HTMLTemplateElement} template
	 * @return {boolean}
	 */

	function templateIsValid(template) {
	  return template[CURRENT_VERSION] === template[NEXT_VERSION];
	}
	/**
	 * Returns true if the template is currently invalid and `startValidating` has been called since the last invalidation.
	 * If false, the template must be validated.
	 * @param {HTMLTemplateElement} template
	 * @return {boolean}
	 */

	function templateIsValidating(template) {
	  return !templateIsValid(template) && template[VALIDATING_VERSION] === template[NEXT_VERSION];
	}
	/**
	 * Begin an asynchronous invalidation cycle.
	 * This should be called after every validation of a template
	 *
	 * After one microtask, the template will be marked as valid until the next call to `invalidateTemplate`
	 * @param {HTMLTemplateElement} template
	 */

	function startValidatingTemplate(template) {
	  // remember that the current "next version" is the reason for this validation cycle
	  template[VALIDATING_VERSION] = template[NEXT_VERSION]; // however, there only needs to be one async task to clear the counters

	  if (!template._validating) {
	    template._validating = true;
	    promise.then(function () {
	      // sync the current version to let future invalidations cause a refresh cycle
	      template[CURRENT_VERSION] = template[NEXT_VERSION];
	      template._validating = false;
	    });
	  }
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/**
	 * @param {Element} element
	 * @param {Object=} properties
	 */

	function updateNativeProperties(element, properties) {
	  // remove previous properties
	  for (var p in properties) {
	    // NOTE: for bc with shim, don't apply null values.
	    if (p === null) {
	      element.style.removeProperty(p);
	    } else {
	      element.style.setProperty(p, properties[p]);
	    }
	  }
	}
	/**
	 * return true if `cssText` contains a mixin definition or consumption
	 * @param {string} cssText
	 * @return {boolean}
	 */

	function detectMixin(cssText) {
	  var has = MIXIN_MATCH.test(cssText) || VAR_ASSIGN.test(cssText); // reset state of the regexes

	  MIXIN_MATCH.lastIndex = 0;
	  VAR_ASSIGN.lastIndex = 0;
	  return has;
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/** @type {Promise<void>} */

	var readyPromise = null;
	/** @type {?function(?function())} */

	var whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;
	/** @type {function()} */

	var resolveFn;
	/**
	 * @param {?function()} callback
	 */

	function documentWait(callback) {
	  requestAnimationFrame(function () {
	    if (whenReady) {
	      whenReady(callback);
	    } else {
	      if (!readyPromise) {
	        readyPromise = new Promise(function (resolve) {
	          resolveFn = resolve;
	        });

	        if (document.readyState === 'complete') {
	          resolveFn();
	        } else {
	          document.addEventListener('readystatechange', function () {
	            if (document.readyState === 'complete') {
	              resolveFn();
	            }
	          });
	        }
	      }

	      readyPromise.then(function () {
	        callback && callback();
	      });
	    }
	  });
	}

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	var SEEN_MARKER = '__seenByShadyCSS';
	var CACHED_STYLE = '__shadyCSSCachedStyle';
	/** @type {?function(!HTMLStyleElement)} */

	var transformFn = null;
	/** @type {?function()} */

	var validateFn = null;
	/**
	This interface is provided to add document-level <style> elements to ShadyCSS for processing.
	These styles must be processed by ShadyCSS to simulate ShadowRoot upper-bound encapsulation from outside styles
	In addition, these styles may also need to be processed for @apply rules and CSS Custom Properties

	To add document-level styles to ShadyCSS, one can call `ShadyCSS.addDocumentStyle(styleElement)` or `ShadyCSS.addDocumentStyle({getStyle: () => styleElement})`

	In addition, if the process used to discover document-level styles can be synchronously flushed, one should set `ShadyCSS.documentStyleFlush`.
	This function will be called when calculating styles.

	An example usage of the document-level styling api can be found in `examples/document-style-lib.js`

	@unrestricted
	*/

	var CustomStyleInterface =
	/*#__PURE__*/
	function () {
	  function CustomStyleInterface() {
	    classCallCheck(this, CustomStyleInterface);

	    /** @type {!Array<!CustomStyleProvider>} */
	    this['customStyles'] = [];
	    this['enqueued'] = false; // NOTE(dfreedm): use quotes here to prevent closure inlining to `function(){}`;

	    documentWait(function () {
	      if (window['ShadyCSS']['flushCustomStyles']) {
	        window['ShadyCSS']['flushCustomStyles']();
	      }
	    });
	  }
	  /**
	   * Queue a validation for new custom styles to batch style recalculations
	   */


	  createClass(CustomStyleInterface, [{
	    key: "enqueueDocumentValidation",
	    value: function enqueueDocumentValidation() {
	      if (this['enqueued'] || !validateFn) {
	        return;
	      }

	      this['enqueued'] = true;
	      documentWait(validateFn);
	    }
	    /**
	     * @param {!HTMLStyleElement} style
	     */

	  }, {
	    key: "addCustomStyle",
	    value: function addCustomStyle(style) {
	      if (!style[SEEN_MARKER]) {
	        style[SEEN_MARKER] = true;
	        this['customStyles'].push(style);
	        this.enqueueDocumentValidation();
	      }
	    }
	    /**
	     * @param {!CustomStyleProvider} customStyle
	     * @return {HTMLStyleElement}
	     */

	  }, {
	    key: "getStyleForCustomStyle",
	    value: function getStyleForCustomStyle(customStyle) {
	      if (customStyle[CACHED_STYLE]) {
	        return customStyle[CACHED_STYLE];
	      }

	      var style;

	      if (customStyle['getStyle']) {
	        style = customStyle['getStyle']();
	      } else {
	        style = customStyle;
	      }

	      return style;
	    }
	    /**
	     * @return {!Array<!CustomStyleProvider>}
	     */

	  }, {
	    key: "processStyles",
	    value: function processStyles() {
	      var cs = this['customStyles'];

	      for (var i = 0; i < cs.length; i++) {
	        var customStyle = cs[i];

	        if (customStyle[CACHED_STYLE]) {
	          continue;
	        }

	        var style = this.getStyleForCustomStyle(customStyle);

	        if (style) {
	          // HTMLImports polyfill may have cloned the style into the main document,
	          // which is referenced with __appliedElement.
	          var styleToTransform =
	          /** @type {!HTMLStyleElement} */
	          style['__appliedElement'] || style;

	          if (transformFn) {
	            transformFn(styleToTransform);
	          }

	          customStyle[CACHED_STYLE] = styleToTransform;
	        }
	      }

	      return cs;
	    }
	  }]);

	  return CustomStyleInterface;
	}();
	CustomStyleInterface.prototype['addCustomStyle'] = CustomStyleInterface.prototype.addCustomStyle;
	CustomStyleInterface.prototype['getStyleForCustomStyle'] = CustomStyleInterface.prototype.getStyleForCustomStyle;
	CustomStyleInterface.prototype['processStyles'] = CustomStyleInterface.prototype.processStyles;
	/* eslint-enable no-self-assign */

	Object.defineProperties(CustomStyleInterface.prototype, {
	  'transformCallback': {
	    /** @return {?function(!HTMLStyleElement)} */
	    get: function get() {
	      return transformFn;
	    },

	    /** @param {?function(!HTMLStyleElement)} fn */
	    set: function set(fn) {
	      transformFn = fn;
	    }
	  },
	  'validateCallback': {
	    /** @return {?function()} */
	    get: function get() {
	      return validateFn;
	    },

	    /**
	     * @param {?function()} fn
	     * @this {CustomStyleInterface}
	     */
	    set: function set(fn) {
	      var needsEnqueue = false;

	      if (!validateFn) {
	        needsEnqueue = true;
	      }

	      validateFn = fn;

	      if (needsEnqueue) {
	        this.enqueueDocumentValidation();
	      }
	    }
	  }
	});

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/

	/** @type {!Object<string, string>} */

	var adoptedCssTextMap = {};
	/**
	 * @const {StyleCache}
	 */

	var styleCache = new StyleCache();

	var ScopingShim =
	/*#__PURE__*/
	function () {
	  function ScopingShim() {
	    classCallCheck(this, ScopingShim);

	    this._scopeCounter = {};
	    this._documentOwner =
	    /** @type {!HTMLElement} */
	    document.documentElement;
	    var ast = new StyleNode();
	    ast['rules'] = [];
	    this._documentOwnerStyleInfo = StyleInfo.set(this._documentOwner, new StyleInfo(ast));
	    this._elementsHaveApplied = false;
	    /** @type {?Object} */

	    this._applyShim = null;
	    /** @type {?CustomStyleInterfaceInterface} */

	    this._customStyleInterface = null;
	  }

	  createClass(ScopingShim, [{
	    key: "flush",
	    value: function flush() {
	      flush$1();
	    }
	  }, {
	    key: "_generateScopeSelector",
	    value: function _generateScopeSelector(name) {
	      var id = this._scopeCounter[name] = (this._scopeCounter[name] || 0) + 1;
	      return "".concat(name, "-").concat(id);
	    }
	  }, {
	    key: "getStyleAst",
	    value: function getStyleAst(style) {
	      return rulesForStyle(style);
	    }
	  }, {
	    key: "styleAstToString",
	    value: function styleAstToString(ast) {
	      return toCssText(ast);
	    }
	  }, {
	    key: "_gatherStyles",
	    value: function _gatherStyles(template) {
	      return gatherStyleText(template.content);
	    }
	    /**
	     * Prepare the styling and template for the given element type
	     *
	     * @param {!HTMLTemplateElement} template
	     * @param {string} elementName
	     * @param {string=} typeExtension
	     */

	  }, {
	    key: "prepareTemplate",
	    value: function prepareTemplate(template, elementName, typeExtension) {
	      this.prepareTemplateDom(template, elementName);
	      this.prepareTemplateStyles(template, elementName, typeExtension);
	    }
	    /**
	     * Prepare styling for the given element type
	     * @param {!HTMLTemplateElement} template
	     * @param {string} elementName
	     * @param {string=} typeExtension
	     */

	  }, {
	    key: "prepareTemplateStyles",
	    value: function prepareTemplateStyles(template, elementName, typeExtension) {
	      if (template._prepared || disableRuntime) {
	        return;
	      } // style placeholders are only used when ShadyDOM is active


	      if (!nativeShadow) {
	        ensureStylePlaceholder(elementName);
	      }

	      template._prepared = true;
	      template.name = elementName;
	      template.extends = typeExtension;
	      templateMap[elementName] = template;
	      var cssBuild = getCssBuild(template);
	      var optimalBuild = isOptimalCssBuild(cssBuild);
	      var info = {
	        is: elementName,
	        extends: typeExtension
	      };
	      var cssText = this._gatherStyles(template) + (adoptedCssTextMap[elementName] || ''); // check if the styling has mixin definitions or uses

	      this._ensure();

	      if (!optimalBuild) {
	        var hasMixins = !cssBuild && detectMixin(cssText);
	        var ast = parse(cssText); // only run the applyshim transforms if there is a mixin involved

	        if (hasMixins && nativeCssVariables && this._applyShim) {
	          this._applyShim['transformRules'](ast, elementName);
	        }

	        template['_styleAst'] = ast;
	      }

	      var ownPropertyNames = [];

	      if (!nativeCssVariables) {
	        ownPropertyNames = StyleProperties$1.decorateStyles(template['_styleAst']);
	      }

	      if (!ownPropertyNames.length || nativeCssVariables) {
	        var root = nativeShadow ? template.content : null;
	        var placeholder = getStylePlaceholder(elementName);

	        var style = this._generateStaticStyle(info, template['_styleAst'], root, placeholder, cssBuild, optimalBuild ? cssText : '');

	        template._style = style;
	      }

	      template._ownPropertyNames = ownPropertyNames;
	    }
	    /**
	     * @param {!Array<string>} cssTextArray
	     * @param {string} elementName
	     */

	  }, {
	    key: "prepareAdoptedCssText",
	    value: function prepareAdoptedCssText(cssTextArray, elementName) {
	      adoptedCssTextMap[elementName] = cssTextArray.join(' ');
	    }
	    /**
	     * Prepare template for the given element type
	     * @param {!HTMLTemplateElement} template
	     * @param {string} elementName
	     */

	  }, {
	    key: "prepareTemplateDom",
	    value: function prepareTemplateDom(template, elementName) {
	      if (disableRuntime) {
	        return;
	      }

	      var cssBuild = getCssBuild(template);

	      if (!nativeShadow && cssBuild !== 'shady' && !template._domPrepared) {
	        template._domPrepared = true;
	        StyleTransformer$1.domAddScope(template.content, elementName);
	      }
	    }
	    /**
	     * @param {!{is: string, extends: (string|undefined)}} info
	     * @param {!StyleNode} rules
	     * @param {DocumentFragment} shadowroot
	     * @param {Node} placeholder
	     * @param {string} cssBuild
	     * @param {string=} cssText
	     * @return {?HTMLStyleElement}
	     */

	  }, {
	    key: "_generateStaticStyle",
	    value: function _generateStaticStyle(info, rules, shadowroot, placeholder, cssBuild, cssText) {
	      cssText = StyleTransformer$1.elementStyles(info, rules, null, cssBuild, cssText);

	      if (cssText.length) {
	        return applyCss(cssText, info.is, shadowroot, placeholder);
	      }

	      return null;
	    }
	  }, {
	    key: "_prepareHost",
	    value: function _prepareHost(host) {
	      var _StyleUtil$getIsExten = getIsExtends(host),
	          is = _StyleUtil$getIsExten.is,
	          typeExtension = _StyleUtil$getIsExten.typeExtension;

	      var placeholder = getStylePlaceholder(is);
	      var template = templateMap[is];

	      if (!template) {
	        return;
	      }

	      var ast = template['_styleAst'];
	      var ownStylePropertyNames = template._ownPropertyNames;
	      var cssBuild = getCssBuild(template);
	      var styleInfo = new StyleInfo(ast, placeholder, ownStylePropertyNames, is, typeExtension, cssBuild);
	      StyleInfo.set(host, styleInfo);
	      return styleInfo;
	    }
	  }, {
	    key: "_ensureApplyShim",
	    value: function _ensureApplyShim() {
	      if (this._applyShim) {
	        return;
	      } else if (window.ShadyCSS && window.ShadyCSS.ApplyShim) {
	        this._applyShim =
	        /** @type {!Object} */
	        window.ShadyCSS.ApplyShim;
	        this._applyShim['invalidCallback'] = invalidate;
	      }
	    }
	  }, {
	    key: "_ensureCustomStyleInterface",
	    value: function _ensureCustomStyleInterface() {
	      var _this = this;

	      if (this._customStyleInterface) {
	        return;
	      } else if (window.ShadyCSS && window.ShadyCSS.CustomStyleInterface) {
	        this._customStyleInterface =
	        /** @type {!CustomStyleInterfaceInterface} */
	        window.ShadyCSS.CustomStyleInterface;
	        /** @type {function(!HTMLStyleElement)} */

	        this._customStyleInterface['transformCallback'] = function (style) {
	          _this.transformCustomStyleForDocument(style);
	        };

	        this._customStyleInterface['validateCallback'] = function () {
	          requestAnimationFrame(function () {
	            if (_this._customStyleInterface['enqueued'] || _this._elementsHaveApplied) {
	              _this.flushCustomStyles();
	            }
	          });
	        };
	      }
	    }
	  }, {
	    key: "_ensure",
	    value: function _ensure() {
	      this._ensureApplyShim();

	      this._ensureCustomStyleInterface();
	    }
	    /**
	     * Flush and apply custom styles to document
	     */

	  }, {
	    key: "flushCustomStyles",
	    value: function flushCustomStyles() {
	      if (disableRuntime) {
	        return;
	      }

	      this._ensure();

	      if (!this._customStyleInterface) {
	        return;
	      }

	      var customStyles = this._customStyleInterface['processStyles'](); // early return if custom-styles don't need validation


	      if (!this._customStyleInterface['enqueued']) {
	        return;
	      } // bail if custom styles are built optimally


	      if (isOptimalCssBuild(this._documentOwnerStyleInfo.cssBuild)) {
	        return;
	      }

	      if (!nativeCssVariables) {
	        this._updateProperties(this._documentOwner, this._documentOwnerStyleInfo);

	        this._applyCustomStyles(customStyles);

	        if (this._elementsHaveApplied) {
	          // if custom elements have upgraded and there are no native css variables, we must recalculate the whole tree
	          this.styleDocument();
	        }
	      } else if (!this._documentOwnerStyleInfo.cssBuild) {
	        this._revalidateCustomStyleApplyShim(customStyles);
	      }

	      this._customStyleInterface['enqueued'] = false;
	    }
	    /**
	     * Apply styles for the given element
	     *
	     * @param {!HTMLElement} host
	     * @param {Object=} overrideProps
	     */

	  }, {
	    key: "styleElement",
	    value: function styleElement(host, overrideProps) {
	      if (disableRuntime) {
	        if (overrideProps) {
	          if (!StyleInfo.get(host)) {
	            StyleInfo.set(host, new StyleInfo(null));
	          }

	          var _styleInfo =
	          /** @type {!StyleInfo} */
	          StyleInfo.get(host);

	          this._mixOverrideStyleProps(_styleInfo, overrideProps);

	          this.styleElementNativeVariables(host, _styleInfo);
	        }

	        return;
	      }

	      var styleInfo = StyleInfo.get(host) || this._prepareHost(host); // if there is no style info at this point, bail


	      if (!styleInfo) {
	        return;
	      } // Only trip the `elementsHaveApplied` flag if a node other that the root document has `applyStyle` called


	      if (!this._isRootOwner(host)) {
	        this._elementsHaveApplied = true;
	      }

	      if (overrideProps) {
	        this._mixOverrideStyleProps(styleInfo, overrideProps);
	      }

	      if (!nativeCssVariables) {
	        this.styleElementShimVariables(host, styleInfo);
	      } else {
	        this.styleElementNativeVariables(host, styleInfo);
	      }
	    }
	    /**
	     * @param {!StyleInfo} styleInfo
	     * @param {Object} overrideProps
	     */

	  }, {
	    key: "_mixOverrideStyleProps",
	    value: function _mixOverrideStyleProps(styleInfo, overrideProps) {
	      styleInfo.overrideStyleProperties = styleInfo.overrideStyleProperties || {};
	      Object.assign(styleInfo.overrideStyleProperties, overrideProps);
	    }
	    /**
	     * @param {!HTMLElement} host
	     * @param {!StyleInfo} styleInfo
	     */

	  }, {
	    key: "styleElementShimVariables",
	    value: function styleElementShimVariables(host, styleInfo) {
	      this.flush();

	      this._updateProperties(host, styleInfo);

	      if (styleInfo.ownStylePropertyNames && styleInfo.ownStylePropertyNames.length) {
	        this._applyStyleProperties(host, styleInfo);
	      }
	    }
	    /**
	     * @param {!HTMLElement} host
	     * @param {!StyleInfo} styleInfo
	     */

	  }, {
	    key: "styleElementNativeVariables",
	    value: function styleElementNativeVariables(host, styleInfo) {
	      var _StyleUtil$getIsExten2 = getIsExtends(host),
	          is = _StyleUtil$getIsExten2.is;

	      if (styleInfo.overrideStyleProperties) {
	        updateNativeProperties(host, styleInfo.overrideStyleProperties);
	      }

	      var template = templateMap[is]; // bail early if there is no shadowroot for this element

	      if (!template && !this._isRootOwner(host)) {
	        return;
	      } // bail early if the template was built with polymer-css-build


	      if (template && elementHasBuiltCss(template)) {
	        return;
	      }

	      if (template && template._style && !templateIsValid(template)) {
	        // update template
	        if (!templateIsValidating(template)) {
	          this._ensure();

	          this._applyShim && this._applyShim['transformRules'](template['_styleAst'], is);
	          template._style.textContent = StyleTransformer$1.elementStyles(host, styleInfo.styleRules);
	          startValidatingTemplate(template);
	        } // update instance if native shadowdom


	        if (nativeShadow) {
	          var root = host.shadowRoot;

	          if (root) {
	            var style = root.querySelector('style');

	            if (style) {
	              style.textContent = StyleTransformer$1.elementStyles(host, styleInfo.styleRules);
	            }
	          }
	        }

	        styleInfo.styleRules = template['_styleAst'];
	      }
	    }
	  }, {
	    key: "_styleOwnerForNode",
	    value: function _styleOwnerForNode(node) {
	      var root = wrap$2(node).getRootNode();
	      var host = root.host;

	      if (host) {
	        if (StyleInfo.get(host) || this._prepareHost(host)) {
	          return host;
	        } else {
	          return this._styleOwnerForNode(host);
	        }
	      }

	      return this._documentOwner;
	    }
	  }, {
	    key: "_isRootOwner",
	    value: function _isRootOwner(node) {
	      return node === this._documentOwner;
	    }
	  }, {
	    key: "_applyStyleProperties",
	    value: function _applyStyleProperties(host, styleInfo) {
	      var is = getIsExtends(host).is;
	      var cacheEntry = styleCache.fetch(is, styleInfo.styleProperties, styleInfo.ownStylePropertyNames);
	      var cachedScopeSelector = cacheEntry && cacheEntry.scopeSelector;
	      var cachedStyle = cacheEntry ? cacheEntry.styleElement : null;
	      var oldScopeSelector = styleInfo.scopeSelector; // only generate new scope if cached style is not found

	      styleInfo.scopeSelector = cachedScopeSelector || this._generateScopeSelector(is);
	      var style = StyleProperties$1.applyElementStyle(host, styleInfo.styleProperties, styleInfo.scopeSelector, cachedStyle);

	      if (!nativeShadow) {
	        StyleProperties$1.applyElementScopeSelector(host, styleInfo.scopeSelector, oldScopeSelector);
	      }

	      if (!cacheEntry) {
	        styleCache.store(is, styleInfo.styleProperties, style, styleInfo.scopeSelector);
	      }

	      return style;
	    }
	  }, {
	    key: "_updateProperties",
	    value: function _updateProperties(host, styleInfo) {
	      var owner = this._styleOwnerForNode(host);

	      var ownerStyleInfo = StyleInfo.get(owner);
	      var ownerProperties = ownerStyleInfo.styleProperties; // style owner has not updated properties yet
	      // go up the chain and force property update,
	      // except if the owner is the document

	      if (owner !== this._documentOwner && !ownerProperties) {
	        this._updateProperties(owner, ownerStyleInfo);

	        ownerProperties = ownerStyleInfo.styleProperties;
	      }

	      var props = Object.create(ownerProperties || null);
	      var hostAndRootProps = StyleProperties$1.hostAndRootPropertiesForScope(host, styleInfo.styleRules, styleInfo.cssBuild);
	      var propertyData = StyleProperties$1.propertyDataFromStyles(ownerStyleInfo.styleRules, host);
	      var propertiesMatchingHost = propertyData.properties;
	      Object.assign(props, hostAndRootProps.hostProps, propertiesMatchingHost, hostAndRootProps.rootProps);

	      this._mixinOverrideStyles(props, styleInfo.overrideStyleProperties);

	      StyleProperties$1.reify(props);
	      styleInfo.styleProperties = props;
	    }
	  }, {
	    key: "_mixinOverrideStyles",
	    value: function _mixinOverrideStyles(props, overrides) {
	      for (var p in overrides) {
	        var v = overrides[p]; // skip override props if they are not truthy or 0
	        // in order to fall back to inherited values

	        if (v || v === 0) {
	          props[p] = v;
	        }
	      }
	    }
	    /**
	     * Update styles of the whole document
	     *
	     * @param {Object=} properties
	     */

	  }, {
	    key: "styleDocument",
	    value: function styleDocument(properties) {
	      this.styleSubtree(this._documentOwner, properties);
	    }
	    /**
	     * Update styles of a subtree
	     *
	     * @param {!HTMLElement} host
	     * @param {Object=} properties
	     */

	  }, {
	    key: "styleSubtree",
	    value: function styleSubtree(host, properties) {
	      var wrappedHost = wrap$2(host);
	      var root = wrappedHost.shadowRoot;

	      if (root || this._isRootOwner(host)) {
	        this.styleElement(host, properties);
	      } // process the shadowdom children of `host`


	      var shadowChildren = root && (
	      /** @type {!ParentNode} */
	      root.children || root.childNodes);

	      if (shadowChildren) {
	        for (var i = 0; i < shadowChildren.length; i++) {
	          var c =
	          /** @type {!HTMLElement} */
	          shadowChildren[i];
	          this.styleSubtree(c);
	        }
	      } else {
	        // process the lightdom children of `host`
	        var children = wrappedHost.children || wrappedHost.childNodes;

	        if (children) {
	          for (var _i = 0; _i < children.length; _i++) {
	            var _c =
	            /** @type {!HTMLElement} */
	            children[_i];
	            this.styleSubtree(_c);
	          }
	        }
	      }
	    }
	    /* Custom Style operations */

	  }, {
	    key: "_revalidateCustomStyleApplyShim",
	    value: function _revalidateCustomStyleApplyShim(customStyles) {
	      for (var i = 0; i < customStyles.length; i++) {
	        var c = customStyles[i];

	        var s = this._customStyleInterface['getStyleForCustomStyle'](c);

	        if (s) {
	          this._revalidateApplyShim(s);
	        }
	      }
	    }
	  }, {
	    key: "_applyCustomStyles",
	    value: function _applyCustomStyles(customStyles) {
	      for (var i = 0; i < customStyles.length; i++) {
	        var c = customStyles[i];

	        var s = this._customStyleInterface['getStyleForCustomStyle'](c);

	        if (s) {
	          StyleProperties$1.applyCustomStyle(s, this._documentOwnerStyleInfo.styleProperties);
	        }
	      }
	    }
	  }, {
	    key: "transformCustomStyleForDocument",
	    value: function transformCustomStyleForDocument(style) {
	      var _this2 = this;

	      var cssBuild = getCssBuild(style);

	      if (cssBuild !== this._documentOwnerStyleInfo.cssBuild) {
	        this._documentOwnerStyleInfo.cssBuild = cssBuild;
	      }

	      if (isOptimalCssBuild(cssBuild)) {
	        return;
	      }

	      var ast = rulesForStyle(style);
	      forEachRule(ast, function (rule) {
	        if (nativeShadow) {
	          StyleTransformer$1.normalizeRootSelector(rule);
	        } else {
	          StyleTransformer$1.documentRule(rule);
	        }

	        if (nativeCssVariables && cssBuild === '') {
	          _this2._ensure();

	          _this2._applyShim && _this2._applyShim['transformRule'](rule);
	        }
	      });

	      if (nativeCssVariables) {
	        style.textContent = toCssText(ast);
	      } else {
	        this._documentOwnerStyleInfo.styleRules['rules'].push(ast);
	      }
	    }
	  }, {
	    key: "_revalidateApplyShim",
	    value: function _revalidateApplyShim(style) {
	      if (nativeCssVariables && this._applyShim) {
	        var ast = rulesForStyle(style);

	        this._ensure();

	        this._applyShim['transformRules'](ast);

	        style.textContent = toCssText(ast);
	      }
	    }
	  }, {
	    key: "getComputedStyleValue",
	    value: function getComputedStyleValue(element, property) {
	      var value;

	      if (!nativeCssVariables) {
	        // element is either a style host, or an ancestor of a style host
	        var styleInfo = StyleInfo.get(element) || StyleInfo.get(this._styleOwnerForNode(element));
	        value = styleInfo.styleProperties[property];
	      } // fall back to the property value from the computed styling


	      value = value || window.getComputedStyle(element).getPropertyValue(property); // trim whitespace that can come after the `:` in css
	      // example: padding: 2px -> " 2px"

	      return value ? value.trim() : '';
	    } // given an element and a classString, replaces
	    // the element's class with the provided classString and adds
	    // any necessary ShadyCSS static and property based scoping selectors

	  }, {
	    key: "setElementClass",
	    value: function setElementClass(element, classString) {
	      var root = wrap$2(element).getRootNode();
	      var classes = classString ? classString.split(/\s/) : [];
	      var scopeName = root.host && root.host.localName; // If no scope, try to discover scope name from existing class.
	      // This can occur if, for example, a template stamped element that
	      // has been scoped is manipulated when not in a root.

	      if (!scopeName) {
	        var classAttr = element.getAttribute('class');

	        if (classAttr) {
	          var k$ = classAttr.split(/\s/);

	          for (var i = 0; i < k$.length; i++) {
	            if (k$[i] === StyleTransformer$1.SCOPE_NAME) {
	              scopeName = k$[i + 1];
	              break;
	            }
	          }
	        }
	      }

	      if (scopeName) {
	        classes.push(StyleTransformer$1.SCOPE_NAME, scopeName);
	      }

	      if (!nativeCssVariables) {
	        var styleInfo = StyleInfo.get(element);

	        if (styleInfo && styleInfo.scopeSelector) {
	          classes.push(StyleProperties$1.XSCOPE_NAME, styleInfo.scopeSelector);
	        }
	      }

	      setElementClassRaw(element, classes.join(' '));
	    }
	  }, {
	    key: "_styleInfoForNode",
	    value: function _styleInfoForNode(node) {
	      return StyleInfo.get(node);
	    }
	    /**
	     * @param {!Element} node
	     * @param {string} scope
	     */

	  }, {
	    key: "scopeNode",
	    value: function scopeNode(node, scope) {
	      StyleTransformer$1.element(node, scope);
	    }
	    /**
	     * @param {!Element} node
	     * @param {string} scope
	     */

	  }, {
	    key: "unscopeNode",
	    value: function unscopeNode(node, scope) {
	      StyleTransformer$1.element(node, scope, true);
	    }
	    /**
	     * @param {!Node} node
	     * @return {string}
	     */

	  }, {
	    key: "scopeForNode",
	    value: function scopeForNode(node) {
	      return getOwnerScope(node);
	    }
	    /**
	     * @param {!Element} node
	     * @return {string}
	     */

	  }, {
	    key: "currentScopeForNode",
	    value: function currentScopeForNode(node) {
	      return getCurrentScope(node);
	    }
	  }]);

	  return ScopingShim;
	}();
	ScopingShim.prototype['flush'] = ScopingShim.prototype.flush;
	ScopingShim.prototype['prepareTemplate'] = ScopingShim.prototype.prepareTemplate;
	ScopingShim.prototype['styleElement'] = ScopingShim.prototype.styleElement;
	ScopingShim.prototype['styleDocument'] = ScopingShim.prototype.styleDocument;
	ScopingShim.prototype['styleSubtree'] = ScopingShim.prototype.styleSubtree;
	ScopingShim.prototype['getComputedStyleValue'] = ScopingShim.prototype.getComputedStyleValue;
	ScopingShim.prototype['setElementClass'] = ScopingShim.prototype.setElementClass;
	ScopingShim.prototype['_styleInfoForNode'] = ScopingShim.prototype._styleInfoForNode;
	ScopingShim.prototype['transformCustomStyleForDocument'] = ScopingShim.prototype.transformCustomStyleForDocument;
	ScopingShim.prototype['getStyleAst'] = ScopingShim.prototype.getStyleAst;
	ScopingShim.prototype['styleAstToString'] = ScopingShim.prototype.styleAstToString;
	ScopingShim.prototype['flushCustomStyles'] = ScopingShim.prototype.flushCustomStyles;
	ScopingShim.prototype['scopeNode'] = ScopingShim.prototype.scopeNode;
	ScopingShim.prototype['unscopeNode'] = ScopingShim.prototype.unscopeNode;
	ScopingShim.prototype['scopeForNode'] = ScopingShim.prototype.scopeForNode;
	ScopingShim.prototype['currentScopeForNode'] = ScopingShim.prototype.currentScopeForNode;
	ScopingShim.prototype['prepareAdoptedCssText'] = ScopingShim.prototype.prepareAdoptedCssText;
	/* eslint-enable no-self-assign */

	Object.defineProperties(ScopingShim.prototype, {
	  'nativeShadow': {
	    get: function get() {
	      return nativeShadow;
	    }
	  },
	  'nativeCss': {
	    get: function get() {
	      return nativeCssVariables;
	    }
	  }
	});

	/**
	@license
	Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
	This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
	The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
	The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
	Code distributed by Google as part of the polymer project is also
	subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
	*/
	/** @const {ScopingShim} */

	var scopingShim$1 = new ScopingShim();
	var ApplyShim, CustomStyleInterface$1;

	if (window['ShadyCSS']) {
	  ApplyShim = window['ShadyCSS']['ApplyShim'];
	  CustomStyleInterface$1 = window['ShadyCSS']['CustomStyleInterface'];
	}

	window.ShadyCSS = {
	  ScopingShim: scopingShim$1,

	  /**
	   * @param {!HTMLTemplateElement} template
	   * @param {string} elementName
	   * @param {string=} elementExtends
	   */
	  prepareTemplate: function prepareTemplate(template, elementName, elementExtends) {
	    scopingShim$1.flushCustomStyles();
	    scopingShim$1.prepareTemplate(template, elementName, elementExtends);
	  },

	  /**
	   * @param {!HTMLTemplateElement} template
	   * @param {string} elementName
	   */
	  prepareTemplateDom: function prepareTemplateDom(template, elementName) {
	    scopingShim$1.prepareTemplateDom(template, elementName);
	  },

	  /**
	   * @param {!HTMLTemplateElement} template
	   * @param {string} elementName
	   * @param {string=} elementExtends
	   */
	  prepareTemplateStyles: function prepareTemplateStyles(template, elementName, elementExtends) {
	    scopingShim$1.flushCustomStyles();
	    scopingShim$1.prepareTemplateStyles(template, elementName, elementExtends);
	  },

	  /**
	   * @param {!HTMLElement} element
	   * @param {Object=} properties
	   */
	  styleSubtree: function styleSubtree(element, properties) {
	    scopingShim$1.flushCustomStyles();
	    scopingShim$1.styleSubtree(element, properties);
	  },

	  /**
	   * @param {!HTMLElement} element
	   */
	  styleElement: function styleElement(element) {
	    scopingShim$1.flushCustomStyles();
	    scopingShim$1.styleElement(element);
	  },

	  /**
	   * @param {Object=} properties
	   */
	  styleDocument: function styleDocument(properties) {
	    scopingShim$1.flushCustomStyles();
	    scopingShim$1.styleDocument(properties);
	  },
	  flushCustomStyles: function flushCustomStyles() {
	    scopingShim$1.flushCustomStyles();
	  },

	  /**
	   * @param {Element} element
	   * @param {string} property
	   * @return {string}
	   */
	  getComputedStyleValue: function getComputedStyleValue(element, property) {
	    return scopingShim$1.getComputedStyleValue(element, property);
	  },
	  nativeCss: nativeCssVariables,
	  nativeShadow: nativeShadow,
	  cssBuild: cssBuild,
	  disableRuntime: disableRuntime
	};

	if (ApplyShim) {
	  window.ShadyCSS.ApplyShim = ApplyShim;
	}

	if (CustomStyleInterface$1) {
	  window.ShadyCSS.CustomStyleInterface = CustomStyleInterface$1;
	}

	/* Any copyright is dedicated to the Public Domain.
	 * http://creativecommons.org/publicdomain/zero/1.0/ */

	/** @type {boolean|undefined} */
	Window.prototype.forceJURL = false;

	(function (scope) {

	  var hasWorkingUrl = false;

	  if (!scope.forceJURL) {
	    try {
	      var u = new URL('b', 'http://a');
	      u.pathname = 'c%20d';
	      hasWorkingUrl = u.href === 'http://a/c%20d';
	    } catch (e) {}
	  }

	  if (hasWorkingUrl) return;
	  var relative = Object.create(null);
	  relative['ftp'] = 21;
	  relative['file'] = 0;
	  relative['gopher'] = 70;
	  relative['http'] = 80;
	  relative['https'] = 443;
	  relative['ws'] = 80;
	  relative['wss'] = 443;
	  var relativePathDotMapping = Object.create(null);
	  relativePathDotMapping['%2e'] = '.';
	  relativePathDotMapping['.%2e'] = '..';
	  relativePathDotMapping['%2e.'] = '..';
	  relativePathDotMapping['%2e%2e'] = '..';

	  function isRelativeScheme(scheme) {
	    return relative[scheme] !== undefined;
	  }

	  function invalid() {
	    clear.call(this);
	    this._isInvalid = true;
	  }

	  function IDNAToASCII(h) {
	    if ('' == h) {
	      invalid.call(this);
	    } // XXX


	    return h.toLowerCase();
	  }

	  function percentEscape(c) {
	    var unicode = c.charCodeAt(0);

	    if (unicode > 0x20 && unicode < 0x7F && // " # < > ? `
	    [0x22, 0x23, 0x3C, 0x3E, 0x3F, 0x60].indexOf(unicode) == -1) {
	      return c;
	    }

	    return encodeURIComponent(c);
	  }

	  function percentEscapeQuery(c) {
	    // XXX This actually needs to encode c using encoding and then
	    // convert the bytes one-by-one.
	    var unicode = c.charCodeAt(0);

	    if (unicode > 0x20 && unicode < 0x7F && // " # < > ` (do not escape '?')
	    [0x22, 0x23, 0x3C, 0x3E, 0x60].indexOf(unicode) == -1) {
	      return c;
	    }

	    return encodeURIComponent(c);
	  }

	  var EOF = undefined,
	      ALPHA = /[a-zA-Z]/,
	      ALPHANUMERIC = /[a-zA-Z0-9\+\-\.]/;
	  /**
	   * @param {!string} input
	   * @param {?string=} stateOverride
	   * @param {(URL|string)=} base
	   */

	  function parse(input, stateOverride, base) {

	    var state = stateOverride || 'scheme start',
	        cursor = 0,
	        buffer = '',
	        seenAt = false,
	        seenBracket = false;

	    loop: while ((input[cursor - 1] != EOF || cursor == 0) && !this._isInvalid) {
	      var c = input[cursor];

	      switch (state) {
	        case 'scheme start':
	          if (c && ALPHA.test(c)) {
	            buffer += c.toLowerCase(); // ASCII-safe

	            state = 'scheme';
	          } else if (!stateOverride) {
	            buffer = '';
	            state = 'no scheme';
	            continue;
	          } else {
	            break loop;
	          }

	          break;

	        case 'scheme':
	          if (c && ALPHANUMERIC.test(c)) {
	            buffer += c.toLowerCase(); // ASCII-safe
	          } else if (':' == c) {
	            this._scheme = buffer;
	            buffer = '';

	            if (stateOverride) {
	              break loop;
	            }

	            if (isRelativeScheme(this._scheme)) {
	              this._isRelative = true;
	            }

	            if ('file' == this._scheme) {
	              state = 'relative';
	            } else if (this._isRelative && base && base._scheme == this._scheme) {
	              state = 'relative or authority';
	            } else if (this._isRelative) {
	              state = 'authority first slash';
	            } else {
	              state = 'scheme data';
	            }
	          } else if (!stateOverride) {
	            buffer = '';
	            cursor = 0;
	            state = 'no scheme';
	            continue;
	          } else if (EOF == c) {
	            break loop;
	          } else {
	            break loop;
	          }

	          break;

	        case 'scheme data':
	          if ('?' == c) {
	            this._query = '?';
	            state = 'query';
	          } else if ('#' == c) {
	            this._fragment = '#';
	            state = 'fragment';
	          } else {
	            // XXX error handling
	            if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
	              this._schemeData += percentEscape(c);
	            }
	          }

	          break;

	        case 'no scheme':
	          if (!base || !isRelativeScheme(base._scheme)) {
	            invalid.call(this);
	          } else {
	            state = 'relative';
	            continue;
	          }

	          break;

	        case 'relative or authority':
	          if ('/' == c && '/' == input[cursor + 1]) {
	            state = 'authority ignore slashes';
	          } else {
	            state = 'relative';
	            continue;
	          }

	          break;

	        case 'relative':
	          this._isRelative = true;
	          if ('file' != this._scheme) this._scheme = base._scheme;

	          if (EOF == c) {
	            this._host = base._host;
	            this._port = base._port;
	            this._path = base._path.slice();
	            this._query = base._query;
	            this._username = base._username;
	            this._password = base._password;
	            break loop;
	          } else if ('/' == c || '\\' == c) {
	            state = 'relative slash';
	          } else if ('?' == c) {
	            this._host = base._host;
	            this._port = base._port;
	            this._path = base._path.slice();
	            this._query = '?';
	            this._username = base._username;
	            this._password = base._password;
	            state = 'query';
	          } else if ('#' == c) {
	            this._host = base._host;
	            this._port = base._port;
	            this._path = base._path.slice();
	            this._query = base._query;
	            this._fragment = '#';
	            this._username = base._username;
	            this._password = base._password;
	            state = 'fragment';
	          } else {
	            var nextC = input[cursor + 1];
	            var nextNextC = input[cursor + 2];

	            if ('file' != this._scheme || !ALPHA.test(c) || nextC != ':' && nextC != '|' || EOF != nextNextC && '/' != nextNextC && '\\' != nextNextC && '?' != nextNextC && '#' != nextNextC) {
	              this._host = base._host;
	              this._port = base._port;
	              this._username = base._username;
	              this._password = base._password;
	              this._path = base._path.slice();

	              this._path.pop();
	            }

	            state = 'relative path';
	            continue;
	          }

	          break;

	        case 'relative slash':
	          if ('/' == c || '\\' == c) {

	            if ('file' == this._scheme) {
	              state = 'file host';
	            } else {
	              state = 'authority ignore slashes';
	            }
	          } else {
	            if ('file' != this._scheme) {
	              this._host = base._host;
	              this._port = base._port;
	              this._username = base._username;
	              this._password = base._password;
	            }

	            state = 'relative path';
	            continue;
	          }

	          break;

	        case 'authority first slash':
	          if ('/' == c) {
	            state = 'authority second slash';
	          } else {
	            state = 'authority ignore slashes';
	            continue;
	          }

	          break;

	        case 'authority second slash':
	          state = 'authority ignore slashes';

	          if ('/' != c) {
	            continue;
	          }

	          break;

	        case 'authority ignore slashes':
	          if ('/' != c && '\\' != c) {
	            state = 'authority';
	            continue;
	          }

	          break;

	        case 'authority':
	          if ('@' == c) {
	            if (seenAt) {
	              buffer += '%40';
	            }

	            seenAt = true;

	            for (var i = 0; i < buffer.length; i++) {
	              var cp = buffer[i];

	              if ('\t' == cp || '\n' == cp || '\r' == cp) {
	                continue;
	              } // XXX check URL code points


	              if (':' == cp && null === this._password) {
	                this._password = '';
	                continue;
	              }

	              var tempC = percentEscape(cp);
	              null !== this._password ? this._password += tempC : this._username += tempC;
	            }

	            buffer = '';
	          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
	            cursor -= buffer.length;
	            buffer = '';
	            state = 'host';
	            continue;
	          } else {
	            buffer += c;
	          }

	          break;

	        case 'file host':
	          if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
	            if (buffer.length == 2 && ALPHA.test(buffer[0]) && (buffer[1] == ':' || buffer[1] == '|')) {
	              state = 'relative path';
	            } else if (buffer.length == 0) {
	              state = 'relative path start';
	            } else {
	              this._host = IDNAToASCII.call(this, buffer);
	              buffer = '';
	              state = 'relative path start';
	            }

	            continue;
	          } else if ('\t' == c || '\n' == c || '\r' == c) ; else {
	            buffer += c;
	          }

	          break;

	        case 'host':
	        case 'hostname':
	          if (':' == c && !seenBracket) {
	            // XXX host parsing
	            this._host = IDNAToASCII.call(this, buffer);
	            buffer = '';
	            state = 'port';

	            if ('hostname' == stateOverride) {
	              break loop;
	            }
	          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c) {
	            this._host = IDNAToASCII.call(this, buffer);
	            buffer = '';
	            state = 'relative path start';

	            if (stateOverride) {
	              break loop;
	            }

	            continue;
	          } else if ('\t' != c && '\n' != c && '\r' != c) {
	            if ('[' == c) {
	              seenBracket = true;
	            } else if (']' == c) {
	              seenBracket = false;
	            }

	            buffer += c;
	          }

	          break;

	        case 'port':
	          if (/[0-9]/.test(c)) {
	            buffer += c;
	          } else if (EOF == c || '/' == c || '\\' == c || '?' == c || '#' == c || stateOverride) {
	            if ('' != buffer) {
	              var temp = parseInt(buffer, 10);

	              if (temp != relative[this._scheme]) {
	                this._port = temp + '';
	              }

	              buffer = '';
	            }

	            if (stateOverride) {
	              break loop;
	            }

	            state = 'relative path start';
	            continue;
	          } else if ('\t' == c || '\n' == c || '\r' == c) ; else {
	            invalid.call(this);
	          }

	          break;

	        case 'relative path start':
	          state = 'relative path';

	          if ('/' != c && '\\' != c) {
	            continue;
	          }

	          break;

	        case 'relative path':
	          if (EOF == c || '/' == c || '\\' == c || !stateOverride && ('?' == c || '#' == c)) {

	            var tmp;

	            if (tmp = relativePathDotMapping[buffer.toLowerCase()]) {
	              buffer = tmp;
	            }

	            if ('..' == buffer) {
	              this._path.pop();

	              if ('/' != c && '\\' != c) {
	                this._path.push('');
	              }
	            } else if ('.' == buffer && '/' != c && '\\' != c) {
	              this._path.push('');
	            } else if ('.' != buffer) {
	              if ('file' == this._scheme && this._path.length == 0 && buffer.length == 2 && ALPHA.test(buffer[0]) && buffer[1] == '|') {
	                buffer = buffer[0] + ':';
	              }

	              this._path.push(buffer);
	            }

	            buffer = '';

	            if ('?' == c) {
	              this._query = '?';
	              state = 'query';
	            } else if ('#' == c) {
	              this._fragment = '#';
	              state = 'fragment';
	            }
	          } else if ('\t' != c && '\n' != c && '\r' != c) {
	            buffer += percentEscape(c);
	          }

	          break;

	        case 'query':
	          if (!stateOverride && '#' == c) {
	            this._fragment = '#';
	            state = 'fragment';
	          } else if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
	            this._query += percentEscapeQuery(c);
	          }

	          break;

	        case 'fragment':
	          if (EOF != c && '\t' != c && '\n' != c && '\r' != c) {
	            this._fragment += c;
	          }

	          break;
	      }

	      cursor++;
	    }
	  }

	  function clear() {
	    this._scheme = '';
	    this._schemeData = '';
	    this._username = '';
	    this._password = null;
	    this._host = '';
	    this._port = '';
	    this._path = [];
	    this._query = '';
	    this._fragment = '';
	    this._isInvalid = false;
	    this._isRelative = false;
	  } // Does not process domain names or IP addresses.
	  // Does not handle encoding for the query parameter.

	  /**
	   * @constructor
	   * @extends {URL}
	   * @param {!string} url
	   * @param {(URL|string)=} base
	   */


	  function jURL(url, base
	  /* , encoding */
	  ) {
	    if (base !== undefined && !(base instanceof jURL)) base = new jURL(String(base));
	    this._url = '' + url;
	    clear.call(this);

	    var input = this._url.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, ''); // encoding = encoding || 'utf-8'


	    parse.call(this, input, null, base);
	  }

	  jURL.prototype = {
	    toString: function toString() {
	      return this.href;
	    },

	    get href() {
	      if (this._isInvalid) return this._url;
	      var authority = '';

	      if ('' != this._username || null != this._password) {
	        authority = this._username + (null != this._password ? ':' + this._password : '') + '@';
	      }

	      return this.protocol + (this._isRelative ? '//' + authority + this.host : '') + this.pathname + this._query + this._fragment;
	    },

	    set href(href) {
	      clear.call(this);
	      parse.call(this, href);
	    },

	    get protocol() {
	      return this._scheme + ':';
	    },

	    set protocol(protocol) {
	      if (this._isInvalid) return;
	      parse.call(this, protocol + ':', 'scheme start');
	    },

	    get host() {
	      return this._isInvalid ? '' : this._port ? this._host + ':' + this._port : this._host;
	    },

	    set host(host) {
	      if (this._isInvalid || !this._isRelative) return;
	      parse.call(this, host, 'host');
	    },

	    get hostname() {
	      return this._host;
	    },

	    set hostname(hostname) {
	      if (this._isInvalid || !this._isRelative) return;
	      parse.call(this, hostname, 'hostname');
	    },

	    get port() {
	      return this._port;
	    },

	    set port(port) {
	      if (this._isInvalid || !this._isRelative) return;
	      parse.call(this, port, 'port');
	    },

	    get pathname() {
	      return this._isInvalid ? '' : this._isRelative ? '/' + this._path.join('/') : this._schemeData;
	    },

	    set pathname(pathname) {
	      if (this._isInvalid || !this._isRelative) return;
	      this._path = [];
	      parse.call(this, pathname, 'relative path start');
	    },

	    get search() {
	      return this._isInvalid || !this._query || '?' == this._query ? '' : this._query;
	    },

	    set search(search) {
	      if (this._isInvalid || !this._isRelative) return;
	      this._query = '?';
	      if ('?' == search[0]) search = search.slice(1);
	      parse.call(this, search, 'query');
	    },

	    get hash() {
	      return this._isInvalid || !this._fragment || '#' == this._fragment ? '' : this._fragment;
	    },

	    set hash(hash) {
	      if (this._isInvalid) return;

	      if (!hash) {
	        this._fragment = '';
	        return;
	      }

	      this._fragment = '#';
	      if ('#' == hash[0]) hash = hash.slice(1);
	      parse.call(this, hash, 'fragment');
	    },

	    get origin() {
	      var host;

	      if (this._isInvalid || !this._scheme) {
	        return '';
	      } // javascript: Gecko returns String(""), WebKit/Blink String("null")
	      // Gecko throws error for "data://"
	      // data: Gecko returns "", Blink returns "data://", WebKit returns "null"
	      // Gecko returns String("") for file: mailto:
	      // WebKit/Blink returns String("SCHEME://") for file: mailto:


	      switch (this._scheme) {
	        case 'data':
	        case 'file':
	        case 'javascript':
	        case 'mailto':
	          return 'null';
	      }

	      host = this.host;

	      if (!host) {
	        return '';
	      }

	      return this._scheme + '://' + host;
	    }

	  }; // Copy over the static methods

	  var OriginalURL = scope.URL;

	  if (OriginalURL) {
	    jURL['createObjectURL'] = function (blob) {
	      // IE extension allows a second optional options argument.
	      // http://msdn.microsoft.com/en-us/library/ie/hh772302(v=vs.85).aspx
	      return OriginalURL.createObjectURL.apply(OriginalURL, arguments);
	    };

	    jURL['revokeObjectURL'] = function (url) {
	      OriginalURL.revokeObjectURL(url);
	    };
	  }

	  scope.URL = jURL;
	})(window);

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

	var defineProperty$2 = _defineProperty;

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

	var toPrimitive$1 = _toPrimitive;

	function _toPropertyKey(arg) {
	  var key = toPrimitive$1(arg, "string");
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

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	var superPropBase = _superPropBase;

	var get$1 = createCommonjsModule(function (module) {
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

	      return get$1(getPrototypeOf(PropertyCommitter.prototype), "_getValue", this).call(this);
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

	var html$1 = function html(strings) {
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
	      get$1(getPrototypeOf(LitElement.prototype), "initialize", this).call(this);

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
	      get$1(getPrototypeOf(LitElement.prototype), "connectedCallback", this).call(this); // Note, first update/render handles styleElement so we only call this if
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

	      get$1(getPrototypeOf(LitElement.prototype), "update", this).call(this, changedProperties);

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
	      get$1(getPrototypeOf(LitElement), "finalize", this).call(this); // Prepare styling that is stamped at first render time. Styling
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
	        var classes = classnames(additionalClass, "".concat(pfPrefix, "-c-button"), defineProperty$2({}, "".concat(pfPrefix, "-m-").concat(kind), kind));
	        return html$1(_templateObject(), classes, disabled);
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
	        return html$1(_templateObject$1(), classes);
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
	        return html$1(_templateObject$2(), classes);
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
	        return html$1(_templateObject$3(), classes);
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
	        return html$1(_templateObject$4(), classes);
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
	        return html$1(_templateObject$5(), classes);
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
	        return html$1(_templateObject$6(), classes);
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
	        return html$1(_templateObject$7(), classes);
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
