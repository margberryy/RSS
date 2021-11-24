import { f } from '../../dom';
import { State } from '../State';

export { FormRegistration as default };
 export class FormRegistration {

   renderFormRegistration(parent: HTMLElement): void {
      const overlay = f.create(parent, 'div', 'overlay');
      const form = f.create(parent, 'div', 'form');
      const formTitle = f.create(form, 'div', 'form__title title');
      formTitle.innerHTML = 'Register new Player';

      const formWrapper = f.create(form, 'form', 'form__wrapper');
      const tooltips: HTMLElement[] = [];
      const formContainer = f.create(formWrapper, 'div', 'form__container');

      function createFormComponents(parentNode: HTMLElement, className: string, value: string): HTMLElement {
         const formItem = f.create(parentNode, 'div', 'form__item');
         f.create(formItem, 'label', 'form__item_label').innerHTML = value;
         const formInput = f.create(formItem, 'input', `form__item_input _req ${className}`);
         formInput.setAttribute('maxlength', '30');
         const tooltip = f.create(formItem, 'div', 'tooltip');
         tooltips.push(tooltip);

         return formInput;
      }
      const formReq: HTMLElement[] = [];
      formReq.push(createFormComponents(formContainer, '', 'First Name'));
      formReq.push(createFormComponents(formContainer, '', 'Last Name'));
      formReq.push(createFormComponents(formContainer, '_email', 'E-mail'));

      const formImg = f.create(formWrapper, 'img', 'form__img') as HTMLImageElement;
      formImg.src = './assets/avatar.png';

      const btnWrapper = f.create(formWrapper, 'div', 'btn_wrapper');
      const btnCancel = f.create(btnWrapper, 'div', 'btn_cancel btn');
      btnCancel.innerHTML = 'cancel';
      btnCancel.addEventListener('click', () => {
         tooltips.forEach((item) => {const elem = item; elem.style.visibility = 'hidden';});
         overlay.style.visibility = 'hidden';
         form.style.visibility = 'hidden';
      });

      const btnAddUser = f.create(btnWrapper, 'button', 'btn_add-user btn');
      btnAddUser.innerHTML = 'Add user';
      btnAddUser.setAttribute('type', 'submit');

      function formAddError(input: Element) {
         input.classList.add('_error');
      }

      function formAddChecked(input: Element) {
         input.classList.add('_checked');
      }

      function formUnmarkError(input: Element) {
         input.classList.remove('_error');
      }

      function nameTest(input: string) {
         return !/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(input);
      }

      function emailTest(input: string) {
         return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)(\.\w{2,8})+$/.test(input);
      }
      function formValidate() {
         for (let i = 0; i < formReq.length; i+=1) {
            const input: HTMLInputElement = formReq[i] as HTMLInputElement;
            formUnmarkError(input);
            if (input.value.length === 0) {
               formAddError(input);
               tooltips[i].style.visibility = 'visible';
               tooltips[i].innerHTML = 'Поле не должно быть пустым';
            } else if (input.classList.contains('_email')) {
               if (emailTest(input.value)) {
                  formAddError(input);
                  tooltips[i].style.visibility = 'visible';
                  tooltips[i].innerHTML = 'Неправильный e-mail';
               } else {
                  formAddChecked(input);
                  tooltips[i].style.visibility = 'hidden';
               }
            } else if (nameTest(input.value)) {
               formAddError(input);
               tooltips[i].style.visibility = 'visible';
               tooltips[i].innerHTML = 'Имя не может содержать: ~ ! @ # $ % * () _ — + = | : ; " \' ` < > , . ? / ^ и цифры';
            } else {
               formAddChecked(input);
               tooltips[i].style.visibility = 'hidden';
            }
         }



      }
      function formSend(e: Event) {
         e.preventDefault();
         formValidate();
         let isAllChecked = true;
         formReq.forEach(item => { if (!item.classList.contains('_checked')) isAllChecked = false; });

         if (isAllChecked) {
            overlay.style.visibility = 'hidden';
            form.style.visibility = 'hidden';
            State.instance().publish(State.Events.userRegistered,'');
         }
      }

      btnAddUser.addEventListener('click', formSend);
   }
}
