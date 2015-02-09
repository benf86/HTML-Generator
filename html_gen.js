'use strict';


// **********************************************************
// Templating system for less annoying HTML scaffolding
// injection by Rolando Benjamin Vaz Ferreira
// 
// CC-BY-SA
//
// Easy to use, easy to extend. For now, you can use the following keys:
// "tag", [classList], [children], "type", "onclick"
//
// The general format is as follows:
// "id-of-the-element" : {element-properties}
//
// Special detail regarding onclick - whatever you put in 
// there will become the onclick function's body, so leave out
// the function() part and {}
//
// Everything else should be self-explanatory from the sample
// **********************************************************

var myTemplate = {
    "pov_sidebar": {
        "tag": "div",
        "classList": [
            "hidden"
        ],
        "children": [
            {
                "pov_expand_button": {
                    "tag": "button",
                    "type": "button",
                    "classList": [
                        "hidden"
                    ],
                    "onclick": "document.getElementById('pov_sidebar').classList.toggle('hidden');document.getElementById('pov_expand_button').classList.toggle('hidden');"
                }
            },
            {
                "pov_motd": {
                    "tag": "div"
                }
            },
            {
                "pov_related": {
                    "tag": "div",
                    "children": [
                        {
                            "no_id": {
                                "tag": "ul"
                            }
                        }
                    ]
                }
            },
            {
                "pov_comments_box": {
                    "tag": "div"
                }
            }
        ]
    }
}

function parseTemplate(myTemplate) {
        function parseChild(myChild, myParentElement) {
                myParentElement = myParentElement || document.getElementsByTagName('body')[0];
                var myChildElement = myChild[Object.getOwnPropertyNames(myChild)[0]];
                var myChildElementId = myChild[Object.getOwnPropertyNames(myChild)[0]];
                var e = document.createElement(myChildElement.tag);
                myChildElementId === 'no_id' ? false : e.id = Object.getOwnPropertyNames(myChild)[0];
                if (e) {
                        console.log(myChildElement)
                        if (!!myChildElement.style) {
                                console.log('Appending style');
                                e.style = myChildElement.style;
                        }
                        if (!!myChildElement.classList) {
                                console.log('Appending classlist');
                                for (var myClass in myChildElement.classList) {
                                        e.classList.add(myChildElement.classList[myClass]);
                                }
                        }
                        if (!!myChildElement.onclick) {
                                console.log('Appending onclick');
                                e.onclick = new Function(myChildElement.onclick);
                        }
                        if (!!myChildElement.children) {
                                console.log('Appending children');
                                myChildElement.children.forEach(function(element) {
                                        parseChild(element, e);
                                });
                        }
                } else {
                        console.log('element === null');
                }
                myParentElement.appendChild(e);
        }

        for (var myElementId in Object.getOwnPropertyNames(myTemplate)) {
                console.log('parsing ' + Object.getOwnPropertyNames(myTemplate)[myElementId]);
                parseChild(myTemplate);
        }
};

parseTemplate(myTemplate);

// **********************************************************
