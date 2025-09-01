import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle,
  ChevronDown,
  Code,
  Globe,
  Moon,
  Sun,
  Target,
  TrendingDown,
  Users,
  XCircle,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { type ReactElement, useEffect, useState } from 'react';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'; // 定数定義

// 定数定義
const ANIMATION_DELAY_MULTIPLIER = 0.1;
const RADAR_MAX_VALUE = 100;
const RADAR_ANGLE = 90;

// データ定義
const adoptionData = [
  { year: 2018, japan: 12, global: 65 },
  { year: 2019, japan: 15, global: 71 },
  { year: 2020, japan: 18, global: 78 },
  { year: 2021, japan: 20, global: 82 },
  { year: 2022, japan: 21, global: 84 },
  { year: 2023, japan: 22.9, global: 86 },
];

const failurePatterns = [
  { id: 'zombie', name: 'ゾンビスクラム', value: 47, color: '#dc2626' },
  {
    id: 'waterfall',
    name: 'ミニウォーターフォール',
    value: 32,
    color: '#ea580c',
  },
  { id: 'velocity', name: 'ベロシティの武器化', value: 28, color: '#ca8a04' },
  { id: 'authority', name: '権限なき責任', value: 25, color: '#a16207' },
  { id: 'ceremony', name: 'セレモニー重視', value: 18, color: '#854d0e' },
];

const scrumValues = [
  { axis: '確約', ideal: 100, reality: 45 },
  { axis: '集中', ideal: 100, reality: 38 },
  { axis: '公開', ideal: 100, reality: 42 },
  { axis: '尊敬', ideal: 100, reality: 35 },
  { axis: '勇気', ideal: 100, reality: 30 },
];

