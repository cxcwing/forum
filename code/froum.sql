-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2024-05-16 10:45:39
-- 服务器版本： 8.0.31
-- PHP 版本： 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `froum`
--

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `textId` int NOT NULL,
  `content` varchar(400) NOT NULL,
  `userId` int NOT NULL,
  `userName` varchar(20) NOT NULL,
  `userAvatar` varchar(400) NOT NULL,
  `postId` int NOT NULL,
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `textId`, `content`, `userId`, `userName`, `userAvatar`, `postId`, `time`) VALUES
(1, 2, '好耶！❤️❤️', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 0, '0000-00-00 00:00:00'),
(2, 2, 'suki😍', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 0, '0000-00-00 00:00:00'),
(3, 0, 'suki！！！❤️❤️❤️', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 4, '0000-00-00 00:00:00'),
(4, 0, 'aaa❤️❤️❤️', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 4, '0000-00-00 00:00:00'),
(5, 0, '狱卒好耶😘', 2, '疏', '/images/1711108153245-0.png', 4, '0000-00-00 00:00:00'),
(6, 0, '安安😙', 2, '疏', '/images/1711108153245-0.png', 4, '0000-00-00 00:00:00'),
(7, 0, '啦啦啦', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 1, '0000-00-00 00:00:00'),
(8, 0, '啦啦啦', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 1, '0000-00-00 00:00:00'),
(9, 0, '啦啦啦', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 7, '0000-00-00 00:00:00'),
(10, 0, '啦啦啦', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 2, '0000-00-00 00:00:00'),
(11, 0, '🍎🍎', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 2, '0000-00-00 00:00:00'),
(12, 0, '🍎🍎', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 2, '0000-00-00 00:00:00'),
(13, 0, '🍎🍎', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 2, '0000-00-00 00:00:00'),
(14, 0, '哎哎哎', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 2, '0000-00-00 00:00:00'),
(15, 0, '啦啦啦', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 8, '0000-00-00 00:00:00'),
(16, 0, '啦啦啦', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 8, '0000-00-00 00:00:00'),
(17, 0, '啦啦啦', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 8, '0000-00-00 00:00:00'),
(18, 0, 'suki！！！😘😘', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 8, '0000-00-00 00:00:00'),
(19, 0, '爱', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 8, '0000-00-00 00:00:00'),
(20, 0, '呜呜呜', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 8, '0000-00-00 00:00:00'),
(21, 0, '嗷嗷嗷啊', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 8, '0000-00-00 00:00:00'),
(22, 2, '哎哎哎', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 0, '0000-00-00 00:00:00'),
(23, 2, '❤️❤️❤️❤️❤️', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 0, '2024-04-09 20:45:24'),
(24, 0, '哎哎哎', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 4, '2024-04-09 21:01:41'),
(25, 2, '真不戳！！', 1, '折枝', '/images/1713268069072-illust_62974310_20211208_155223.png', 0, '2024-04-09 21:07:58'),
(26, 2, '可以可以', 10, '寸夕屮', '/images/1712739264282-{WM522HD5E7~Y9BFOJRX}FY.png', 0, '2024-04-10 16:57:40'),
(27, 2, '❤️❤️❤️', 10, '寸夕屮', '/images/1712739264282-{WM522HD5E7~Y9BFOJRX}FY.png', 0, '2024-04-10 16:57:51');

-- --------------------------------------------------------

