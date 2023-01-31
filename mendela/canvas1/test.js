let ob = {
    wiek: 20,
    wzrost: 176,
    tworz: function () {
        let el = document.createElement("button");
        console.log(this);
        el.innerText = this.wiek;

        /*
        let dys = this;
        el.onclick = function () {
            console.log(this, dys);
            this.innerText = dys.wzrost;
        }*/

        /*
        el.onclick = (e) => {
            console.log(this, e.target);
            e.target.innerText = this.wzrost;
        }*/

        el.onclick = function (e) {
            console.log(this);
            e.target.innerText = this.wzrost;
        }.bind(this)

        document.body.appendChild(el);
    }

}

ob.tworz();

