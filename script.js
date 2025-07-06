document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const messageBox = document.getElementById('message-box');
    const storyText = document.getElementById('story-text');
    const gameBoard = document.getElementById('game-board');
    const choiceBox = document.getElementById('choice-box');
    const choiceAButton = document.getElementById('choice-a');
    const choiceBButton = document.getElementById('choice-b');
    const weiArmy = document.getElementById('wei-army');
    const qiArmy = document.getElementById('qi-army');
    const zhaoCity = document.getElementById('zhao');
    const weiCity = document.getElementById('wei');

    let storyStep = 0;

    const story = [
        "战国时期，强大的魏国派兵攻打赵国。赵国危在旦夕，向齐国求救。",
        "齐国大将孙膑认为，魏国的精锐部队都在攻打赵国，国内防守一定很空虚。",
        "因此，他建议齐威王，不要直接去救援赵国，而是去攻打魏国的都城——大梁。",
        "现在，你是齐国将军，请做出你的选择！"
    ];

    startButton.addEventListener('click', () => {
        storyStep++;
        if (storyStep < story.length) {
            storyText.textContent = story[storyStep -1];
            if(storyStep === story.length -1) startButton.textContent = "做选择"
        } else {
            messageBox.classList.add('hidden');
            gameBoard.classList.remove('hidden');
            choiceBox.classList.remove('hidden');
        }
    });

    // Choice A: Direct rescue (Wrong choice)
    choiceAButton.addEventListener('click', () => {
        choiceBox.classList.add('hidden');
        storyText.textContent = "你选择了直接救援赵国。齐军匆忙赶去，与魏国的精锐部队相遇，陷入了苦战...";
        messageBox.classList.remove('hidden');

        // Animate Qi army moving towards Zhao
        qiArmy.style.top = '80px';
        qiArmy.style.left = '80px';

        setTimeout(() => {
            storyText.innerHTML = "<b>结果：</b>虽然解了赵国之围，但齐军也损失惨重。这不是最佳策略。<br><br>让我们看看另一个选择会发生什么。";
            setTimeout(() => {
                resetGame();
                choiceBButton.click(); // Simulate the correct choice
            }, 4000);
        }, 3000);
    });

    // Choice B: Attack Wei's capital (Correct choice)
    choiceBButton.addEventListener('click', () => {
        choiceBox.classList.add('hidden');

        // 1. Qi army moves to attack Wei
        storyText.textContent = "你选择了攻打魏国都城！齐军向魏国进发。";
        messageBox.classList.remove('hidden');
        qiArmy.style.top = '80px';
        qiArmy.style.right = '80px';
        qiArmy.style.left = 'auto'; // override left

        setTimeout(() => {
            // 2. Wei army gets the message and rushes back
            storyText.textContent = "消息传到魏军大营，他们大惊失色，急忙从赵国撤兵，赶回都城救援。";
            weiArmy.style.top = '150px';
            weiArmy.style.left = '400px'; // Move back towards Wei
            zhaoCity.style.boxShadow = '0 0 20px 5px #00ff00'; // Green glow = saved
        }, 2500);

        setTimeout(() => {
            // 3. Qi army ambushes the returning Wei army
            storyText.textContent = "孙膑早已在魏军回国的必经之路上设下埋伏。魏军仓皇回撤，人困马乏，最终被齐军打得大败！";
             // Move armies to clash point
            qiArmy.style.top = '200px';
            qiArmy.style.left = '350px';
            weiArmy.style.top = '250px';
            weiArmy.style.left = '380px';
        }, 5000);

         setTimeout(() => {
            // 4. Final explanation
            storyText.innerHTML = `<b>结果：</b>赵国之围被解除，齐军也取得了大胜！<br><br>这就是“围魏救赵”的由来。这个策略告诉我们，要善于抓住敌人的弱点，避开敌人的主力，从而用更小的代价取得胜利。`;
            const restartButton = document.createElement('button');
            restartButton.textContent = '重新开始';
            restartButton.onclick = () => window.location.reload();
            messageBox.appendChild(restartButton);
        }, 8000);
    });

    function resetGame() {
        // Reset styles and positions
        qiArmy.style.top = '';
        qiArmy.style.left = '150px';
        qiArmy.style.right = '';
        weiArmy.style.top = '40px';
        weiArmy.style.left = '150px';
        zhaoCity.style.boxShadow = '';
        messageBox.classList.add('hidden');
        choiceBox.classList.remove('hidden');
    }
});