--
-- 表的结构 `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `author` varchar(60) NOT NULL,
  `time` datetime NOT NULL,
  `whoGood` json NOT NULL,
  `whoCollection` json NOT NULL,
  `lookNumber` int NOT NULL,
  `Comment` int DEFAULT '0',
  `type` int NOT NULL DEFAULT '0',
  `cover` varchar(6000) NOT NULL,
  `isPublish` int NOT NULL DEFAULT '1',
  `content` mediumtext NOT NULL,
  `authorId` int NOT NULL,
  `goodNumber` bigint NOT NULL DEFAULT '0',
  `isPost` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转存表中的数据 `post`
--

INSERT INTO `post` (`id`, `title`, `author`, `time`, `whoGood`, `whoCollection`, `lookNumber`, `Comment`, `type`, `cover`, `isPublish`, `content`, `authorId`, `goodNumber`, `isPost`) VALUES
(21, '啊啊啊啊啊', '折枝', '2024-04-09 20:41:20', '[]', 'null', 1, 0, 0, '/images/1712666480157-IMG_042.png', 1, '<p>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p>', 1, 0, 1),
(2, '啊实打实', '折枝', '2024-04-09 20:08:04', '[1]', 'null', 24, 5, 1, '/images/1712664483733-IMG_007.jpg', 1, '<p>啊实打实打算</p>', 1, 1, 1),
(4, '测试1', '寸夕屮', '2024-04-05 17:17:35', '[2, 1]', '[2, 1]', 179, 5, 0, '/postImage/1712308654947-107492647_p0.png', 1, '<p>嗷嗷嗷啊<img class=\"image-style-align-right image_resized\" style=\"aspect-ratio:3035/2149;width:273px;\" src=\"http://localhost:3000//images/1712308633544-02.png\" width=\"3035\" height=\"2149\"></p>', 1, 2, 1),
(19, '啊实打实', '折枝', '2024-04-09 20:11:05', 'null', 'null', 16, 0, 1, '/images/1712664664748-IMG_054.png', 1, '<p>啊实打实打算</p>', 1, 0, 1),
(17, '安安', '折枝', '2024-04-09 19:06:16', 'null', 'null', 0, 0, 0, '/images/1712660775879-102442529_p0_master1200.jpg', 1, '<p>安安</p>', 1, 0, 1),
(18, 'aaaa', '折枝', '2024-04-09 19:26:28', '[1]', '[1]', 29, 0, 0, '/images/1712661988263-103111206_p0_master1200.jpg', 1, '<figure class=\"image\"><img style=\"aspect-ratio:1200/1200;\" src=\"http://localhost:3000//images/1712661978361-102442711_p0_master1200.jpg\" width=\"1200\" height=\"1200\"></figure>', 1, 1, 1),
(8, '测试4', '寸夕屮', '2024-04-05 20:29:45', '[1]', 'null', 8, 7, 0, '/postImage/1712320184711-14.jpg', 1, '<figure class=\"image image_resized\" style=\"width:308px;\"><img style=\"aspect-ratio:2500/1635;\" src=\"http://localhost:3000//images/1712320163244-14.jpg\" width=\"2500\" height=\"1635\"></figure>', 1, 1, 1),
(20, '阿斯顿萨达', '折枝', '2024-04-09 20:04:44', '[1]', 'null', 1, 0, 3, '/images/1712664283492-92607552_p0_master1200.jpg', 1, '<p>阿佘d啊实打实</p>', 1, 1, 1),
(13, '测试！！！', '寸夕屮', '2024-04-09 16:58:18', '[1]', 'null', 20, 0, 4, '/postImage/1712653098376-86520311_p0_master1200.jpg', 1, '<p>aaa</p>', 1, 1, 1),
(22, '啊啊啊啊啊啊啊啊啊', '折枝', '2024-04-09 21:14:44', 'null', 'null', 3, 0, 0, '/images/1712668483630-IMG_044.png', 1, '<p>哎哎哎</p>', 1, 0, 1),
(23, '安安', '折枝', '2024-04-09 21:16:22', 'null', 'null', 0, 0, 0, '/images/1712668582009-IMG_046.png', 1, '<p>安安</p>', 1, 0, 1),
(25, 'a奥奥', '折枝', '2024-04-09 21:19:05', 'null', 'null', 0, 0, 0, '/images/1712668745163-IMG_018.jpg', 1, '<p>安安</p>', 1, 0, 1),
(26, 'aa', '折枝z', '2024-04-09 21:26:33', 'null', 'null', 1, 0, 0, '/images/1712669193343-illust_67297385_20220928_083557.png', 1, '<p>aa</p>', 9, 0, 1),
(27, 'aaa', '折枝z', '2024-04-09 21:29:00', 'null', 'null', 0, 0, 0, '/images/1712669339869-illust_63238926_20210804_072827.jpg', 1, '<p>aaa</p>', 9, 0, 1),
(28, 'dawsdaw', '折枝z', '2024-04-09 21:29:56', 'null', 'null', 0, 0, 0, '/images/1712669396230-illust_53388604_20210804_075824.png', 1, '<p>aaa</p>', 9, 0, 1),
(29, '呜呜呜呜', '寸夕屮', '2024-04-10 17:03:38', 'null', 'null', 2, 0, 0, '/images/1712739817792-asdas.jpg', 1, '<figure class=\"image\"><img style=\"aspect-ratio:512/816;\" src=\"http://localhost:3000//images/1712739811045-asdas.jpg\" width=\"512\" height=\"816\"></figure>', 10, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `tale`
--

DROP TABLE IF EXISTS `tale`;
CREATE TABLE IF NOT EXISTS `tale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(60) NOT NULL,
  `author` varchar(60) NOT NULL,
  `time` datetime NOT NULL,
  `whoGood` json DEFAULT NULL,
  `whoCollection` json DEFAULT NULL,
  `lookNumber` int NOT NULL,
  `Comment` int DEFAULT '0' COMMENT '评论',
  `type` int NOT NULL,
  `cover` varchar(1000) NOT NULL,
  `isPublish` int NOT NULL DEFAULT '1',
  `content` mediumtext NOT NULL,
  `authorId` int NOT NULL,
  `goodNumber` bigint NOT NULL DEFAULT '0',
  `isPost` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转存表中的数据 `tale`
