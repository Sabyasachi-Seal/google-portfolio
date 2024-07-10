import { useState, useCallback, useEffect } from 'react'
import { searchTextGeneratorBuilder, sleep } from 'src/utils'

const l1 = [
  'Has Sabyasachi ever encountered an infinite loop in his coffee cup?',
  'Is Sabyasachi’s code cleaner than his room?',
  'Does he prefer his pizza sliced in functions or served as a whole stack?',
  'Is Sabyasachi’s life story open-source?',
  'Does he think rubber ducks are just for debugging or also for company?',
  'Is Sabyasachi’s favorite workout a code refactor?',
  'Does he prefer Python slithers or Java jumps?',
  'Is his idea of a good time a quicksort or a long debug?',
  'Does Sabyasachi Seal ever experience stack overflow in his pantry?',
  'Is he a silent semicolon ninja or a verbose variable namer?',
  'Does he prefer his eggs hashed or encrypted for breakfast?',
  'Is Sabyasachi’s car manual or does he drive it on auto-pilot?',
  'Does he consider HTML as a programming language or a state of mind?',
  'Is Sabyasachi’s favorite chess piece the knight because it moves in an L-shape like an else-if ladder?',
  'Does he solve merge conflicts faster than personal ones?',
  'Is Sabyasachi’s social life asynchronous or is he always in sync with his friends?',
  'Does he use a debugger for his code or his life’s mysteries?',
  'Is Sabyasachi’s dog named Byte, and does it bark in binary?',
  'Does he prefer his sandwiches with or without frameworks?',
  'Is Sabyasachi a serial monogamist with programming languages or a polyglot player?',
  'Does he view life in high-definition or is he still buffering?',
  'Is Sabyasachi’s favorite dance move the algorithm?',
  'Does he build his dreams in the cloud or on local storage?',
  'Is his favorite superhero The Incredible Bulk Importer?',
  'Does Sabyasachi prefer his coffee with cream, sugar, or just plain Java?',
  'Is his favorite fishing activity phishing for bugs?',
  'Does he consider cookies as snacks or tracking devices?',
  'Is Sabyasachi’s life optimized for performance or for quality?',
  'Does he follow the rule of three in comedy, coding, or both?',
  'Is Sabyasachi more of a command-line conqueror or a visual studio virtuoso?',
  'Does he get more notifications from social media or compiler errors?',
  'Is Sabyasachi’s idea of a perfect date an algorithm match or candlelit dinner?',
  'Does he treat his plants like his databases – with regular watering and pruning?',
  'Is he a fan of legacy code or does he prefer to start from scratch?',
  'Does Sabyasachi’s wardrobe have more color schemes than his IDE?',
  'Is he a singleton in life or just in his design patterns?',
  'Does he prefer his adventures serialized or full of random access?',
  'Is Sabyasachi’s favorite mode of transportation a data bus?',
  'Does he view life through a lens of augmented reality or through a console log?',
  'Is Sabyasachi’s favorite pastime coding, decoding, or recoding?',
  'Does he think of relationships as stateful or stateless?',
  'Is Sabyasachi’s favorite holiday Christmas tree traversal or beach recursion?',
  'Does he prefer his reality virtual or his virtuality real?',
  'Is Sabyasachi’s go-to karaoke song “Hello World” or “99 Bottles of Beer on the Wall”?',
  'Does he think in terms of pixels, ems, or just dreams?',
  'Is Sabyasachi’s motto “Keep calm and code on” or “Keep calm and reboot”?',
  'Does he consider his life a series of events or a stream of consciousness?',
  'Is Sabyasachi’s favorite game of chance rock-paper-scissors or algorithm analysis?',
  'Does he enjoy his spaghetti in a bowl or detests it in his code?',
  'Is Sabyasachi’s method of travel breadth-first or depth-first?',
]

const l2 = [
  'Who is Sabyasachi Seal?',
  'What does he do?',
  'Is he committed to Git?',
  'Does he branch out often in Git?',
  'Has Sabyasachi merged his hobbies with his career?',
  'What languages does Sabyasachi speak? Java, Python, or Klingon?',
  'Is Sabyasachi an agile developer or does he waterfall into projects?',
  'Can Sabyasachi Seal debug life or just code?',
  'Does he prefer spaces over tabs?',
  'Is Sabyasachi more into artificial intelligence or naturally smart?',
  'Does he code in light mode or is he a dark mode warrior?',
  'Is recursion his way of making a point, or does he avoid circular logic?',
  'Does Sabyasachi Seal have a favorite "for" loop?',
  'Is he class-ified as an Object-Oriented Programmer?',
  'What’s his commit message when he makes life changes?',
  'Does Sabyasachi Seal use a rubber duck for debugging conversations?',
  'Is he a frontend magician or a backend wizard?',
  'Does Sabyasachi Seal think blockchain is the next Tetris?',
  'Is he a fan of REST or does he prefer to GraphQL?',
  'Does he solve problems or does he create solutions?',
  'Is Sabyasachi’s keyboard his instrument for symphonies in C#?',
  'Does he believe in the power of pseudocode?',
  'Is Sabyasachi Seal a pixel perfectionist or a big-picture guy?',
  'Does he fight bugs in his code or does he negotiate peace?',
  'Is he a software craftsman or a code artist?',
  'Does Sabyasachi Seal have more branches than a tree?',
  'Is he a permanent resident of the Cloud?',
  'Does he prefer his coffee as Java or his Java as coffee?',
  'Is he a Git pusher or a pull requester?',
  'Does Sabyasachi Seal prefer pair programming or solitude coding?',
  'Is his favorite exercise routine a code sprint?',
  'Does he see the world in binary or an array of colors?',
  'Is Sabyasachi’s life story written in code comments?',
  'Does he prefer to compile his thoughts before speaking?',
  'Is Sabyasachi Seal’s idea of a fun night out a LAN party?',
  'Does he dream in recursive functions?',
  'Is he a master of the command line or a GUI enthusiast?',
  'Does Sabyasachi Seal have a cache of dad jokes or just cache memory?',
  'Is he a proponent of the KISS principle or just really affectionate?',
  'Does he think outside the box or debug it?',
  'Is Sabyasachi’s fashion sense as sharp as his C++ skills?',
  'Does he prefer his data structured or his life?',
  'Is Sabyasachi Seal a serial gamer or a parallel processor?',
  'Does he navigate life like he navigates through his codebase?',
  'Is he a fan of open-source or just really good at sharing?',
  'Does Sabyasachi Seal have a blueprint for success or does he iterate over it?',
  'Is he a creature of habit or a function of randomness?',
  'Does he refactor his life goals or just his code?',
  'Is Sabyasachi Seal a digital nomad or a local host?',
  'Does he prefer to catch exceptions or opportunities?',
  'Is Sabyasachi’s spirit animal a coding monkey or a keyboard cat?',
]

