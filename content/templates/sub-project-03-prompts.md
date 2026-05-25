# 子项目3：提示词测试与模板建立

> 预计耗时：4小时 | 难度：⭐⭐ | 成功率：85%
> 目标：掌握AI视频提示词写法，建立可复用的提示词模板库

---

## Step 1：学习提示词结构（30分钟）

### 1.1 万能公式
```
[主体] + [动作] + [场景] + [光线] + [镜头运动] + [风格]

示例：
A nine-tailed fox (主体) 
sitting on a rock (动作)
in a moonlit bamboo forest (场景)
with ethereal blue glow (光线)
cinematic wide shot (镜头运动)
Chinese fantasy style (风格)
```

### 1.2 各元素参考词汇

**主体（Characters）：**
```
狐仙：a mystical nine-tailed fox / a beautiful fox spirit woman
龙女：a dragon princess with flowing robes
仙女：a celestial maiden with wings
书生：a young scholar in traditional robes
妖怪：a demon creature with glowing eyes
农夫：a humble farmer in simple clothes
```

**动作（Actions）：**
```
静坐：sitting peacefully / meditating
飞行：flying through clouds / soaring across the sky
行走：walking through / wandering in
战斗：fighting against / battling with
施法：casting a spell / channeling magic
转身：turning around slowly / looking back
哭泣：crying / tears streaming down
微笑：smiling gently / a warm smile
```

**场景（Scenes）：**
```
竹林：bamboo forest / bamboo grove
宫殿：ancient Chinese palace / golden palace
山水：misty mountains and rivers / landscape
村庄：small village / rural countryside
悬崖：cliff edge / mountain peak
湖边：lakeside / by a serene lake
洞穴：mysterious cave / grotto
花园：blooming garden / flower field
```

**光线（Lighting）：**
```
月光：moonlit / silver moonlight
日出：golden hour / sunrise glow
夕阳：sunset / dramatic orange light
烛光：candlelit / warm firelight
神秘光：ethereal glow / mystical light
阴暗：dark and moody / dim lighting
```

**镜头（Camera）：**
```
广角：wide establishing shot / epic wide shot
特写：close-up on face / detailed close-up
推进：camera slowly pushing in / slow zoom in
平移：camera panning left to right
跟拍：tracking shot following the character
俯瞰：aerial view / bird's eye view
仰拍：low angle looking up
```

**风格（Style）：**
```
中国古风：Chinese ink painting style / traditional Chinese art
仙侠：xianxia fantasy style / Chinese fantasy anime
写实：photorealistic / hyper-realistic
动漫：anime style / Japanese animation
3D：3D render / Pixar style
水墨：ink wash painting / sumi-e style
```

**✅ 验收标准：** 理解万能公式，能独立组合出提示词

---

## Step 2：批量测试提示词（2小时）

### 2.1 测试计划
```
在可灵AI中测试以下10组提示词，记录每组的生成效果：

测试1：狐仙静坐
A mystical nine-tailed fox spirit sitting on a rock in a moonlit bamboo forest, ethereal blue glow, cinematic wide shot, Chinese fantasy style

测试2：龙女出水
A dragon princess emerging from a waterfall, flowing silk robes, water droplets glistening, dramatic backlighting, slow motion, Chinese fantasy style

测试3：书生赶路
A young scholar walking along a mountain path at dawn, carrying a book bag, misty mountains in background, golden hour lighting, tracking shot, Chinese period drama style

测试4：妖怪现身
A dark demon creature materializing from shadows, glowing red eyes, dark forest setting, eerie green mist, low angle shot, horror fantasy style

测试5：狐仙化人
A fox transforming into a beautiful woman, magical particles floating, moonlight illumination, transformation sequence, ethereal atmosphere, Chinese fantasy style

测试6：战斗场景
A warrior fighting a giant serpent, dynamic action, sparks flying, mountain cliff setting, dramatic lighting, epic action sequence, Chinese fantasy style

测试7：仙境全景
A heavenly palace floating above clouds, golden rooftops, waterfall flowing into mist, birds flying, aerial establishing shot, Chinese mythology style

测试8：村民围观
Villagers gathered in a village square, pointing at the sky, amazed expressions, sunset lighting, crowd scene, Chinese period setting

测试9：狐仙施法
A fox spirit casting a spell, glowing blue energy swirling, bamboo forest, magical particles, dynamic pose, Chinese fantasy anime style

测试10：感人重逢
Two characters reuniting at a bridge, cherry blossoms falling, emotional moment, soft golden lighting, close-up on faces, romantic Chinese drama style
```

### 2.2 效果评估表
```
对每个测试视频打分（1-5分）：

| 测试# | 画质 | 动作自然度 | 风格匹配 | 是否可用 | 备注 |
|--------|------|-----------|----------|----------|------|
| 1      |      |           |          |          |      |
| 2      |      |           |          |          |      |
| ...    |      |           |          |          |      |

不可用的原因记录（供优化提示词）：
- 画面模糊 → 增加"detailed""high quality"
- 动作不自然 → 改用"slowly""gently"
- 风格不对 → 调整风格关键词
- 出现文字/手部 → 在提示词中加"no text, no hands"
```

**✅ 验收标准：** 10组测试完成，至少6组可用（≥60%成功率）

---

## Step 3：建立提示词模板库（1小时）

### 3.1 整理最佳提示词
```
从10组测试中选出效果最好的5组，整理成模板：

模板1：[场景类型] + [最佳提示词]
模板2：[场景类型] + [最佳提示词]
模板3：[场景类型] + [最佳提示词]
模板4：[场景类型] + [最佳提示词]
模板5：[场景类型] + [最佳提示词]

保存到：AI短剧/提示词库/templates.md
```

### 3.2 图生视频测试
```
重要：图生视频比文生视频一致性高50%+

测试流程：
1. 用可灵AI的"文生图"功能，生成一张角色参考图
2. 选择效果最好的那张
3. 用"图生视频"功能，上传参考图，添加动作描述
4. 对比：图生视频 vs 文生视频的角色一致性

记录：哪种方式角色更一致？
```

**✅ 验收标准：** 提示词模板库建立（≥5个模板），图生视频测试完成

---

## 验收清单

- [ ] 理解提示词万能公式
- [ ] 10组提示词测试完成
- [ ] 至少60%测试视频可用
- [ ] 提示词模板库建立（≥5个模板）
- [ ] 图生视频测试完成
- [ ] 所有文件保存在正确文件夹

**总耗时：约4小时**
**总花费：约¥10-20（可灵积分消耗）**
