define(function(require){
    'use strict';

    var React = require('react'),
        TestUtils = React.addons.TestUtils,
        DataTab = require('views/react/DataTab');

    describe('React', function(){
        describe('DataTab', function(){
            let component = null,
                definitions = [];
            beforeEach(function(){
                definitions = [
                    {title: 'definition one'},
                    {title: 'definition two'}
                ]
                component = TestUtils.renderIntoDocument(
                    <DataTab title="test title" definitions={definitions}/>
                );
            });

            it('should have a proper css class name', function(){
                expect(React.findDOMNode(component).firstChild.className).to.equal('tab-title');
            });

            it('should containt title as a div value', function(){
                expect(React.findDOMNode(component).firstChild.innerHTML).to.equal('test title');
            });

            it('should pass props to DataBody component', function(){
                var tmpComponent = component.render()
                var dataBodyProps = tmpComponent.props.children[1].props;
                expect(dataBodyProps.definitions).to.deep.equal(definitions);
            });
        });
    });
});