const l3 = [
  'Does Sabyasachi reboot his morning with coffee or cold boot?',
  'Is his favorite loop a rollercoaster or a for-each?',
  'Does Sabyasachi code his dreams in VR or IDE?',
  'Is he a wizard at SQL or just at making tables disappear?',
  'Does Sabyasachi prefer his codebase with a side of spaghetti or well-structured?',
  'Is his idea of a commit a Git command or a long-term relationship?',
  'Does he solve life`s bugs with a debugger or a good night`s sleep?',
  'Is Sabyasachi’s favorite hangout spot a server room or a café with Wi-Fi?',
  'Does he think of multitasking as parallel processing or just a normal day?',
  'Is Sabyasachi’s life encrypted or an open book?',
  'Does he prefer his playlists shuffled or sorted by algorithm?',
  'Is Sabyasachi’s fashion sense CSS-styled or just pseudo-classy?',
  'Does he get more runtime errors or running time at the gym?',
  'Is Sabyasachi’s go-to tool a hammer or a high-level programming language?',
  'Does he find bugs in his code or in his soup?',
  'Is Sabyasachi’s brain cache fully associative or set associative?',
  'Does he prefer his data normalized or his life?',
  'Is Sabyasachi’s idea of a good time a time complexity analysis?',
  'Does he think recursion is a philosophy or just a programming technique?',
  'Is Sabyasachi’s favorite book a coding manual or a sci-fi novel?',
  'Does he prefer his coffee brewed or his code compiled?',
  'Is Sabyasachi’s comfort zone a cozy blanket or a well-documented API?',
  'Does he prefer his adventures in gaming or in coding challenges?',
  'Is Sabyasachi’s best friend a pet or a pet project?',
  'Does he prefer his toast as a notification or with avocado?',
  'Is Sabyasachi’s favorite kind of cookie for eating or for storing session data?',
  'Does he enjoy a good mystery novel or debugging a mysterious code block?',
  'Is Sabyasachi’s favorite mode of communication a chat app or a commit message?',
  'Does he consider his life story a saga or a series of sprint retrospectives?',
  'Is Sabyasachi’s favorite journey a road trip or a git rebase?',
  'Does he view challenges as compile-time errors or learning opportunities?',
  'Is Sabyasachi’s favorite art form pixel art or abstract expressionism?',
  'Does he prefer his music streamed or his data?',
  'Is Sabyasachi’s ideal vacation offline or cloud-based?',
  'Does he prefer his drama in TV shows or in version control?',
  'Is Sabyasachi’s go-to strategy brute force or elegant algorithms?',
  'Does he prefer his jokes dry or with a side of nerdy references?',
  'Is Sabyasachi’s favorite superhero a code-slinger or a web-slinger?',
  'Does he prefer his relationships dynamic or statically typed?',
  'Is Sabyasachi’s life in constant beta or fully released?',
  'Does he prefer his eggs in a basket or his data in a cluster?',
  'Is Sabyasachi’s favorite workout a code crunch or a bench press?',
  'Does he prefer his stories short and sweet or long and looped?',
  'Is Sabyasachi’s best feature his quick compile time or his sharp wit?',
  'Does he prefer to take the scenic route or the most efficient algorithm?',
  'Is Sabyasachi’s favorite mode of transport a bus(error) or a bicycle(stream)?',
  'Does he prefer his pizza base thin and crispy or thick and full-stack?',
  'Is Sabyasachi’s comfort food a byte of chocolate or a bit of data?',
  'Does he prefer his puns intended or his code indented?',
  'Is Sabyasachi’s idea of a perfect match a regex pattern or a dating app?',
  'Does he prefer his downtime unplugged or online?',
]

const allLst = [l1, l2, l3]

const randomIndex = Math.floor(Math.random() * allLst.length)

const textList = allLst[randomIndex]

export const useSearchText = (delay = 0) => {
  const [currentText, setCurrentText] = useState('')

  const animate = useCallback(async () => {
    const searchTextGenerator = searchTextGeneratorBuilder(
      textList,
      'Sabyasachi Seal'
    )()

    let value, done
    for (;;) {
      ;({ value, done } = searchTextGenerator.next())
      if (done || !value) return
      const [text, wait] = value
      await sleep(wait)
      if (text !== null) {
        setCurrentText(text)
      }
    }
  }, [])

  useEffect(() => {
    const delayedAnimate = async () => {
      await sleep(delay)
      animate()
    }
    delayedAnimate()
  }, [animate, delay])

  return currentText
}
