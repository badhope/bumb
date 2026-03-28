/**
 * 历史核事件数据库
 */

const HistoricalEvents = {
    events: [
        {
            id: 'hiroshima',
            name: '广岛原子弹爆炸',
            date: '1945-08-06',
            location: { lat: 34.3955, lng: 132.4536, name: '日本广岛' },
            weapon: 'littleBoy',
            yield: 15,
            burstHeight: 'air',
            description: '人类历史上第一次核武器实战使用',
            deaths: 140000,
            casualties: '约14万人死亡，7万人受伤',
            details: `
                <h4>广岛原子弹爆炸</h4>
                <p>1945年8月6日上午8时15分，美国B-29轰炸机"艾诺拉·盖伊"号在广岛上空投下"小男孩"原子弹。</p>
                <ul>
                    <li>爆炸高度：约580米</li>
                    <li>当量：约15千吨TNT</li>
                    <li>火球半径：约180米</li>
                    <li>冲击波杀伤半径：约1.6公里</li>
                    <li>热辐射杀伤半径：约1.3公里</li>
                </ul>
                <p>城市中心区域几乎完全被摧毁，约70%的建筑被毁。</p>
            `
        },
        {
            id: 'nagasaki',
            name: '长崎原子弹爆炸',
            date: '1945-08-09',
            location: { lat: 32.7737, lng: 129.8639, name: '日本长崎' },
            weapon: 'fatMan',
            yield: 21,
            burstHeight: 'air',
            description: '人类历史上第二次核武器实战使用',
            deaths: 70000,
            casualties: '约7万人死亡，7.5万人受伤',
            details: `
                <h4>长崎原子弹爆炸</h4>
                <p>1945年8月11日上午11时02分，美国B-29轰炸机"博克斯卡"号在长崎上空投下"胖子"原子弹。</p>
                <ul>
                    <li>爆炸高度：约500米</li>
                    <li>当量：约21千吨TNT</li>
                    <li>火球半径：约200米</li>
                    <li>冲击波杀伤半径：约1.8公里</li>
                    <li>热辐射杀伤半径：约1.5公里</li>
                </ul>
                <p>由于地形原因，影响范围受到限制，但浦上地区仍被完全摧毁。</p>
            `
        },
        {
            id: 'tsarbomba',
            name: '沙皇炸弹试验',
            date: '1961-10-30',
            location: { lat: 73.4821, lng: 54.5825, name: '新地岛（北冰洋）' },
            weapon: 'tsarBomba',
            yield: 50000,
            burstHeight: 'air',
            description: '人类历史上最大的核武器爆炸',
            deaths: 0,
            casualties: '无（无人区试验）',
            details: `
                <h4>沙皇炸弹试验</h4>
                <p>1961年10月30日，苏联在新地岛进行氢弹试验，代号"沙皇炸弹"。</p>
                <ul>
                    <li>爆炸高度：约4000米</li>
                    <li>当量：约50百万吨TNT</li>
                    <li>火球半径：约4.6公里</li>
                    <li>冲击波可探测距离：约1000公里</li>
                    <li>蘑菇云高度：约67公里</li>
                </ul>
                <p>冲击波绕地球三圈，窗户在900公里外被震碎。</p>
            `
        },
        {
            id: 'castlebravo',
            name: '城堡行动-喝彩',
            date: '1954-03-01',
            location: { lat: 11.6979, lng: 165.2714, name: '比基尼环礁' },
            weapon: 'castleBravo',
            yield: 15000,
            burstHeight: 'surface',
            description: '美国最大的核试验，意外造成严重辐射污染',
            deaths: 0,
            casualties: '辐射病受害者众多',
            details: `
                <h4>城堡行动-喝彩</h4>
                <p>1954年3月1日，美国在比基尼环礁进行氢弹试验。</p>
                <ul>
                    <li>当量：15百万吨（原预期6百万吨）</li>
                    <li>爆炸方式：地面爆炸</li>
                    <li>辐射污染面积：约18,000平方公里</li>
                </ul>
                <p>由于风向判断错误，放射性尘埃漂移到马绍尔群岛和日本渔船"第五福龙丸"号。</p>
            `
        },
        {
            id: 'ivymike',
            name: '常春藤-麦克试验',
            date: '1952-11-01',
            location: { lat: 11.6992, lng: 165.2739, name: '埃尼威托克环礁' },
            weapon: 'ivyMike',
            yield: 10400,
            burstHeight: 'surface',
            description: '人类第一次氢弹试验',
            deaths: 0,
            casualties: '无（无人区试验）',
            details: `
                <h4>常春藤-麦克试验</h4>
                <p>1952年11月1日，美国在埃尼威托克环礁进行首次氢弹试验。</p>
                <ul>
                    <li>当量：10.4百万吨</li>
                    <li>设备重量：约62吨</li>
                    <li>蘑菇云高度：约37公里</li>
                </ul>
                <p>证明了氢弹的可行性，开启了热核武器时代。</p>
            `
        },
        {
            id: 'rds1',
            name: 'RDS-1 首次核试验',
            date: '1949-08-29',
            location: { lat: 50.4167, lng: 77.8333, name: '塞米巴拉金斯克' },
            weapon: 'rds1',
            yield: 22,
            burstHeight: 'tower',
            description: '苏联第一颗原子弹试验',
            deaths: 0,
            casualties: '辐射影响持续至今',
            details: `
                <h4>RDS-1 首次核试验</h4>
                <p>1949年8月29日，苏联在塞米巴拉金斯克成功试爆第一颗原子弹。</p>
                <ul>
                    <li>当量：22千吨</li>
                    <li>类型：钚内爆式</li>
                    <li>代号：第一闪电</li>
                </ul>
                <p>打破了美国的核垄断，开启冷战核竞赛。</p>
            `
        }
    ],
    
    /**
     * 获取所有事件
     */
    getAll() {
        return [...this.events];
    },
    
    /**
     * 根据ID获取事件
     */
    getById(id) {
        return this.events.find(e => e.id === id) || null;
    },
    
    /**
     * 复现历史事件
     */
    replayEvent(id, callback) {
        const event = this.getById(id);
        if (!event) {
            console.error('Event not found:', id);
            return null;
        }
        
        const results = window.NuclearCalculator?.calculate(event.yield, event.burstHeight);
        
        const replayData = {
            event: event,
            results: results,
            location: event.location
        };
        
        if (callback) callback(replayData);
        
        return replayData;
    },
    
    /**
     * 获取事件列表（用于UI）
     */
    getEventList() {
        return this.events.map(e => ({
            id: e.id,
            name: e.name,
            date: e.date,
            yield: e.yield,
            location: e.location.name
        }));
    }
};

window.HistoricalEvents = HistoricalEvents;
