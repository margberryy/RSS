import { f } from '../../../../dom';

export { BestScore as default };
export class BestScore {
    private playerContainer = document.createElement('div');

   render(): HTMLElement {
      f.create(this.playerContainer, 'div', 'title title__score').innerHTML = 'Best players';
      const playerWrapper = f.create(this.playerContainer, 'div', 'player_wrapper');

      for (let i = 0; i < 3; i+=1) {
         const player = f.create(playerWrapper, 'div', 'player');

         const playerNameArr = ['Nicci Troiani', 'George Fields', 'Jones Dermot'];
         const playerImg = f.create(player, 'img', 'player_img') as HTMLImageElement;
         playerImg.src = `assets/players/${  playerNameArr[i]  }.jpg`;

         const playerInfo = f.create(player, 'p', 'player_info');
         const playerName = f.create(playerInfo, 'p', 'player_name');
         const playerEmail = f.create(playerInfo, 'div', 'player_email');
         playerName.innerHTML = playerNameArr[i];
         const playerEmailArr = ['nicci@gmail.com', 'jack@gmail.com', 'dermot@gamil.com'];
         playerEmail.innerHTML = playerEmailArr[i];

      }
      return this.playerContainer;
   }
}