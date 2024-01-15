console.log('Add your name in {{name}}');
console.log('Add the current date in {{date}}');
console.log('Add a dialog that triggers when the visitor clicks Contact information');

//Global Constant
const me = {
    name: 'Yousef Sayed',
    date: '15/1/2024'
}
const components = {
    main:/*html*/`
        <p>
          I had seen little of Holmes lately. My marriage had drifted us away
          from each other. My own complete happiness, and the home-centred
          interests which rise up around the man who first finds himself
          master of his own establishment, were sufficient to absorb all my
          attention, while Holmes, who loathed every form of society with his
          whole Bohemian soul, remained in our lodgings in Baker Street,
          buried among his old books, and alternating from week to week
          between cocaine and ambition, the drowsiness of the drug, and the
          fierce energy of his own keen nature. He was still, as ever, deeply
          attracted by the study of crime, and occupied his immense faculties
          and extraordinary powers of observation in following out those
          clues, and clearing up those mysteries which had been abandoned as
          hopeless by the official police. From time to time I heard some
          vague account of his doings: of his summons to Odessa in the case of
          the Trepoff murder, of his clearing up of the singular tragedy of
          the Atkinson brothers at Trincomalee, and finally of the mission
          which he had accomplished so delicately and successfully for the
          reigning family of Holland. Beyond these signs of his activity,
          however, which I merely shared with all the readers of the daily
          press, I knew little of my former friend and companion.
        </p>

        <p>
          One night--it was on the twentieth of March, 1888--I was returning
          from a journey to a patient (for I had now returned to civil
          practice), when my way led me through Baker Street. As I passed the
          well-remembered door, which must always be associated in my mind
          with my wooing, and with the dark incidents of the Study in Scarlet,
          I was seized with a keen desire to see Holmes again, and to know how
          he was employing his extraordinary powers. His rooms were
          brilliantly lit, and, even as I looked up, I saw his tall, spare
          figure pass twice in a dark silhouette against the blind. He was
          pacing the room swiftly, eagerly, with his head sunk upon his chest
          and his hands clasped behind him. To me, who knew his every mood and
          habit, his attitude and manner told their own story. He was at work
          again. He had risen out of his drug-created dreams and was hot upon
          the scent of some new problem. I rang the bell and was shown up to
          the chamber which had formerly been in part my own.
        </p>
        <p>
          His manner was not effusive. It seldom was; but he was glad, I
          think, to see me. With hardly a word spoken, but with a kindly eye,
          he waved me to an armchair, threw across his case of cigars, and
          indicated a spirit case and a gasogene in the corner. Then he stood
          before the fire and looked me over in his singular introspective
          fashion.
        </p>
    `,
    contact:/*html*/`
        <p class="contact-p">Email: yousef.sayed1231@gmail.com</p>
        <p class="contact-p">Phone: +201120020890</p>
        <p class="contact-p">Whatsapp: +201120020890</p>
    `
}

/**
 * It gets all element which has same ref and edit his text content based on refs which inputing
 * @param {string} refName 
 * @param {object} initRefs 
 */
const setTextContent = (refName, initRefs) => {
    if (!initRefs) throw new Error(`You should set init refs`);
    if (initRefs && typeof initRefs != 'object') throw TypeError(`initRefs type must to be an object`);
    const elements = document.querySelectorAll(`[ref='${refName}']`);
    const cloneText = [];
    elements.forEach(el => {
        cloneText.push(el.textContent);
        for (const key in initRefs) {
            el.textContent = el.textContent.replaceAll(`{{${key}}}`, initRefs[key]);
        }
    });

    return {
        /**
         * It takes new values of refs and rerender all text at all elements which has it
         * @param {object} newValOfRefs 
         */
        set(newValOfRefs) {
            cloneText.forEach((oldText, i) => {
                for (const key in newValOfRefs) {
                    newText = oldText.replaceAll(`{{${key}}}`, newValOfRefs[key]);
                    if (oldText == newText) return;
                    elements[i].textContent = newText;
                }
            })
        }
    }
}
setTextContent('me', me);

/**
 * It is render the element based on components object by hash
 * @param {string} el 
 * @param {{[key]:string}} components 
 */
const render = (el , components)=>{
    const element = document.querySelector(el);
    const setInner = ()=>{
        const {hash} = location;
        if(!hash){element.innerHTML = components['main']; return}
        element.innerHTML = components[hash.replace('#','')];
    }
    window.addEventListener('load',()=>{
       setInner()
    })
    window.addEventListener('hashchange',(ev)=>{
       setInner();
    })
}
render(`#app main article`,components)

/**
 * It make your specific element responsive with window height and width
 * @advice If you wanna use it so use it with "body" element and make your render element like "#app" | "#root" whatever take all width and hight by css.
 * @param {string} root 
 */
const makeAppResponsive = (root) => {
    const el = document.querySelector(root);
    if (!el) throw new Error(`Your element root "${root}" is ${el}`)
    el.style.height = `${window.innerHeight}px`;
    window.addEventListener('resize', () => el.style.height = `${window.innerHeight}px`)
}

makeAppResponsive('#app')
