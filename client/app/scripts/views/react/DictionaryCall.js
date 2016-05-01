'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require) {
    'use strict';

    var React = require('react'),
        $ = require('jquery'),
        DataTab = require('views/react/DataTab'),
        ServerError = require('views/react/ServerError');

    return function (_React$Component) {
        _inherits(DictionaryCall, _React$Component);

        function DictionaryCall(props) {
            _classCallCheck(this, DictionaryCall);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DictionaryCall).call(this));

            _this.state = {
                word: '',
                data: [],
                error: false,
                nodata: false,
                initialLoaded: props.load
            };
            return _this;
        }

        _createClass(DictionaryCall, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                if (this.state.initialLoaded) {
                    this.callAjax();
                }
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (nextProps.load) {
                    this.setState({ initialLoaded: true });
                }
            }
        }, {
            key: 'componentWillUpdate',
            value: function componentWillUpdate(nextProps, nextState) {
                if (this.state.initialLoaded !== nextState.initialLoaded) {
                    this.callAjax();
                }
            }
        }, {
            key: 'callAjax',
            value: function callAjax() {
                var _this2 = this;

                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    catche: false,
                    method: 'POST',
                    data: { word: this.props.word },
                    success: function success(data) {
                        if (!data.length) {
                            _this2.setState({ nodata: true });
                        } else {
                            _this2.setState({ data: data });
                        }
                    },
                    error: function error(xhr, status, _error) {
                        console.log(_this2.props.url, status, _error.toString());
                        _this2.setState({ error: true });
                    }
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var body = void 0,
                    error = this.state.error;

                if (this.state.nodata) {
                    body = React.createElement(
                        'div',
                        null,
                        'No definition found'
                    );
                } else {
                    body = React.createElement(DataTab, { data: this.state.data, title: this.props.word });
                }

                return React.createElement(
                    'div',
                    { className: 'dictionary-call' },
                    body,
                    error ? React.createElement(ServerError, { onClick: this.callAjax.bind(this) }) : null
                );
            }
        }]);

        return DictionaryCall;
    }(React.Component);
});
