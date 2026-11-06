// ✏️  EDIT EVERYTHING HERE — text, media paths and options.
const base = import.meta.env.BASE_URL

export const config = {
  // ---- Page 1 ----
  giftText: 'Happy 21st Birthday my little princess',
  giftButton: 'OPEN YOUR GIFT',

  // ---- Page 2 (the letter) ----
  letterTitle: 'For my little Cristine',
  // Separate paragraphs with a blank line. Any length works.
  message: `first of all, i want to greet you a HAPPY BIRTHDAY, MY LOVE!!!! 21 KANA AYYYYIIIEEE!! HAHAHAHA!

but love, ive only been with you for a short time.. pero somehow i feel like youre already overthinking what might come in the next chapters of your life. youre probably thinking about the things you want to become and where you see yourself in the future. all i can say is. kalma lang love okay? youre only entering a stage in your life where youll discover more about yourself or what you truly want and what makes you happy. youre still learning how to make your own decisions, take responsibility for them, build your future, and pursue your goals.

and love, i know that taking mechanical engineering wasnt really what you wanted for yourself. i know that your dream has always been to become a general surgeon and i can only imagine how difficult and exhausting it must be to pursue a path that you didnt originally see yourself taking. i know there are days when things get overwhelming, when you feel tired and maybe even wonder if youre on the right path. but love i hope you know that im so proud of you for still showing up and doing your best despite everything.

i dont want you to think that just because youre taking a different path right now, you have to let go of the dream you once had. okay? your dreams are still valid love. and you dont have to figure everything out right now. take your time, breathe and dont be too hard on yourself okay?. i hope and wish that someday youll get the chance to pursue the career that your heart truly wants. and when that day comes, please know that ill be one of the people cheering the loudest for you.

and someday love, when were finally together and have our own family and build a stable life, ill support you in becoming the "dr. cristine," our future GENERAL SURGEON!! HMMM! well be supporting you and of course our future kids will be cheering for you too!!!. i know the road might not be easy and maybe things wont happen exactly when or how you want them to.. but i hope you never lose that dream. and whatever happens along the way i hope you know that you dont have to carry everything by yourself. im here na love!!. ill always be here to support you, whether you need someone to listen, someone to comfort you or simply someone to remind you that youre doing better than you think.

and love, i know its not that easy to stop overthinking but loveee, hingaaa muna. kalmaaaa. dont pressure yourself too much okay? enjoy the present. take things one step at a time. lets make memories, explore new experiences and enjoy every little moment together. and someday when were finally able to, lets travel the world and enjoy life together. i want us to experience so many things side by side.

like i said diba? being 21 doesnt mean you have to have everything figured out already hm! youre still allowed to make mistakes, start over, change your mind and grow at your own pace. you dont have to rush yourself just because you feel like everyone else is already figuring things out. theres no deadline for becoming the person you want to be.

andito lang ako lagi okay? ill stay nomatter what and ill continue loving you every single day. dont ever be afraid to show me your other 99 personalities. hahaaha. ill tame them, hug them tightly and love every single one of them. because theyre all part of you. theyre all part of the cristine that i fell in love with and continue to love every day. i want to know every side of you, even the ones you think are difficult to love.

LOOOOVEEE!! HAPPY 21ST BIRTHDAY ULIIIIIIT!! I LOVE, LOVE, LOVE, LOOOOOVEEE YOUUUU SO MUCH!!!

i wish you good health (kahit ang lakas mo mag coke at magpuyat hehe). i wish you success in life and in your future career. i wish you happiness, peace of mind and all the good things this world has to offer. i hope life becomes kinder to you and i hope you never lose the courage to pursue the things that make you happy.

and love! always remember this ha? im always here for you. through your good days, bad days, achievements, failures and everything in between. you dont have to face everything alone. you have me na okay? ako na to ohhh? ANG ASAWA MOOOO!!

well.. it saddens me na i cant send you a gift or anything special right now. i cant even celebrate your birthday with you in person and honestly, i wish i could be there to hug you, spoil you and make your day extra special. but even with the distance between us... i still want to do something for my birthday girl kase love love ko yang baby girl ko na yaan ihh hehe. i may not be able to give you everything i want to right now. but i hope this little message reminds you how loved, appreciated and special you are to me.

once again my sweet and loving wife, HAPPY BIRTHDAY MY LOVE!! enjoy your day okay? you deserve all the happiness in the world.

I LOVE YOU SO SO SOOOOOO MUCH! MY FUTURE WIFE!! THE FUTURE MOTHER OF MY CHILD, MWAHHHH!! ❤️`,
  signature: 'With all my love from moon and back,\nJulian ng buhay mo',
  surpriseButton: 'ONE LAST SURPRISE ✨',

  // ---- Final scene ----
  revealLine1: 'HAPPY BIRTHDAY!',
  revealLine2: 'Cristine Mae Delima ng Buhay koo ❤️❤️',
  revealEmoji: '🎂',
  revealSubtitle: 'i hope your day is as beautiful, warm and wonderful as the person you are mylove',
  replayLabel: 'Do you want to watch again it love???', // this button opens the storybook

  // ---- Storybook: EXACTLY 4 pages ----
  // Pages 1-3 are story pages (the `pages` array below). Page 4 is the proposal,
  // revealed by turning Page 3 — it is part of the book, not a separate screen.
  storybook: {
    pages: [
      {
        eyebrow: 'THE BEGINNING',
        text: [
          'Every beautiful story has a beginning...',
          'And sometimes, the most unexpected people become the most important chapters of our lives.',
        ],
        button: 'TURN THE PAGE →',
      },
      {
        eyebrow: 'THE JOURNEY',
        text: [
          'If I could choose a thousand times, I would still choose the moments that led me to you.',
          'Because having you in my life makes every ordinary day feel a little more beautiful.',
        ],
        button: 'ONE MORE PAGE →',
      },
      {
        eyebrow: 'THE FINAL CHAPTER',
        text: ['And now, there’s just one question left...'],
        button: 'OPEN THE FINAL CHAPTER ✨',
      },
    ],
    // Page 4
    proposal: {
      title: 'Cristine mylove\nWill you marry me? 💍',
      text: 'Every beautiful story has a next chapter. I hope I can spend all of mine with you.',
      yes: 'YES! ❤️',
      no: 'NO 🙈',
    },
    // Shown on Page 4 after she says yes
    celebration: {
      title: 'YOU SAID YES! WHOOHOO!!!! ❤️',
      lines: ['Woooyyysstt touch moved naaa!!! walang bawiaaan!.', 'heres another ring mylove!!!. I LOVE YOUUUU!! 💍'],
      replay: 'Want the kilig again? click here! ↺', // returns to the very first page
    },
  },

  // ---- Media (replace the files in public/assets, or change the names here) ----
  assets: {
    background: `${base}assets/background.mp4`,
    surprise: `${base}assets/surprise-video.mp4`,
    music: `${base}assets/birthday-music.mp3`,
    // plays when she clicks YES (replace the file with your own song; a missing file is silently skipped)
    yesMusic: `${base}assets/yes-music.mp3`,
  },
  // Music only ever starts after a click. true = it starts when she clicks "Open your gift".
  startMusicOnGiftOpen: true,
}
