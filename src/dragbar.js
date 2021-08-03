/**
 * Implements the drag bar widget.
 * @param {*} baseNode 
 */
export const dragbar = (baseNode, root) => {

    const dragbarBall = baseNode.querySelector('.dragbar__ball');
    const dragbarFilled = baseNode.querySelector('.dragbar__filled');
    const input = baseNode.getElementsByTagName('input')[0];

    const getMaxX = () => {
        const maxX = dragbarBall.parentNode.offsetWidth -23;
        return maxX;    
    };


    const minVal = parseFloat(input.getAttribute('min'));
    const maxVal = parseFloat(input.getAttribute('max'));
    const decimalNumber = input.getAttribute('min').indexOf('.') > -1 ? input.getAttribute('min').length - input.getAttribute('min').indexOf('.')  - 1 : 0; 
    
    const setPosition = (scroll) => {
        dragbarBall.style.left = `${scroll}px`;
        dragbarFilled.style.width = `${scroll + 12}px`;
    };
    
    let mouseDown = false;
    let startX;

    
    const setPositionByInputState = (target) => {
        let value = parseFloat(target.value);
        let fix = false;

        if (value > maxVal) {
            value = maxVal;
            fix = true;
        } else if (value < minVal) {
            value = minVal;
            fix = true;
        }
        
        fix && ( target.value = value.toFixed(decimalNumber) );

        scroll = (value - minVal) * getMaxX() / (maxVal - minVal);
        setPosition(scroll);
    };

    const startDragging = function (e) {
        mouseDown = true;
        startX = e.pageX - dragbarBall.offsetLeft;
    };
    const stopDragging = function (event) {
        mouseDown = false;
    };

    const init = () => {
        input.value = minVal;
        setPositionByInputState(input);

        input.addEventListener('input', (e) => {
            setPositionByInputState(e.target);
        });
        input.addEventListener('blur', (e) => {
            e.target.value = parseFloat(e.target.value).toFixed(decimalNumber);
        });
    
        window.addEventListener('resize', () => {
            setPositionByInputState(input);
        });
    
        
        root.addEventListener('mousemove', (e) => {
            e.preventDefault();
            if (!mouseDown) { return; }
            const x = e.pageX;
            const maxX = getMaxX();
            const scroll = x < startX ? 0 : x - startX > maxX ? maxX : x - startX;
            input.value = (((scroll * (maxVal - minVal)) / maxX) + minVal).toFixed(decimalNumber);
            setPosition(scroll);
        });
    
        
        dragbarBall.addEventListener('mousedown', startDragging, false);
        root.addEventListener('mouseup', stopDragging, false);
        root.addEventListener('mouseleave', stopDragging, false);    
    };

    init();
}