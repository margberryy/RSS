import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "./redux/rootReducer";
import thunk from "redux-thunk";
import {logger} from "redux-logger";
import {composeWithDevTools} from 'redux-devtools-extension'


export class State {
    private static createdInstance: State;
    actualTheme: string;
    currentCards: HTMLElement[] = [];
    CardsTheme: string[] = ['actions', 'animals', 'clothes', 'emotions', 'food', 'furniture', 'hospital', 'body'];

    public static instance(): State {

        if (!State.createdInstance) {
            State.createdInstance = new State();
        }
        return State.createdInstance;

    }

    store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk, logger)
        )
    )
    Cards: [({ image: string; audioSrc: string; translation: string; word: string })[],
        ({ image: string; audioSrc: string; translation: string; word: string })[],
        ({ image: string; audioSrc: string; translation: string; word: string })[],
        ({ image: string; audioSrc: string; translation: string; word: string })[],
        ({ image: string; audioSrc: string; translation: string; word: string })[],
        ({ image: string; audioSrc: string; translation: string; word: string })[],
        ({ image: string; audioSrc: string; translation: string; word: string })[],
        ({ image: string; audioSrc: string; translation: string; word: string })[]] = [
        [
            {
                word: 'climb',
                translation: 'взбираться',
                image: 'assets/actions/climb.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/climb.mp3'
            },
            {
                word: 'dive',
                translation: 'нырять',
                image: 'assets/actions/dive.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/dive.mp3'
            },
            {
                word: 'drive',
                translation: 'ездить',
                image: 'assets/actions/drive.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/drive.mp3'
            },
            {
                word: 'jump',
                translation: 'прыгать',
                image: 'assets/actions/jump.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/jump.mp3'
            },
            {
                word: 'run',
                translation: 'бежать',
                image: 'assets/actions/run.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/run.mp3'
            },
            {
                word: 'shoot',
                translation: 'стрелять',
                image: 'assets/actions/shoot.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/shoot.mp3'
            },
            {
                word: 'ski',
                translation: 'кататься на лыжах',
                image: 'assets/actions/ski.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/ski.mp3'
            },
            {
                word: 'surf',
                translation: 'серфить',
                image: 'assets/actions/surf.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/surf.mp3'
            },

        ],
        [
            {
                word: 'cat',
                translation: 'кот',
                image: 'assets/animals/cat.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/cat.mp3'
            },
            {
                word: 'chicken',
                translation: 'курица',
                image: 'assets/animals/chicken.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/chicken.mp3'
            },
            {
                word: 'deer',
                translation: 'олень',
                image: 'assets/animals/deer.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/deer.mp3'
            },
            {
                word: 'elephant',
                translation: 'слон',
                image: 'assets/animals/elephant.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/elephant.mp3'
            },
            {
                word: 'owl',
                translation: 'сова',
                image: 'assets/animals/owl.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/owl.mp3'
            },
            {
                word: 'panda',
                translation: 'панда',
                image: 'assets/animals/panda.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/panda.mp3'
            },
            {
                word: 'parrot',
                translation: 'попугай',
                image: 'assets/animals/parrot.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/parrot.mp3'
            },
            {
                word: 'penguin',
                translation: 'пингвин',
                image: 'assets/animals/penguin.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/penguin.mp3'
            },
            {
                word: 'pig',
                translation: 'свинья',
                image: 'assets/animals/pig.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/pig.mp3'
            }

        ],
        [
            {
                word: 'hat',
                translation: 'шляпа',
                image: 'assets/clothes/hat.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/hat.mp3'
            },
            {
                word: 'jeans',
                translation: 'джинсы',
                image: 'assets/clothes/jeans.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/jeans.mp3'
            },
            {
                word: 'bag',
                translation: 'сумка',
                image: 'assets/clothes/bag.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/bag.mp3'
            },
            {
                word: 'shoes',
                translation: 'обувь',
                image: 'assets/clothes/shoes.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/shoes.mp3'
            },
            {
                word: 'swimsuit',
                translation: 'купальник',
                image: 'assets/clothes/swimsuit.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/swimsuit.mp3'
            },
            {
                word: 'shirt',
                translation: 'рубашка',
                image: 'assets/clothes/tshirt.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/shirt.mp3'
            },
            {
                word: 'underwear',
                translation: 'нижнее белье',
                image: 'assets/clothes/underwear.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/underwear.mp3'
            },
            {
                word: 'skirt',
                translation: 'юбка',
                image: 'assets/clothes/skirt.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/skirt.mp3'
            },


        ],
        [
            {
                word: 'angry',
                translation: 'злой',
                image: 'assets/emotions/angry.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/angry.mp3'
            },
            {
                word: 'bored',
                translation: 'скучающий',
                image: 'assets/emotions/bored.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/bored.mp3'
            },
            {
                word: 'crazy',
                translation: 'сумашедший',
                image: 'assets/emotions/crazy.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/crazy.mp3'
            },
            {
                word: 'happy',
                translation: 'счастливый',
                image: 'assets/emotions/happy.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/happy.mp3'
            },
            {
                word: 'enamored',
                translation: 'влюбленный',
                image: 'assets/emotions/love.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/enamored.mp3'
            },
            {
                word: 'sad',
                translation: 'грустный',
                image: 'assets/emotions/sadness.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/sadn.mp3'
            },
            {
                word: 'sleepy',
                translation: 'спящий',
                image: 'assets/emotions/sleepy.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/sleepy.mp3'
            },
            {
                word: 'surprised',
                translation: 'удивленный',
                image: 'assets/emotions/surprised.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/surprised.mp3'
            },


        ],
        [
            {
                word: 'apple',
                translation: 'яблоко',
                image: 'assets/food/apple.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/apple.mp3'
            },
            {
                word: 'carrot',
                translation: 'морковь',
                image: 'assets/food/carrot.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/carrot.mp3'
            },
            {
                word: 'cheese',
                translation: 'сыр',
                image: 'assets/food/cheese.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/cheese.mp3'
            },
            {
                word: 'cherries',
                translation: 'вишня',
                image: 'assets/food/cherries.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/cherries.mp3'
            },
            {
                word: 'fish',
                translation: 'влюбленный',
                image: 'assets/food/fish.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/fish.mp3'
            },
            {
                word: 'lemon',
                translation: 'лимон',
                image: 'assets/food/lemon.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/lemon.mp3'
            },
            {
                word: 'orange',
                translation: 'апельсин',
                image: 'assets/food/orange.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/orange.mp3'
            },
            {
                word: 'tomato',
                translation: 'помидор',
                image: 'assets/food/tomato.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/tomato.mp3'
            },


        ],
        [
            {
                word: 'bed',
                translation: 'кровать',
                image: 'assets/furniture/bed.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/bed.mp3'
            },
            {
                word: 'cabinet',
                translation: 'шкаф',
                image: 'assets/furniture/cabinet.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/cabinet.mp3'
            },
            {
                word: 'chair',
                translation: 'стул',
                image: 'assets/furniture/chair.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/chair.mp3'
            },
            {
                word: 'lamp',
                translation: 'лампа',
                image: 'assets/furniture/lamp.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/lamp.mp3'
            },
            {
                word: 'mirror',
                translation: 'зеркало',
                image: 'assets/furniture/mirror.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/mirror.mp3'
            },
            {
                word: 'shelf',
                translation: 'полка',
                image: 'assets/furniture/shelf.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/shelf.mp3'
            },
            {
                word: 'sofa',
                translation: 'диван',
                image: 'assets/furniture/sofa.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/sofa.mp3'
            },
            {
                word: 'table',
                translation: 'стол',
                image: 'assets/furniture/table.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/table.mp3'
            },


        ],
        [
            {
                word: 'ambulance',
                translation: 'скорая помощь',
                image: 'assets/hospital/ambulance.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/ambulance.mp3'
            },
            {
                word: 'hospital',
                translation: 'больница',
                image: 'assets/hospital/hospital.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/hospital.mp3'
            },
            {
                word: 'injection',
                translation: 'укол',
                image: 'assets/hospital/injection.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/injection.mp3'
            },
            {
                word: 'medicine',
                translation: 'лекарство',
                image: 'assets/hospital/medicine.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/medicine.mp3'
            },
            {
                word: 'microscope',
                translation: 'микроскоп',
                image: 'assets/hospital/microscope.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/microscope.mp3'
            },
            {
                word: 'nurse',
                translation: 'медсестра',
                image: 'assets/hospital/nurse.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/nurse.mp3'
            },
            {
                word: 'stethoscope',
                translation: 'стетоскоп',
                image: 'assets/hospital/stethoscope.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/stethoscope.mp3'
            },
            {
                word: 'thermometer',
                translation: 'термометр',
                image: 'assets/hospital/thermometer.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/thermometer.mp3'
            },


        ],
        [
            {
                word: 'beard',
                translation: 'борода',
                image: 'assets/body/beard.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/beard.mp3'
            },
            {
                word: 'body',
                translation: 'тело',
                image: 'assets/body/body.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/body.mp3'
            },
            {
                word: 'bone',
                translation: 'кость',
                image: 'assets/body/bones.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/bone.mp3'
            },
            {
                word: 'ear',
                translation: 'ухо',
                image: 'assets/body/ear.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/ear.mp3'
            },
            {
                word: 'head',
                translation: 'голова',
                image: 'assets/body/head.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/head.mp3'
            },
            {
                word: 'mouth',
                translation: 'рот',
                image: 'assets/body/mouth.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/mouth.mp3'
            },
            {
                word: 'eye',
                translation: 'глаз',
                image: 'assets/body/eye.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/eye.mp3'
            },
            {
                word: 'tooth',
                translation: 'зуб',
                image: 'assets/body/tooth.png',
                audioSrc: 'https://wooordhunt.ru/data/sound/sow/uk/tooth.mp3'
            },


        ],

    ]


}