--

INSERT INTO `tale` (`id`, `title`, `author`, `time`, `whoGood`, `whoCollection`, `lookNumber`, `Comment`, `type`, `cover`, `isPublish`, `content`, `authorId`, `goodNumber`, `isPost`) VALUES
(1, '草吧！', '折枝', '2024-03-26 17:36:43', '[]', NULL, 24, 0, 0, '/taleImage/1711445802564-91731266_p0.png', 1, '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 喵喵喵</p><figure class=\"image image_resized image-style-align-center\" style=\"width:394px;\"><img style=\"aspect-ratio:3000/3000;\" src=\"http://localhost:3000//images/1711360122941-0BAE72C3.png\" width=\"3000\" height=\"3000\"></figure>', 1, 0, 0),
(2, '小红帽', '折枝', '2024-03-25 20:42:24', '[2, 1, 9, 10]', '[1, 10]', 80, 7, 0, '/taleImage/1711370544364-101887234_p0.jpg', 1, '<p>从前有个可爱的小姑娘，谁见了都喜欢，但最喜欢她的是她的外婆（或译作“祖母”），简直是她要什么就给她什么。一次，外婆送给小姑娘一顶用<a href=\"https://baike.baidu.com/item/%E4%B8%9D%E7%BB%92/8936953?fromModule=lemma_inlink\">丝绒</a>做的小红帽，戴在她的头上正好合适。从此，姑娘再也不愿意戴任何别的帽子，于是大家便叫她“小红帽”。</p><p>一天，妈妈对小红帽说：“来，小红帽，这里有一块蛋糕和一瓶葡萄酒，快给外婆送去，外婆生病了，身子很虚弱，吃了这些就会好一些的。趁着现在天还没有黑，赶紧动身吧。在路上要好好走，不要跑，也不要离开大路，否则你会摔跤的，那样外婆就什么也吃不上了。到外婆家的时候，别忘了说‘早上好’，也不要一进屋就东瞧西瞅。”</p><p>“我会小心的。”小红帽对妈妈说，并且还和妈妈拉手作保证。</p><p>外婆住在村子外面的森林里，离小红帽家有很长一段路。小红帽刚走进森林就碰到了一条狼。小红帽不知道狼是坏家伙，所以一点也不怕它。</p><p>&nbsp;</p><p>“你好，小红帽，”狼说。</p><p>“你好，狼先生。”</p><p>“小红帽，这么早要到哪里去呀？”</p><p>“我要到外婆家去。”</p><p>“你那围裙下面有什么呀？”</p><p>“蛋糕和葡萄酒。昨天我们家烤了一些蛋糕，可怜的外婆生了病，要吃一些好东西才能恢复过来。”</p><p>“你外婆住在哪里呀，小红帽？”</p><p>“进了林子还有一段路呢。她的房子就在三棵大橡树下，低处围着<a href=\"https://baike.baidu.com/item/%E6%A0%B8%E6%A1%83%E6%A0%91/10881927?fromModule=lemma_inlink\">核桃树</a>篱笆。你一定知道的。”小红帽说。</p><p>狼在心中盘算着：“这小东西细皮嫩肉的，味道肯定比那老太婆要好。我要研究一下策略，让她俩都逃不出我的手心。”于是它陪着小红帽走了一会儿，然后说：“小红帽，你看周围这些花多么美丽啊！干吗不回头看一看呢？还有这些小鸟，它们唱得多么动听啊！你大概根本没有听到吧？林子里的一切多么美好啊，而你却只管往前走，就像是去上学一样。”</p><p>小红帽抬起头来，看到阳光在树木间来回跳荡，美丽的鲜花在四周开放，便想：“也许我该摘一把鲜花给外婆，让她高兴高兴。现在天色还早，我不会去迟的。”她于是离开大路，走进林子去采花。她每采下一朵花，总觉得前面还有更美丽的花朵，便又向前走去，结果一直走到了林子深处。</p><p>就在此时，狼却直接跑到外婆家，敲了敲门。</p><p>“是谁呀？”</p><p>“是小红帽。”狼回答，“我给你送蛋糕和<a href=\"https://baike.baidu.com/item/%E8%91%A1%E8%90%84%E9%85%92/444627?fromModule=lemma_inlink\">葡萄酒</a>来了。快开门哪。”</p><p>“你拉一下门栓就行了，”外婆大声说，“我身上没有力气，起不来。”</p><p>狼刚拉起门栓，那门就开了。狼二话没说就冲到外婆的床前，把外婆吞进了肚子。然后她穿上外婆的衣服，戴上她的帽子，躺在床上，还拉上了帘子。</p><p>可这时小红帽还在跑来跑去地采花。直到采了许多许多，她都拿不了，她才想起外婆，重新上路去外婆家。</p><figure class=\"image image-style-align-right image_resized\" style=\"width:154px;\"><img style=\"aspect-ratio:1400/2000;\" src=\"http://localhost:3000//images/1711370485802-3AEBDBDAD48DE63080EEAF80F375CDB7.png\" width=\"1400\" height=\"2000\"></figure><p><span style=\"color:rgb(85,85,85);\">小红帽和大灰狼</span></p><p>看到外婆家的屋门敞开着，她感到很奇怪。她一走进屋子就有一种异样的感觉，心中便想：“天哪！平常我那么喜欢来外婆家，今天怎么这样害怕？”她大声叫道：“早上好！”，可是没有听到回答。她走到床前拉开帘子，只见外婆躺在床上，帽子拉得低低的，把脸都遮住了，样子非常奇怪。“哎，外婆，”她说，“你的耳朵怎么这样大呀？”</p><p>“为了更好地听你说话呀，乖乖。”</p><p>“可是外婆，你的眼睛怎么这样大呀？”小红帽又问。</p><p>“为了更清楚地看你呀，乖乖。”</p><p>“外婆，你的手怎么这样大呀？”</p><p>“可以更好地抱着你呀。”</p><p>“外婆，你的嘴巴怎么大得很吓人呀？”</p><p>“可以一口把你吃掉呀！”</p><p>狼刚把话说完，就从床上跳起来，把小红帽吞进了肚子，狼满足了食欲之后便重新躺到床上睡觉，而且鼾声震天。一位猎人碰巧从屋前走过，心想：“这老太太鼾打得好响啊！我要进去看看她是不是出什么事了。”猎人进了屋，来到床前时却发现躺在那里的竟是狼。“你这老坏蛋，我找了你这么久，真没想到在这里找到你！”他说。他正准备向狼开枪，突然又想到，这狼很可能把外婆吞进了肚子，外婆也许还活着。猎人就没有开枪，而是操起一把剪刀，动手把呼呼大睡的狼的肚子剪了开来。他刚剪了两下，就看到了红色的小帽子。他又剪了两下，小姑娘便跳了出来，叫道：“真把我吓坏了！狼肚子里黑漆漆的。”接着，外婆也活着出来了，只是有点喘不过气来。小红帽赶紧跑去搬来几块大石头，塞进狼的肚子。狼醒来之后想逃走，可是那些石头太重了，它刚站起来就跌到在地，摔死了。</p><p>三个人高兴极了。猎人剥下狼皮，回家去了；外婆吃了小红帽带来的蛋糕和葡萄酒，精神好多了；而小红帽却在想：“要是妈妈不允许，我一辈子也不独自离开大路，跑进森林了。”</p><p>人们还说，小红帽后来又有一次把蛋糕送给外婆，而且在路上又有一只狼跟她搭话，想骗她离开大路。可小红帽这次提高了警惕，头也不回地向前走。她告诉外婆她碰到了狼，那家伙嘴上虽然对她说“你好”，眼睛里却露着凶光，要不是在大路上，它准把她给吃了。“那么，”外婆说，“我们把门关紧，不让它进来。”不一会儿，狼真的一面敲着门一面叫道：“外婆，快开门呀。我是小红帽，给你送蛋糕来了。”但是她们既不说话，也不开门。</p><p>这长着灰毛的家伙围着房子转了两三圈，最后跳上屋顶，打算等小红帽在傍晚回家时偷偷跟在她的后面，趁天黑把她吃掉。可外婆看穿了这家伙的坏心思。她想起屋子前有一个大石头槽子，便对小姑娘说：“小红帽，把桶拿来。我昨天做了一些香肠，提些煮香肠的水去倒进石头槽里。”小红帽提了很多很多水，把那个大石头槽子装得满满的。香肠的气味飘进了狼的鼻孔，它使劲地用鼻子闻呀闻，并且朝下张望着，到最后把脖子伸得太长了，身子开始往下滑。它从屋顶上滑了下来，正好落在大石槽中，淹死了。小红帽高高兴兴地回了家，从此再也没有谁伤害过她。</p>', 1, 4, 0),
(7, '阿斯顿萨达', '寸夕屮', '2024-03-26 20:10:53', '[]', NULL, 12, 0, 3, '/taleImage/1711455052570-107067067_p18_master1200.jpg', 1, '<p>阿佘d啊实打实</p>', 1, 0, 0),
(22, '哎哎哎', '折枝', '2024-04-09 19:33:31', NULL, NULL, 1, 0, 0, '/images/1712662410494-AD67BDEF06021F1B24B7D06AE788DF07.png', 1, '<figure class=\"image\"><img style=\"aspect-ratio:900/1200;\" src=\"http://localhost:3000//images/1712662402473-102600989_p3_master1200.jpg\" width=\"900\" height=\"1200\"></figure>', 1, 0, 0),
(9, '的撒大大', '寸夕屮', '2024-03-31 10:16:44', '[]', NULL, 6, 0, 0, '/taleImage/1711851403491-91FC1776464403A71A5C96309149CC6E.png', 1, '<p>大苏打撒旦</p>', 1, 0, 0),
(10, '圣埃蒂安', '寸夕屮', '2024-03-31 10:16:53', '[1]', '[]', 8, 0, 0, '/taleImage/1711851412858-733D6C7722721B71B55C00EA89363537.png', 1, '<p>撒旦大苏打</p>', 1, 1, 0),
(11, 'asdas', '寸夕屮', '2024-03-31 10:17:09', '[]', NULL, 5, 0, 0, '/taleImage/1711851428820-0c80e9487c7fff0c9f10fe9b1fd7593dd734f99b8c4dc6c9812488ddda1bfd42.png', 1, '<p>as打算大</p>', 1, 0, 0),
(12, '爱你', '寸夕屮', '2024-03-31 10:17:17', '[1]', NULL, 6, 0, 0, '/taleImage/1711851437401-83492606_p0.png', 1, '<p>as打算大</p>', 1, 1, 0),
(13, '爱你', '寸夕屮', '2024-03-31 10:17:21', '[]', NULL, 5, 0, 0, '/taleImage/1711851441228-89155830_p0.jpg', 1, '<p>as打算大</p>', 1, 0, 0),
(14, '爱你', '寸夕屮', '2024-03-31 17:58:15', '[]', NULL, 6, 0, 0, '/taleImage/1711879094991-F4FZ@7YZXEI1{$$OV}W_J9X.png', 1, '<p>as打算大</p>', 1, 0, 0),
(17, '测试', '寸夕屮', '2024-03-31 10:18:48', '[1]', NULL, 12, 0, 0, '/taleImage/1711851528366-0.png', 1, '<p>测试！！！</p>', 1, 1, 0),
(18, 'asdasdas', '寸夕屮', '2024-03-31 17:57:53', '[]', NULL, 7, 0, 0, '/taleImage/1711879072820-40549074_p0.jpg', 1, '<p>测试！！！</p>', 1, 0, 0),
(23, '安安', '折枝', '2024-04-09 21:19:20', NULL, NULL, 0, 0, 0, '/images/1712668760394-IMG_008.jpg', 1, '<p>哎哎哎</p>', 1, 0, 0),
(20, '测试', '寸夕屮', '2024-03-31 10:19:09', '[1]', NULL, 8, 0, 0, '/taleImage/1711851549254-QQå¾ç20230405152652.png', 1, '<p>测试！！！</p>', 1, 1, 0),
(21, '恐怖！！！！', '寸夕屮', '2024-04-04 10:31:18', NULL, NULL, 5, 0, 6, '/taleImage/1712197878071-107452937_p0.jpg', 1, '<p>啊啊啊啊啊</p>', 1, 0, 0),
(24, 'a啊', '折枝', '2024-04-09 21:20:23', NULL, NULL, 0, 0, 0, '/images/1712668823189-illust_43880175_20210804_064914.png', 1, '<p>奥奥</p>', 1, 0, 0),
(25, 'haha', '折枝z', '2024-04-09 21:24:13', NULL, NULL, 1, 0, 0, '/images/1712669053422-illust_62492065_20210804_075417.png', 1, '<figure class=\"image\"><img style=\"aspect-ratio:1115/1115;\" src=\"http://localhost:3000//images/1712669043561-illust_62492065_20210804_075417.png\" width=\"1115\" height=\"1115\"></figure>', 9, 0, 0),
(26, 'haha', '折枝z', '2024-04-09 21:24:14', NULL, NULL, 0, 0, 0, '/images/1712669053809-illust_62492065_20210804_075417.png', 1, '<figure class=\"image\"><img style=\"aspect-ratio:1115/1115;\" src=\"http://localhost:3000//images/1712669043561-illust_62492065_20210804_075417.png\" width=\"1115\" height=\"1115\"></figure>', 9, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `token`
--

DROP TABLE IF EXISTS `token`;
CREATE TABLE IF NOT EXISTS `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idcode` int NOT NULL,
  `createtime` bigint NOT NULL,
  `email` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转存表中的数据 `token`
--

INSERT INTO `token` (`id`, `idcode`, `createtime`, `email`) VALUES
(1, 425588, 0, ''),
(2, 784679, 0, ''),
(3, 853709, 1711766000520, '3282888252@qq.com'),
(4, 651914, 1711766136185, '2627060105@qq.com'),
(5, 370961, 1711767930442, '3227261134@qq.com'),
(6, 200975, 1711768103052, '3227261134@qq.com'),
(8, 765858, 1711776340593, 'a@qq.com'),
(9, 518048, 1711776455550, '3282888252@qq.com'),
(10, 177440, 1711776564203, '3282888252@qq.com'),
(11, 208499, 1711777788020, '3282888252@qq.com'),
(12, 152540, 1711777931475, '3282888252@qq.com'),
(13, 689367, 1711783644720, '3282888252@qq.com'),
(14, 103955, 1711784273252, '1@11.com'),
(15, 662716, 1712739085562, '2627060105@qq.com'),
(16, 716229, 1712739191805, '2627060105@qq.com'),
(17, 559179, 1713261526333, '2627060105@qq.com'),
(18, 513866, 1713261572959, '2627060105@qq.com'),
(19, 605306, 1713262585853, '2627060105@qq.com');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `_id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  `email` varchar(50) NOT NULL,
  `gender` int NOT NULL,
  `avatar` text NOT NULL,
  `introduction` text NOT NULL,
  `role` int DEFAULT '0',
  `vip` int DEFAULT '0',
  `jionTime` datetime NOT NULL,
  `account` int NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`_id`, `username`, `password`, `email`, `gender`, `avatar`, `introduction`, `role`, `vip`, `jionTime`, `account`) VALUES
(1, '寸夕屮', '521', '26270605@qq.com', 0, '/images/1711076201666-QQå¾ç20231130165119.gif', '欢迎来到草吧', 1, 1, '2024-03-17 03:13:09', 1),
(2, 'dingzhen', '521', '32272614@qq.com', 0, '', '', 0, 0, '2024-03-17 03:14:36', 0);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(16) NOT NULL,
  `email` varchar(37) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `introduction` varchar(200) DEFAULT NULL,
  `gender` int NOT NULL DEFAULT '0',
  `role` int NOT NULL DEFAULT '0',
  `avatar` varchar(500) NOT NULL,
  `vip` int NOT NULL DEFAULT '0',
  `jionTime` datetime NOT NULL,
  `toGood` json DEFAULT NULL,
  `collection` json DEFAULT NULL,
  `level` int NOT NULL DEFAULT '1',
  `power` int DEFAULT '0',
  `postNum` int NOT NULL DEFAULT '0',
  `taleNum` int NOT NULL DEFAULT '0',
  `marckTime` bigint NOT NULL DEFAULT '0',
  `toGoodPost` json DEFAULT NULL,
  `collectionPost` json DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`_id`, `username`, `password`, `email`, `introduction`, `gender`, `role`, `avatar`, `vip`, `jionTime`, `toGood`, `collection`, `level`, `power`, `postNum`, `taleNum`, `marckTime`, `toGoodPost`, `collectionPost`) VALUES
(1, '折枝', '521', '322726@qq.com', '啦啦啦，呼呼呼', 0, 0, '/images/1713268069072-illust_62974310_20211208_155223.png', 1, '2024-03-22 02:39:14', '[2, 16, 17, 10, 20]', '[2, 4]', 1, 270, 0, 1, 171, '[6, 7, 6, 2, 8, 8, 13, 18, 20, 4, 18]', '[7, 4, 18]'),
(2, '疏', '1376666', '1376666@qq.com', '我爱大草原', 0, 0, '/images/1711108153245-0.png', 0, '2024-03-22 02:39:14', '[2]', NULL, 0, 30, 1, 0, 1712366544135, '[4]', '[4]'),
(9, '折枝z', '521521521', '3282888252@qq.com', 'null', 0, 0, '/images/1712567556312-102442529_p0_master1200.jpg', 0, '0000-00-00 00:00:00', '[2]', '[]', 0, 20, 1, 2, 1713875517538, 'null', NULL),
(10, '寸夕屮', '123456789', '262706@qq.com', 'null', 0, 0, '/images/1712739264282-{WM522HD5E7~Y9BFOJRX}FY.png', 0, '0000-00-00 00:00:00', '[2]', '[2]', 0, 10, 1, 0, 1712739229360, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