function App(): ReactElement {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'ideal' | 'reality' | 'insights'>(
    'ideal'
  );
  const [_selectedPattern, setSelectedPattern] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* 動的背景 */}
      <motion.div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 20% ${backgroundY}, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
        }}
      />

      {/* ヘッダー */}
      <header className="navbar sticky top-0 z-50 border-base-300 border-b bg-base-100/80 backdrop-blur-md">
        <div className="flex-1">
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-transparent text-xl">
              スクラム開発の真実
            </span>
          </motion.div>
        </div>
        <div className="flex-none">
          <motion.button
            className="btn btn-ghost btn-circle"
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="hero relative min-h-[60vh] overflow-hidden">
        <div className="hero-content text-center">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 font-bold text-5xl md:text-7xl">
              <span className="bg-gradient-to-r from-error to-warning bg-clip-text text-transparent">
                スクラムの理想と現実
              </span>
            </h1>
            <p className="mb-8 text-base-content/80 text-xl md:text-2xl">
              忖度なきエンジニアのための実践レポート
            </p>
            <div className="stats bg-base-200 shadow-lg">
              <div className="stat">
                <div className="stat-figure text-error">
                  <TrendingDown className="h-8 w-8" />
                </div>
                <div className="stat-title">失敗率</div>
                <div className="stat-value text-error">47%</div>
                <div className="stat-desc">スクラム導入企業</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-warning">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <div className="stat-title">日本の導入率</div>
                <div className="stat-value text-warning">22.9%</div>
                <div className="stat-desc">vs 海外 86%</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-success">
                  <Brain className="h-8 w-8" />
                </div>
                <div className="stat-title">本質的理解</div>
                <div className="stat-value text-success">5%</div>
                <div className="stat-desc">真の実践者</div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          className="-translate-x-1/2 absolute bottom-4 left-1/2 transform"
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ChevronDown className="h-8 w-8 text-base-content/50" />
        </motion.div>
      </section>

      {/* タブセクション */}
      <section className="container mx-auto px-4 py-16">
        <div className="tabs tabs-boxed mb-8 justify-center">
          {(['ideal', 'reality', 'insights'] as const).map((tab) => (
            <motion.button
              className={`tab tab-lg ${activeTab === tab ? 'tab-active' : ''}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'ideal' && '理想のスクラム'}
              {tab === 'reality' && '現実の問題'}
              {tab === 'insights' && '批判的洞察'}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'ideal' && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
              exit={{ opacity: 0, x: -20 }}
              initial={{ opacity: 0, x: 20 }}
              key="ideal"
            >
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-primary">
                    <Target className="h-6 w-6" />
                    スクラムの三本柱
                  </h2>
                  <div className="space-y-4">
                    {['透明性', '検査', '適応'].map((pillar, index) => (
                      <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        key={pillar}
                        transition={{
                          delay: index * ANIMATION_DELAY_MULTIPLIER,
                        }}
                      >
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span className="text-lg">{pillar}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="divider" />
                  <p className="text-base-content/70">
                    経験主義に基づく継続的な改善サイクル
                  </p>
                </div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-secondary">
                    <Users className="h-6 w-6" />
                    価値基準の実践度
                  </h2>
                  <ResponsiveContainer height={250} width="100%">
                    <RadarChart data={scrumValues}>
                      <PolarGrid strokeDasharray="3 3" />
                      <PolarAngleAxis dataKey="axis" />
                      <PolarRadiusAxis
                        angle={RADAR_ANGLE}
                        domain={[0, RADAR_MAX_VALUE]}
                      />
                      <Radar
                        dataKey="ideal"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        name="理想"
                        stroke="#3b82f6"
                      />
                      <Radar
                        dataKey="reality"
                        fill="#ef4444"
                        fillOpacity={0.3}
                        name="現実"
                        stroke="#ef4444"
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reality' && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
              exit={{ opacity: 0, x: -20 }}
              initial={{ opacity: 0, x: 20 }}
              key="reality"
            >
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-error">
                    <Globe className="h-6 w-6" />
                    日本vs海外：アジャイル導入率の推移
                  </h2>
                  <ResponsiveContainer height={300} width="100%">
                    <LineChart data={adoptionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        dataKey="japan"
                        name="日本"
                        stroke="#ef4444"
                        strokeWidth={2}
                        type="monotone"
                      />
                      <Line
                        dataKey="global"
                        name="海外"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        type="monotone"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="alert alert-error mt-4">
                    <AlertTriangle className="h-5 w-5" />
                    <span>日本の導入率は海外の1/4以下という深刻な遅れ</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-warning">
                      失敗パターン分析
                    </h2>
                    <ResponsiveContainer height={250} width="100%">
                      <PieChart>
                        <Pie
                          cx="50%"
                          cy="50%"
                          data={failurePatterns}
                          dataKey="value"
                          fill="#8884d8"
                          label
                          outerRadius={80}
                        >
                          {failurePatterns.map((entry) => (
                            <Cell fill={entry.color} key={`cell-${entry.id}`} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-error">主要な失敗要因</h2>
                    <div className="space-y-3">
                      {failurePatterns.map((pattern, index) => (
                        <motion.div
                          className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-base-200"
                          key={pattern.name}
                          onClick={() => setSelectedPattern(index)}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-2">
                            <XCircle
                              className="h-5 w-5"
                              style={{ color: pattern.color }}
                            />
                            <span>{pattern.name}</span>
                          </div>
                          <span className="badge badge-error">
                            {pattern.value}%
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'insights' && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
              exit={{ opacity: 0, x: -20 }}
              initial={{ opacity: 0, x: 20 }}
              key="insights"
            >
              {/* Bento Grid Layout */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <motion.div
                  className="card col-span-2 row-span-2 bg-gradient-to-br from-error/10 to-warning/10 shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-body">
                    <h2 className="card-title text-error">
                      <Zap className="h-6 w-6" />
                      スクラムの不都合な真実
                    </h2>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-error">▶</span>
                        <span>
                          スクラムガイドは「ルール」ではなく「ゲームのルール」
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-error">▶</span>
                        <span>
                          フレームワークは意図的に不完全 - 創造性を求めている
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-error">▶</span>
                        <span>
                          権限なき責任の押し付けが「自己管理」の名の下で横行
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-error">▶</span>
                        <span>日本の組織文化とは根本的に不適合</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  className="card bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-body">
                    <h3 className="font-bold text-primary">契約の支配</h3>
                    <p className="text-sm">
                      固定スコープのSIer契約が存在する限り、スクラムは演劇
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="card bg-gradient-to-br from-warning/10 to-error/10 shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-body">
                    <h3 className="font-bold text-warning">技術基盤の欠如</h3>
                    <p className="text-sm">
                      CI/CDなき環境では短いフィードバックループは幻想
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="card col-span-2 bg-gradient-to-br from-success/10 to-primary/10 shadow-xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="card-body">
                    <h3 className="flex items-center gap-2 font-bold text-success">
                      <Code className="h-5 w-5" />
                      AIプロンプト開発への応用
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="badge badge-success badge-outline">
                        透明性: 意図の可視化
                      </div>
                      <div className="badge badge-success badge-outline">
                        検査: 結果の頻繁な確認
                      </div>
                      <div className="badge badge-success badge-outline">
                        適応: 即座の調整
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-error">
                    <Activity className="h-6 w-6" />
                    スクラムマスターの死
                  </h2>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="stat rounded-lg bg-base-200">
                      <div className="stat-title">権限</div>
                      <div className="stat-value text-error">0%</div>
                      <div className="stat-desc">
                        組織的インペディメント除去
                      </div>
                    </div>
                    <div className="stat rounded-lg bg-base-200">
                      <div className="stat-title">実態</div>
                      <div className="stat-value text-warning">85%</div>
                      <div className="stat-desc">
                        Jira管理・会議調整の秘書化
                      </div>
                    </div>
                    <div className="stat rounded-lg bg-base-200">
                      <div className="stat-title">必要性</div>
                      <div className="stat-value text-success">15%</div>
                      <div className="stat-desc">真に価値を生む役割</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 結論セクション */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="card bg-gradient-to-br from-base-100 to-base-200 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="card-body">
            <h2 className="card-title mb-6 text-3xl">
              <Brain className="h-8 w-8" />
              結論：スクラムの本質を理解せよ
            </h2>
            <div className="prose max-w-none">
              <blockquote className="border-error border-l-4 pl-4 text-xl">
                スクラムは銀の弾丸ではない。それは鏡である。
                <br />
                組織の真の姿を映し出す、残酷なまでに正直な鏡。
              </blockquote>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-bold text-error text-xl">
                    失敗の本質
                  </h3>
                  <ul className="space-y-2">
                    <li>形式的導入による「ゾンビスクラム」の蔓延</li>
                    <li>権限なき責任の押し付け</li>
                    <li>技術的基盤の欠如</li>
                    <li>組織文化との根本的不適合</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 font-bold text-success text-xl">
                    成功への道
                  </h3>
                  <ul className="space-y-2">
                    <li>経験主義の本質的理解</li>
                    <li>権限と責任の一致</li>
                    <li>継続的な技術投資</li>
                    <li>組織文化の変革</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="alert alert-warning mt-8">
              <AlertTriangle className="h-5 w-5" />
              <span>
                スクラムを導入する前に、組織の準備ができているか自問せよ。
                準備なき導入は、チームを疲弊させ、事業を失敗に導く。
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* フッター */}
      <footer className="footer footer-center bg-base-200 p-10 text-base-content">
        <div>
          <p className="font-bold">
            スクラム開発の真実 - エンジニアのための忖度なきレポート
          </p>
          <p>Based on Scrum Guide 2020 & Industry Research 2024</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
