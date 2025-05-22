// 主脚本文件
// 处理社交媒体分享按钮点击事件

// 绑定分享按钮点击事件
function InitShareButtons() {
    // 微信分享
    document.querySelector('.share-btn.wechat').onclick = function() {
        alert('请在微信中手动分享本页面链接！');
    };
    // 微博分享
    document.querySelector('.share-btn.weibo').onclick = function() {
        alert('请在微博中手动分享本页面链接！');
    };
    // QQ分享
    document.querySelector('.share-btn.qq').onclick = function() {
        alert('请在QQ中手动分享本页面链接！');
    };
}

// 星级评分高亮功能
function InitStarRating() {
    // 获取所有评分按钮
    var starBtns = document.querySelectorAll('.star-btn');
    starBtns.forEach(function(btn) {
        btn.onclick = function() {
            var food = btn.getAttribute('data-food');
            var rating = parseInt(btn.getAttribute('data-rating'));
            // 选中所有同一美食的星星
            var allStars = document.querySelectorAll('.star-btn[data-food="' + food + '"]');
            allStars.forEach(function(star, idx) {
                if (idx < rating) {
                    star.style.color = '#ffb400'; // 高亮色
                } else {
                    star.style.color = '#bbb'; // 灰色
                }
            });
        };
    });
}

// 美食投票功能
function InitVoteButtons() {
    // 所有美食key
    var foods = [
        {key: 'beijingkaoya', name: '北京烤鸭'},
        {key: 'lanzhou', name: '兰州拉面'},
        {key: 'xihucuyu', name: '西湖醋鱼'},
        {key: 'chongqing', name: '重庆火锅'},
        {key: 'xian', name: '西安肉夹馍'},
        {key: 'yunnan', name: '云南过桥米线'},
        {key: 'guangdong', name: '广东早茶'}
    ];
    // 初始化票数
    foods.forEach(function(food) {
        var count = localStorage.getItem('vote_' + food.key);
        if (count === null) {
            localStorage.setItem('vote_' + food.key, '0');
            count = '0';
        }
        var countSpan = document.getElementById(food.key + '-count');
        if (countSpan) countSpan.textContent = count;
    });
    // 绑定投票按钮
    var voteBtns = document.querySelectorAll('.vote-btn');
    voteBtns.forEach(function(btn) {
        btn.onclick = function() {
            var foodKey = btn.getAttribute('data-food');
            var count = parseInt(localStorage.getItem('vote_' + foodKey) || '0') + 1;
            localStorage.setItem('vote_' + foodKey, count);
            var countSpan = document.getElementById(foodKey + '-count');
            if (countSpan) countSpan.textContent = count;
            UpdateRanking();
        };
    });
    // 初始加载排行榜
    UpdateRanking();
    // 排行榜更新函数
    function UpdateRanking() {
        // 获取所有票数
        var foodVotes = foods.map(function(food) {
            return {
                key: food.key,
                name: food.name,
                count: parseInt(localStorage.getItem('vote_' + food.key) || '0')
            };
        });
        // 按票数降序排序
        foodVotes.sort(function(a, b) { return b.count - a.count; });
        // 生成排行榜HTML
        var rankingList = document.getElementById('ranking-list');
        if (rankingList) {
            rankingList.innerHTML = '';
            foodVotes.forEach(function(food, idx) {
                var li = document.createElement('li');
                li.textContent = (idx+1) + '. ' + food.name + '：' + food.count + '票';
                if (idx === 0 && food.count > 0) {
                    li.style.color = '#d2691e';
                    li.style.fontWeight = 'bold';
                }
                rankingList.appendChild(li);
            });
        }
    }
}

// 页面加载后初始化
window.addEventListener('DOMContentLoaded', function() {
    InitShareButtons();
    InitVoteButtons();
    InitStarRating();
    // 可在此添加首页动画或其他交互
}); 