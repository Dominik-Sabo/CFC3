class ChooseYourCat {
    constructor(buttons, fighters) {
      this.buttons = buttons;
      this.fighters = fighters;
      this.allButtons = document.querySelectorAll("button");
      var selectedLeft = 0;
      var selectedRight = 0;
      var fightInProgress = false;

    }
    init(){
        this._buttonClickHandler(this.buttons);
        this._fighterClickHandler(this.fighters);
    }

    _buttonClickHandler(buttons, fighters) {
        for (let key in buttons) {
          if (buttons.hasOwnProperty(key)) {
            const buttonEl = document.querySelector(buttons[key]);
    
            buttonEl.addEventListener("click", (e) => {
              e.preventDefault();
              if(key === "random"){
                this._selectRandomFighters()
              }
              else if(key === "fight" && this.selectedLeft !== undefined && this.selectedRight !== undefined){
                this._setUpFight();
              }
            });
          }
        }
    }

    _setUpFight(){
      this.fightInProgress = true;
      for(let i = 0; i < this.allButtons.length; i++){
          this.allButtons[i].disabled = true;
      }
      let countDownText = document.querySelector('h2');
      this._sleep(1000).then(() => { countDownText.innerHTML = "3"; });
      this._sleep(2000).then(() => { countDownText.innerHTML = "2"; });
      this._sleep(3000).then(() => { countDownText.innerHTML = "1"; });
      this._sleep(4000).then(() => { 
        let winner = this._fight();
        countDownText.innerHTML = "Winner is " + winner + "!!!";
      });
      this._sleep(8000).then(() => {
        countDownText.innerHTML = "Choose your cat";
        this._removeImageBorders();
        for(let i = 0; i < this.allButtons.length; i++){
            this.allButtons[i].disabled = false;
        }
        this.fightInProgress = false; 
      });
    }

    _removeImageBorders(){      //  Removes borders from images so they do not appear selected anymore
      const images = document.querySelectorAll(".featured-cat-fighter-image");
      Array.from(images).forEach((image) => {
        image.setAttribute("style", "border-style:none;");
      });
    }

    _fight(){
      const fightersEl = document.querySelectorAll(this.fighters);
      let leftFighter = fightersEl[this.selectedLeft-1];
      let rightFighter = fightersEl[this.selectedRight-1+fightersEl.length/2];
      let leftPercentage = this._calculateWinPercentage(leftFighter);
      let rightPercentage = this._calculateWinPercentage(rightFighter);
      
      let winner = this._decideWinner(leftPercentage - rightPercentage)

      if(winner === "left"){
        var winnerData = JSON.parse(leftFighter.dataset.info);
        var loserData = JSON.parse(rightFighter.dataset.info);
        this._setFightOverBorders("green", "red");
      }
      else{
        var winnerData = JSON.parse(rightFighter.dataset.info);
        var loserData = JSON.parse(leftFighter.dataset.info);
        this._setFightOverBorders("red", "green");
      }

      this._updateFighterRecord(winnerData, loserData);
      this._setFighterInfo("#firstSide", leftFighter);
      this._setFighterInfo("#secondSide", rightFighter);

      let data = new FormData();
      data.append('winner',winnerData.id);
      data.append('wins',winnerData.record.wins);
      data.append('loser',loserData.id);
      data.append('losses',loserData.record.losses);
      fetch('controller/db/ScoreUpdate.php', {
          method: 'POST',
          body: data
      });

      return winnerData.name;
    }

    _setFightOverBorders(left, right){
      const images = document.querySelectorAll(".featured-cat-fighter-image");
      images[0].setAttribute("style", "border-style:solid; border-width:10px; border-color:"+left+";");
      images[1].setAttribute("style", "border-style:solid; border-width:10px; border-color:"+right+";");
    }

    _updateFighterRecord(winnerData, loserData){
        const fightersEl = document.querySelectorAll(this.fighters);
        winnerData.record.wins++;
        loserData.record.losses++;
        Array.from(fightersEl).forEach((fighter) => {
          if(winnerData.id === JSON.parse(fighter.dataset.info).id) fighter.setAttribute("data-info", JSON.stringify(winnerData));
          if(loserData.id === JSON.parse(fighter.dataset.info).id) fighter.setAttribute("data-info", JSON.stringify(loserData));
        });
    }

    _calculateWinPercentage(fighter){
      let wins = (JSON.parse(fighter.dataset.info).record.wins);
      let losses = (JSON.parse(fighter.dataset.info).record.losses);
      if(wins == 0 && losses == 0) return 0.75;
      return wins/(wins+losses);
    }

    _decideWinner(percentage){
      let odds = Math.random();
      if(percentage < -0.1){
        if(odds<0.3) return "left";
      }
      else if(percentage < 0){
        if(odds<0.4) return "left";
      }
      else if(percentage < 0.1){
        if(odds<0.6) return "left";
      }
      else{
        if(odds<0.7) return "left";
      }
      return("right")
    }

    _selectRandomFighters(){
      const fightersEl = document.querySelectorAll(this.fighters);
      if(fightersEl.length == 0) return;
      while(true){
        this.selectedLeft = Math.floor(Math.random() * fightersEl.length/2) + 1;
        this.selectedRight = Math.floor(Math.random() * fightersEl.length/2) + 1;
        if(this.selectedLeft != this.selectedRight) break;
      }
      
      const leftFighters = [];
      const rightFighters = [];

      for(let i=0; i<fightersEl.length/2; i++){
        leftFighters[i] = fightersEl[i];
        rightFighters[i] = fightersEl[i + fightersEl.length/2];
      }

      Array.from(leftFighters).forEach((fighter) => {
        if(JSON.parse(fighter.dataset.info).id === this.selectedLeft){
          this._setImageBorders(leftFighters);
          fighter.querySelector("img").setAttribute("style", "border-style:solid;");
          this._setFighterInfo("#firstSide", fighter);
        }
      });

      Array.from(rightFighters).forEach((fighter) => {
        if(JSON.parse(fighter.dataset.info).id === this.selectedRight){
          this._setImageBorders(rightFighters);
          fighter.querySelector("img").setAttribute("style", "border-style:solid;");
          this._setFighterInfo("#secondSide", fighter);
        }
      });  
    }

    _fighterClickHandler(fighters){
      const fightersEl = document.querySelectorAll(this.fighters);
      const leftFighters = [];
      const rightFighters = [];

      for(let i=0; i<fightersEl.length/2; i++){     //  Creates an array of fighters for each side
        leftFighters[i] = fightersEl[i];            //  The arrays are effectively identical except for what they reference
        rightFighters[i] = fightersEl[i + fightersEl.length/2];
      }

        Array.from(leftFighters).forEach((item) => {
          const image = item.querySelector("img")
          image.addEventListener("click", (e) => {
              e.preventDefault();
              if(this.selectedRight !== JSON.parse(item.dataset.info).id && !this.fightInProgress){     //  Checks wether the fighter with the same id is
              this._setImageBorders(leftFighters);                                                      //  is already selected on the other side
              item.querySelector("img").setAttribute("style", "border-style:solid;");
              this._setFighterInfo("#firstSide", item);
              this.selectedLeft = JSON.parse(item.dataset.info).id;
            }
          });
        });

        Array.from(rightFighters).forEach((item) => {
          const image = item.querySelector("img")
          image.addEventListener("click", (e) => {
              e.preventDefault();
              if(this.selectedLeft !== JSON.parse(item.dataset.info).id && !this.fightInProgress){      //  same here
              this._setImageBorders(rightFighters);
              item.querySelector("img").setAttribute("style", "border-style:solid;");
              this._setFighterInfo("#secondSide", item);
              this.selectedRight = JSON.parse(item.dataset.info).id;
            }
          });
        });
      }

      _setFighterInfo(side, fighter){       //  Populates the info table of the selected fighter on the side it was selected
        let info = document.querySelector(side);
        const image = info.querySelector(".featured-cat-fighter-image");
        info = info.querySelectorAll("li");
        info[0].innerHTML = (JSON.parse(fighter.dataset.info).name);
        info[1].innerHTML = (JSON.parse(fighter.dataset.info).age);
        info[2].innerHTML = (JSON.parse(fighter.dataset.info).catInfo);
        info[3].innerHTML = "Wins: " + ((JSON.parse(fighter.dataset.info).record.wins) + ", losses: " + (JSON.parse(fighter.dataset.info).record.losses));

        image.setAttribute("src", fighter.querySelector("img").getAttribute("src"));
      }

      _setImageBorders(fighters)
      {
        Array.from(fighters).forEach((item) => {
          item.querySelector("img").setAttribute("style", "border-style:none;");
        });
      }

      _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }   
  
}

let data = {
    buttons: {
      fight: "#generateFight",
      random: "#randomFight",
    },
    fighters: ".fighter-box",
};

const chooseYourCat = new ChooseYourCat(data.buttons, data.fighters);
chooseYourCat.init();