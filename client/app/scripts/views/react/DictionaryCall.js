'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(function (require) {
    'use strict';

    var React = require('react'),
        $ = require('jquery'),
        DataTab = require('views/react/DataTab'),
        ServerError = require('views/react/ServerError');

    return (function (_React$Component) {
        _inherits(Translation, _React$Component);

        function Translation(props) {
            _classCallCheck(this, Translation);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Translation).call(this));

            _this.state = {
                word: '',
                definitions: [],
                pronunciation: '',
                error: false,
                nodata: false
            };
            return _this;
        }

        _createClass(Translation, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.callAjax();
            }
        }, {
            key: 'callAjax',
            value: function callAjax() {
                $.ajax({
                    url: this.props.url,
                    dataType: 'json',
                    catche: false,
                    method: 'POST',
                    data: { word: this.props.word },
                    success: (function (data) {
                        if (!data) {
                            this.setState({ nodata: true });
                        } else {
                            this.setState({ definitions: data });
                        }
                    }).bind(this),
                    error: (function (xhr, status, error) {
                        console.log(this.props.url, status, error.toString());
                        this.setState({ error: true });
                    }).bind(this)
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var body = undefined,
                    error = this.state.error;

                if (this.state.nodata) {
                    body = React.createElement(
                        'div',
                        null,
                        'No definition found'
                    );
                } else {
                    body = React.createElement(DataTab, { definitions: this.state.definitions, title: this.props.word });
                }

                return React.createElement(
                    'div',
                    { className: 'translation' },
                    body,
                    error ? React.createElement(ServerError, { onClick: this.callAjax.bind(this) }) : null
                );
            }
        }]);

        return Translation;
    })(React.Component);
});
