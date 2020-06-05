class FighterEdit
{

    constructor(form) 
    {
        this.form = form;
    }

    init()
    {
            this._submitFormData(this.form);
            this._SetButtonListeners();
    }
    
    _SetButtonListeners()
    {
        const hidden_delete=document.querySelector("#delete").addEventListener("click",(e)=>{
            document.querySelector("#deleting").value="delete";   
        });
    }

    _submitFormData(selector)
    {
        const form = document.querySelector(selector);
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            /**
             * https://developer.mozilla.org/en-US/docs/Web/API/FormData
             * @type {FormData}
             */
            const data = new FormData(this);
            fetch('controller/db/Edit.php', {
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

const fighterEdit = new FighterEdit(data.form);
fighterEdit.init();