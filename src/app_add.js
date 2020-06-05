class FighterAppend
{

    constructor(form) 
    {
        this.form = form;
    }

    init()
    {
            this._submitFormData(this.form);
    }


    _submitFormData(selector){
        const form = document.querySelector(selector);
        
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            /**
             * https://developer.mozilla.org/en-US/docs/Web/API/FormData
             * @type {FormData}
             */
            const data = new FormData(this);
            fetch('insert.php', {
                method: 'post',
                body: data
            })
                .then(response => response.text())
                .then(response => {
                    /**
                     * If 200, reload the page
                     */
                    location.replace("index.php");
                })
                .catch(error => alert(error));
        });
    }
}

const data = {
    form: "form",
}

const fighterAppend = new FighterAppend(data.form);
fighterAppend.init();