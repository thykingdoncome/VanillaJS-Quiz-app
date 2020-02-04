(function() {
    const text = [
        {
            item: 'Do you know programming?'
        },
        {
            item: 'Gear up'
        },

       {
           item:  'Be the greatest'
       },
       {
           item:  'Put your basic programming knowledge to test!'
       }
    ]
    
    const textBox = document.querySelector("#textBox");
    
    const getText = () => {
        const random = Math.floor(Math.random() * text.length);
        textBox.innerHTML = text[random].item;
        const disp = document.getElementById("textBox");
        disp.style.visibility = 'visible';
    }
    
    getText();
    
    setInterval(() => {
        getText();
    },3000)
})();