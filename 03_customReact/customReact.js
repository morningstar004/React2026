function render(CustomElement, container){
    const docElement = document.createElement(CustomElement.type);
    docElement.innerHTML = CustomElement.pranjal
    for (const prop in CustomElement.props) {
        docElement.setAttribute(prop,CustomElement.props[prop]);
    }
    container.appendChild(docElement);
}

const CustomElement = {
    type: 'a',
    props: {
        href:'https://google.com',
        target: '_blank',
    },
    pranjal:'Click me and get redirect to google.com',
}

const mainContainer = document.getElementById('root');
render(CustomElement,mainContainer)