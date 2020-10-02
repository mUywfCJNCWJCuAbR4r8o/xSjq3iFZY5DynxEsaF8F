const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(), width = ctx.getWindowManager().getDefaultDisplay().getWidth(), height = ctx.getWindowManager().getDefaultDisplay().getHeight(),
sdcard = android.os.Environment.getExternalStorageDirectory() + "/",
GradientDrawable = android.graphics.drawable.GradientDrawable, parseColor = android.graphics.Color.parseColor, PorterDuff = android.graphics.PorterDuff,
TextView = android.widget.TextView, SeekBar = android.widget.SeekBar, LinearLayout = android.widget.LinearLayout, LayoutParams = LinearLayout.LayoutParams, PopupWindow = android.widget.PopupWindow, ScrollView = android.widget.ScrollView,
File = java.io.File, BufferedReader = java.io.BufferedReader, FileReader = java.io.FileReader,
fromHtml = android.text.Html.fromHtml;
let config, core, killaura, print, client;

print = p0 => {
    ctx.runOnUiThread({
        run(){
            new android.widget.Toast.makeText(ctx, fromHtml(p0), 1).show();
        }
    });
};

(() => {
    client = {
        dir: sdcard + "games/com.mojang/minecraftpe/Virus/Variable/",
        array: [{}, [5, [!!0, 0], 1, 1, 100]],
        thread(t0){
            ctx.runOnUiThread({
                run(){
                    try{
                        t0();
                    }catch(e){
                        print("Error(" + e.lineNumber + "): " + e.message);
                    };
                }
            });
        },
        restartGame(){
            net.zhuoweizhang.mcpelauncher.ui.NerdyStuffActivity.forceRestart(ctx);
        },
        config(c0){
            this.config = {};
            this.file = new File(client.dir + c0 + ".json");
            this.load = () => this.file.exists() ? this.config = JSON.parse(client.file.read(this.file)) : "";
            this.save = () => new java.io.FileOutputStream(this.file).write(new java.lang.String(JSON.stringify(this.config, "", 4)).getBytes());
            this.set = s0 => {
                this.checkAndPlace(this.config, s0);
                this.save();
                return this;
            };
            this.access = (a0, a1) => {
                try{
                    if(a1 == null) return eval("this.config." + a0); else{
                        eval("this.config." + a0 + " = " + a1);
                        this.save();
                        return eval("this.config." + a0);
                    };
                }catch(e){
                    print("Error(" + e.lineNumber + "): " + e.message);
                };
            };
            this.checkAndPlace = (c0, c1) => {
                for(let b in c1){
                    let e = c0[b];
                    "undefined" == typeof e && (c0[b] = c1[b]);
                    "object" == typeof e && this.checkAndPlace(e, c1[b]);
                };
            };
            this.load();
        },
        gui: {
            dip2px(d0){
                return Math.ceil(d0 * ctx.getResources().getDisplayMetrics().density);
            },
            layoutParams(p0, p1){
                let dp = client.gui.dip2px;
                let p = new LayoutParams(p0[0], p0[1], p0[2] ? p0[2] : 0);
                if(!!p1) p.setMargins(dp(p1[0]), dp(p1[1]), dp(p1[2]), dp(p1[3]));
                return p;
            },
            style: {
                background(b0, b1, b2, b3){
                    let b = new GradientDrawable();
                    if(!!b0) b.setColor(b0);
                    if(!!b1) b.setStroke(client.gui.dip2px(b1[0]), b1[1]);
                    if(!!b2) b.setAlpha(b2);
                    if(!!b3) b.setCornerRadii([b3[0], b3[0], b3[1], b3[1], b3[2], b3[2], b3[3], b3[3]]);
                    return b;
                },
                rgbToHex(r0, r1, r2){
                    cth = c0 => { 
                        let h = c0.toString(16); 
                        return h.length == 1 ? "0" + h : h;
                    };
                    return "#" + cth(r0) + cth(r1) + cth(r2);
                },
                line(l0, l1, l2){
                    let l = new LinearLayout(ctx);
                    l.setLayoutParams(client.gui.layoutParams([l0[0], l0[1]]));
                    l.setBackgroundColor(parseColor("#" + l1));
                    l2.addView(l);
                    return l;
                }
            }
        },
        hud: {
            components: {
                module: {
                    add(a0, a1, a2, a3){
                        a0 = a0.split(" ");
                        let dp = client.gui.dip2px, lp = client.gui.layoutParams;
                        let checker = (a0[1] + "." + a0[0]).toLowerCase(), bchecker = "bind." + checker, schecker = !!0;
                        let bg = b0 => client.gui.style.background(b0 == "orange" ? parseColor("#FF9800") : -1, !!0, b0.includes("gray") ? 10 : !!0, b0 == "gray0" ? [30, 0, 0, 30] : b0 == "gray1" ? [0, 30, 30, 0] : [30, 30, 30, 30]);

                        let l0 = new LinearLayout(ctx);
                        l0.setPadding(0, dp(2.5), 0, dp(2.5));
                        l0.setOnClickListener(function(){
                            a1 ? !config(checker) ? a1[0] ? a1[0]() : "" : a1[1] ? a1[1]() : "" : ""; //if(!config(checker)) if(!!a1) if(!!a1[0]) a1[0](); else if(!!a1) if(!!a1[1]) a1[1]();
                            config(checker, !config(checker));
                            line0.setBackground(config(checker) ? bg("orange") : bg("white"));
                        });

                        let l1 = new LinearLayout(ctx);
                        l1.setLayoutParams(lp([-1, -1]));
                        l1.setOrientation(1);

                        let l2 = new LinearLayout(ctx);
                        l2.setVerticalGravity(17);

                        let l3 = client.array[0][(a0[0] + "sl").toLowerCase()];
                        l3 = new LinearLayout(ctx);
                        l3.setOrientation(1);

                        let line0 = new LinearLayout(ctx);
                        line0.setLayoutParams(lp([dp(3), -1], [5, 0, 0, 0]));
                        line0.setPadding(dp(8), dp(8), dp(8), dp(8));
                        line0.setBackground(config(checker) ? bg("orange") : bg("white"));
                        l0.addView(line0);

                        let v = new TextView(ctx);
                        v.setText(a0[0]);
                        v.setTextSize(1, 12);
                        v.setTextColor(-1);
                        v.setLayoutParams(lp([-2, -2, 999]));
                        v.setPadding(dp(8), dp(8), dp(8), dp(8));
                        v.setGravity(3);
                        l2.addView(v);

                        let b = new TextView(ctx);
                        b.setText("bind");
                        b.setTextSize(1, 10);
                        b.setTextColor(config(bchecker) ? parseColor("#FF9800") : -1);
                        b.setLayoutParams(lp([-2, -2], [0, 0, a2 ? 0 : 5, 0]));
                        b.setPadding(dp(10), dp(6), dp(10), dp(6));
                        b.setGravity(17);
                        b.setBackground(a2 ? bg("gray0") : bg("gray"));
                        b.setOnClickListener(function(){
                            config(bchecker) ? client.array[0][a0[0]].dismiss() : client.hud.components.bind(a0[0], checker);
                            config(bchecker, !config(bchecker));
                            b.setTextColor(config(bchecker) ? parseColor("#FF9800") : -1);
                        });
                        if(!!a0[2]){
                            l2.addView(b);
                            config(bchecker) ? typeof client.array[0][a0[0]] != "object" ? client.hud.components.bind(a0[0], checker) : "" : "";
                        };

                        let line1 = new TextView(ctx);
                        line1.setTextSize(1, 10);
                        line1.setLayoutParams(lp([dp(1), -2]));
                        line1.setPadding(0, dp(6), 0, dp(6));
                        line1.setBackgroundColor(parseColor("#FF9800"));
                        if(a0[2] && a2) l2.addView(line1);

                        let s = new TextView(ctx);
                        s.setText("settings");
                        s.setTextSize(1, 10);
                        s.setTextColor(-1);
                        s.setLayoutParams(lp([-2, -2], [0, 0, 5, 0]));
                        s.setPadding(dp(10), dp(6), dp(10), dp(6));
                        s.setGravity(17);
                        s.setBackground(a0[2] ? bg("gray1") : bg("gray"));
                        s.setOnClickListener(function(){
                            schecker ? l1.removeView(l3) : l1.addView(l3);
                            schecker = !schecker;
                            s.setTextColor(schecker ? parseColor("#FF9800") : -1);
                        });
                        if(!!a2){
                            l2.addView(s);
                            // a2(l3);
                            for(let i in a2){
                                if(a2[i].type == "mode_changer") client.hud.components.module.setModeChanger(a0[0], a2[i].modes, l3);
                                if(a2[i].type.includes("slider")) client.hud.components.slider([a0[0].toLowerCase() + "." + a2[i].type.split(" - ")[1], a2[i].type.split(" - ")[2]], [[a2[i].progress[0][0], a2[i].progress[0][1]], a2[i].progress[1]], l3);
                            };
                        };

                        l0.addView(l1);
                        l1.addView(l2);
                        a3.addView(l0);
                        return this;
                    },
                    setModeChanger(s0, s1, s2){
                        let dp = client.gui.dip2px, lp = client.gui.layoutParams, background = client.gui.style.background;
                        let mode = "settings." + s0.toLowerCase() + ".mode";

                        if(!config(mode)) config(mode, "\"" + s1[0] + "\"");

                        let i = s1.indexOf(config(mode));

                        let l0 = new LinearLayout(ctx);
                        l0.setVerticalGravity(17);

                        let m = new TextView(ctx);
                        m.setText(fromHtml("Mode: <font color=#FF9800>" + config(mode) + "</font>"));
                        m.setTextSize(1, 12);
                        m.setTextColor(-1);
                        m.setLayoutParams(lp([-2, -2, 999]));
                        m.setPadding(dp(8), dp(8), dp(8), dp(8));
                        m.setGravity(3);
                        m.setOnClickListener(function(){
                            let l1 = new LinearLayout(ctx);
                            l1.setOrientation(1);
                            l1.setBackgroundColor(parseColor("#191919"));

                            let s0_ = new ScrollView(ctx);
                            s0_.setVerticalScrollBarEnabled(!!0);

                            let v_ = new TextView(ctx);
                            v_.setText(fromHtml("<b>Modes</b> of module: <b>" + s0 + "</b>"));
                            v_.setTextSize(1, 10);
                            v_.setTextColor(-1);
                            v_.setPadding(dp(8), dp(8), dp(8), dp(8));
                            v_.setGravity(17);
                            l1.addView(v_);

                            client.gui.style.line([-1, dp(1)], "FF9800", l1).getLayoutParams().setMargins(dp(16), 0, dp(16), 0);

                            let l2 = new LinearLayout(ctx);
                            l2.setOrientation(1);
                            l2.setLayoutParams(lp([-1, -1], [8, 8, 8, 8]));

                            let v = [];
                            for(let i in s1){
                                v.push(new TextView(ctx));
                                v[i].setText(s1[i]);
                                v[i].setTextSize(1, 12);
                                v[i].setTextColor(config(mode) == s1[i] ? parseColor("#FF9800") : -1);
                                v[i].setLayoutParams(lp([-1, -2], [0, 4, 0, 4]));
                                v[i].setPadding(dp(8), dp(8), dp(8), dp(8));
                                v[i].setGravity(17);
                                v[i].setBackground(config(mode) == s1[i] ? background(parseColor("#202020"), [1, parseColor("#FF9800")], !!0, [30, 30, 30, 30]) : background(parseColor("#202020"), !!0, !!0, [30, 30, 30, 30]));
                                v[i].setOnClickListener(function(v0){
                                    for(let i in v){
                                        v[i].setTextColor(-1);
                                        v[i].setBackground(background(parseColor("#202020"), !!0, !!0, [30, 30, 30, 30]));
                                    };
                                    v0.setTextColor(parseColor("#FF9800"));
                                    v0.setBackground(background(parseColor("#202020"), [1, parseColor("#FF9800")], !!0, [30, 30, 30, 30]));
                                    config(mode, "\"" + v0.getText() + "\"");
                                    m.setText(fromHtml("Mode: <font color=#FF9800>" + config(mode) + "</font>"));
                                });
                                l2.addView(v[i]);
                            };

                            l1.addView(s0_);
                            s0_.addView(l2);
                            let _ = new PopupWindow(l1, width * .25, height * .8, !0);
                            _.setAnimationStyle(16973910);
                            _.showAtLocation(ctx.getWindow().getDecorView(), 17, 0, 0);
                        });
                        l0.addView(m);

                        let al = new TextView(ctx);
                        al.setText("<");
                        al.setTextSize(1, 12);
                        al.setTextColor(-1);
                        al.setPadding(dp(16), dp(8), dp(16), dp(8));
                        al.setOnClickListener(function(){
                            if(i != 0) i--; else i = s1.length - 1;
                            m.setText(fromHtml("Mode: <font color=#FF9800>" + config(mode, "\"" + s1[i] + "\"") + "</font>"));
                        });
                        l0.addView(al);

                        let ar = new TextView(ctx);
                        ar.setText(">");
                        ar.setTextSize(1, 12);
                        ar.setTextColor(-1);
                        ar.setPadding(dp(16), dp(8), dp(16), dp(8));
                        ar.setOnClickListener(function(){
                            if(i != s1.length - 1) i++; else i = 0;
                            m.setText(fromHtml("Mode: <font color=#FF9800>" + config(mode, "\"" + s1[i] + "\"") + "</font>"));
                        });
                        l0.addView(ar);

                        s2.addView(l0);
                        return client.hud.components;
                    }
                },
                button(b0, b1, b2){
                    let dp = client.gui.dip2px, lp = client.gui.layoutParams;

                    let v = new TextView(ctx);
                    v.setText(b0);
                    v.setTextSize(1, 12);
                    v.setTextColor(-1);
                    v.setLayoutParams(lp([-1, dp(40)], [5, 2.5, 5, 2.5]));
                    v.setPadding(dp(8), dp(8), dp(8), dp(8));
                    v.setGravity(20);
                    v.setBackgroundColor(parseColor("#282828"));
                    v.setOnClickListener(function(v0){
                        b1(v0);
                    });
                    b2.addView(v);
                    return this;
                },
                bind(a0, a1){
                    let dx = dy = mPosX = mPosY = 0, moving = !!0;
                    let x = Math.floor(Math.random() * width), y = Math.floor(Math.random() * height);
                    let dp = client.gui.dip2px, lp = client.gui.layoutParams;

                    let v = new TextView(ctx);
                    v.setText(a0);
                    v.setTextSize(1, 8.5);
                    v.setTextColor(config(a1) ? parseColor("#FF9800") : -1);
                    v.setLayoutParams(lp([dp(80), dp(30)]));
                    v.setPadding(dp(8), dp(8), dp(8), dp(8));
                    v.setGravity(17);
                    v.setBackground(client.gui.style.background(-16777216, [.5, parseColor("#FF9800")], !!0, [10, 10, 10, 10]));
                    v.setOnClickListener(function(){
                        config(a1, !config(a1));
                        v.setTextColor(config(a1) ? parseColor("#FF9800") : -1);
                    });
                    v.setOnTouchListener(function(v0, v1){
                        if(!moving) return !!0;
                        switch(v1.getAction()){
                            case 0:
                                dx = mPosX - v1.getRawX();
                                dy = mPosY - v1.getRawY();
                            break;
                            case 2:
                                mPosX = v1.getRawX() + dx;
                                mPosY = v1.getRawY() + dy;
                                client.array[0][a0].update(mPosX - dp(40), mPosY - dp(15), -1, -1);
                            break;
                            default: moving = !!0;
                        };
                        return !0;
                    });
                    v.setOnLongClickListener(function(){
                        return moving = !0;
                    });

                    client.array[0][a0] = new PopupWindow(v, dp(80), dp(30));
                    client.array[0][a0].setAnimationStyle(16973826);
                    client.array[0][a0].showAtLocation(ctx.getWindow().getDecorView(), 51, x, y);
                },
                category(c0, c1, c2, c3){
                    c0 = c0.split(" ");
                    let dp = client.gui.dip2px, lp = client.gui.layoutParams;

                    let l0 = new LinearLayout(ctx);
                    l0.setOrientation(1);
                    l0.setLayoutParams(lp([-2, -2], [5, 5, 5, 5]));

                    let v = new TextView(ctx);
                    v.setText(c0[0]);
                    v.setTextSize(1, 12);
                    v.setTextColor(-1);
                    v.setLayoutParams(lp([dp(c1), -2]));
                    v.setPadding(dp(8), dp(8), dp(8), dp(8));
                    v.setGravity(17);
                    v.setOnClickListener(function(){
                        eval(c0[1]).setBackgroundColor(parseColor("#FF9800"));
                        c2();
                    });
                    l0.addView(v);

                    eval(c0[1] + " = new LinearLayout(ctx);");
                    eval(c0[1]).setLayoutParams(lp([-1, dp(1)]));
                    eval(c0[1]).setPadding(dp(8), dp(8), dp(8), dp(8));
                    eval(c0[1]).setBackgroundColor(-1);
                    l0.addView(eval(c0[1]));

                    c3.addView(l0);
                    return this;
                },
                slider(s0, s1, s2){
                        let dp = client.gui.dip2px, lp = client.gui.layoutParams, background = client.gui.style.background;
                        let progress = ("settings." + s0[0]).toLowerCase();

                        if(!config(progress)) config(progress, s1[1]);

                        let l0 = new LinearLayout(ctx);

                        let p = new TextView(ctx), e = new android.widget.EditText(ctx), v = new TextView(ctx);
                        p.setText(fromHtml(s0[1] + ": <font color=#FF9800>" + config(progress) + "</font> / <font color=#FF9800>" + s1[0][1] + "</font>"));
                        p.setTextSize(1, 10);
                        p.setTextColor(-1);
                        p.setLayoutParams(lp([-1, dp(30)], [8, 0, 8, 0]));
                        p.setPadding(dp(8), dp(4), dp(8), dp(4));
                        p.setGravity(20);
                        p.setBackground(background(parseColor("#191919"), !!0, !!0, [30, 30, 30, 30]));
                        p.setOnClickListener(function(){
                            l0.removeView(p);

                            e.setInputType(2);
                            e.setText(config(progress).toString());
                            e.setHint(s0[1] + ": " + s1[0][0] + " - " + s1[0][1]);
                            e.setHintTextColor(parseColor("#9E9E9E"));
                            e.setTextSize(1, 10);
                            e.setTextColor(-1);
                            e.setLayoutParams(lp([-2, dp(30), 999], [8, 0, 4, 0]));
                            e.setPadding(dp(8), dp(8), dp(8), dp(8));
                            e.setGravity(20);
                            e.setBackground(background(parseColor("#191919"), !!0, !!0, [30, 30, 30, 30]));
                            l0.addView(e);

                            v.setText("ok");
                            v.setTextSize(1, 10);
                            v.setTextColor(-1);
                            v.setLayoutParams(lp([-2, dp(30)], [4, 0, 8, 0]));
                            v.setPadding(dp(16), dp(8), dp(16), dp(8));
                            v.setGravity(17);
                            v.setBackground(background(parseColor("#191919"), !!0, !!0, [30, 30, 30, 30]));
                            v.setOnClickListener(function(){
                                l0.removeView(e);
                                l0.removeView(v);
                                l0.addView(p);
                                s.setProgress(config(progress, e.getText() < s1[0][0] ? s1[0][0] : e.getText() > s1[0][1] ? s1[0][1] : e.getText()));
                            });
                            l0.addView(v);

                            e.requestFocus();
                            /*e.postDelayed({
                                run(){
                                    ctx.getSystemService(android.content.Context.INPUT_METHOD_SERVICE).showSoftInput(e, 0);
                                }
                            });*/
                        });
                        l0.addView(p);

                        let l1 = new LinearLayout(ctx);
                        l1.setOrientation(1);

                        let thumb = new android.graphics.drawable.ShapeDrawable(new android.graphics.drawable.shapes.RectShape());
                        thumb.setColorFilter(-1, PorterDuff.Mode.SRC);
                        thumb.setIntrinsicWidth(25);
                        thumb.setIntrinsicHeight(50);

                        let s = new SeekBar(ctx);
                        android.os.Build.VERSION.SDK_INT >= 26 ? s.setMin(s1[0][0]) : "";
                        s.setMax(s1[0][1]);
                        s.setProgress(parseInt(config(progress)));
                        s.setPadding(dp(10), dp(3), dp(10), dp(3));
                        s.setThumb(thumb);
                        s.setProgressTintList(new android.content.res.ColorStateList.valueOf(parseColor("#FF9800")));
                        s.setOnSeekBarChangeListener({onProgressChanged(o0, o1){
                            p.setText(fromHtml(s0[1] + ": <font color=#FF9800>" + config(progress, android.os.Build.VERSION.SDK_INT >= 26 ? o1 : o1 <= s1[0][0] ? s1[0][0] : o1) + "</font> / <font color=#FF9800>" + s1[0][1] + "</font>"));
                            e.setText(config(progress).toString());
                        }});
                        l1.addView(s);

                        s2.addView(l0);
                        s2.addView(l1);
                    return this;
                }
            },
            buttons(){
                client.thread(() => {
                    let dp = client.gui.dip2px, lp = client.gui.layoutParams;
                    let l0 = new LinearLayout(ctx);
                    l0.setOrientation(1);

                    let l1 = new LinearLayout(ctx);
                    let v = new TextView(ctx);
                    v.setText(fromHtml("<font color=#FF9800>var</font>iable"));
                    v.setTextSize(1, 13);
                    v.setTextColor(-1);
                    v.setLayoutParams(lp([-2, -2, 999], [0, 3, 0, 1.5]));
                    v.setPadding(dp(10), dp(6), dp(10), dp(6));
                    v.setGravity(17);
                    v.setBackgroundColor(parseColor("#191919"));
                    v.setOnClickListener(function(){client.hud.menu()});
                    l1.addView(v);
                    client.gui.style.line([dp(4), -1], "FF9800", l1);
                    l0.addView(l1);

                    let l2 = new LinearLayout(ctx);
                    let s = new TextView(ctx);
                    s.setText("settings");
                    s.setTextSize(1, 13);
                    s.setTextColor(-1);
                    s.setLayoutParams(lp([-2, -2, 999], [0, 1.5, 0, 3]));
                    s.setPadding(dp(10), dp(6), dp(10), dp(6));
                    s.setGravity(17);
                    s.setBackgroundColor(parseColor("#191919"));
                    s.setOnClickListener(function(){client.hud.settings()});
                    l2.addView(s);
                    client.gui.style.line([dp(4), -1], "FF9800", l2);

                    l0.addView(l2);
                    BUTTONS = new PopupWindow(l0, -2, -2);
                    BUTTONS.showAtLocation(ctx.getWindow().getDecorView(), 53, 0, dp(50));
                });
            },
            menu(){
                let remove = () => { s0.removeView(l2); s0.removeView(l3); s0.removeView(l4); };

                let l0 = new LinearLayout(ctx);
                l0.setOrientation(1);
                l0.setBackgroundColor(parseColor("#202020"));

                let s0 = new ScrollView(ctx);
                s0.setVerticalScrollBarEnabled(!!0);

                let l1 = new LinearLayout(ctx);
                l1.setBackgroundColor(parseColor("#191919"));

                client.hud.components.category("Combat cl", 80, () => {
                    remove();
                    s0.addView(l2);
                    ml.setBackgroundColor(-1);
                    pl.setBackgroundColor(-1);
                }, l1)
                .category("Motion ml", 80, () => {
                    remove();
                    s0.addView(l3);
                    cl.setBackgroundColor(-1);
                    pl.setBackgroundColor(-1);
                }, l1)
                .category("Player pl", 80, () => {
                    remove();
                    s0.addView(l4);
                    cl.setBackgroundColor(-1);
                    ml.setBackgroundColor(-1);
                }, l1);
                l0.addView(l1);

                let l2 = new LinearLayout(ctx);
                l2.setOrientation(1);

                client.hud.components.module.add("KillAura Combat K", !!0, [{
                    "type": "slider - cps - CPS",
                    "progress": [[1, 20], 5]
                }, {
                    "type": "slider - range - Range",
                    "progress": [[1, 15], 5]
                }], l2)
                .add("HitBoxes Combat H", !!0, [{
                    "type": "mode_changer",
                    "modes": ["Pointed", "Auto"]
                }, {
                    "type": "slider - width - Width",
                    "progress": [[2, 20], 10]
                }, {
                    "type": "slider - height - Height",
                    "progress": [[2, 20], 10]
                }], l2)
                .add("AimBot Combat A", !!0, [{
                    "type": "slider - range - Range",
                    "progress": [[1, 15], 5]
                }], l2)
                .add("HitAim Combat H", !!0, !!0, l2)
                .add("AntiKnockback Combat", !!0, !!0, l2)
                .add("HitBoost Combat H", !!0, !!0, l2)
                .add("TpAura Combat T", !!0, !!0, l2)
                .add("RatAura Combat R", !!0, !!0, l2);

                let l3 = new LinearLayout(ctx);
                l3.setOrientation(1);

                client.hud.components.module.add("AirJump Motion", [() => client.hud.airjump(), () => AIRJUMP.dismiss()], [{
                    "type": "slider - velocity - Velocity",
                    "progress": [[1, 5], 1]
                }, {
                    "type": "slider - jumppower - Jump power",
                    "progress": [[1, 3], 1]
                }], l3)
                .add("Elevator Motion", [() => client.hud.elevator(), () => ELEVATOR.dismiss()], !!0, l3)
                .add("Flight Motion F", [!!0, () => Player.setFlying(0)], [{
                    "type": "mode_changer",
                    "modes": ["Vanilla", "Bounce", "Crouch"]
                }], l3)
                .add("Glide Motion G", !!0, !!0, l3)
                .add("JetPack Motion J", !!0, [{
                    "type": "mode_changer",
                    "modes": ["Velocity", "Teleport"]
                }], l3)
                .add("AirSpeed Motion A", !!0, !!0, l3)
                .add("Tower Motion T", !!0, [{
                    "type": "mode_changer",
                    "modes": ["Velocity", "Teleport"]
                }, {
                    "type": "slider - powerlevel - Power level",
                    "progress": [[1, 3], 1]
                }], l3)
                .add("Scaffold Motion S", !!0, [{
                    "type": "mode_changer",
                    "modes": ["Velocity", "Teleport"]
                }], l3)
                .add("HighJump Motion", [!!0, () => Entity.removeEffect(getPlayerEnt(), 8)], !!0, l3)
                .add("AntiGravity Motion A", !!0, !!0, l3);

                let l4 = new LinearLayout(ctx);
                l4.setOrientation(1);

                client.hud.components.module.add("FastFall Player F", !!0, !!0, l4)
                .add("FastBreak Player", [!!0, () => Entity.removeEffect(getPlayerEnt(), 3)], !!0, l4)
                .add("FullBright Player", [!!0, () => Entity.removeEffect(getPlayerEnt(), 16)], !!0, l4)
                .add("FastEat Player", [!!0, () => client.utils.player.setSpeedEating(32)], [{
                    "type": "slider - speed - Speed",
                    "progress": [[2, 20], 2]
                }], l4)
                .add("TapTp Player T", !!0, !!0, l4)
                .add("SafeWalk Player", !!0, !!0, l4)
                .add("ChangeFov Player C", !!0, [{
                    "type": "slider - fov - Fov",
                    "progress": [[20, 150], 20]
                }], l4)
                .add("Nuker Player N", !!0, [{
                    "type": "slider - delay - Delay",
                    "progress": [[1, 5], 1]
                }], l4)
                .add("DestroyView Player D", !!0, [{
                    "type": "slider - delay - Delay",
                    "progress": [[1, 5], 1]
                }], l4)
                .add("NoBadEffects Player", !!0, !!0, l4)
                .add("AntiAFK Player", !!0, [{
                    "type": "slider - delay - Delay (in seconds)",
                    "progress": [[1, 60], 5]
                }], l4);

                l0.addView(s0);
                GUI = new PopupWindow(l0, -2, -1, !0);
                GUI.setAnimationStyle(16973910);
                GUI.showAtLocation(ctx.getWindow().getDecorView(), 3, 0, 0);
            },
            settings(){
                let dp = client.gui.dip2px, lp = client.gui.layoutParams;
                let l0 = new LinearLayout(ctx);
                l0.setOrientation(1);
                l0.setBackgroundColor(parseColor("#202020"));

                let s0 = new ScrollView(ctx);
                s0.setVerticalScrollBarEnabled(!!0);

                let title = new TextView(ctx);
                title.setText(fromHtml("<b>Settings</b>"));
                title.setTextSize(1, 14);
                title.setTextColor(-1);
                title.setLayoutParams(lp([-1, -2]));
                title.setPadding(dp(10), dp(10), dp(10), dp(10));
                title.setGravity(17);
                title.setBackgroundColor(parseColor("#191919"));
                l0.addView(title);

                let l2 = new LinearLayout(ctx);
                l2.setOrientation(1);

                client.hud.components.button("Restart game", () => client.restartGame(), l2)
                .button("Set random name", () => client.optionsMCPE.edit("mp_username", client.utils.text.randomLetters(16)), l2);

                l0.addView(s0);
                s0.addView(l2);
                SETTINGS = new PopupWindow(l0, dp(270), -1, !0);
                SETTINGS.setAnimationStyle(16973910);
                SETTINGS.showAtLocation(ctx.getWindow().getDecorView(), 3, 0, 0);   
            },
            airjump(){
                let dx = dy = mPosX = mPosY = 0, moving = 0;
                let dp = client.gui.dip2px, lp = client.gui.layoutParams;

                let l0 = new LinearLayout(ctx);

                let j = new TextView(ctx);
                j.setText("Jump");
                j.setTextSize(1, 10);
                j.setTextColor(-1);
                j.setLayoutParams(lp([dp(80), dp(30)]));
                j.setPadding(dp(8), dp(8), dp(8), dp(8));
                j.setGravity(17);
                j.setBackground(client.gui.style.background(-16777216, [.5, parseColor("#FF9800")], !!0, [10, 10, 10, 10]));
                j.setOnClickListener(function(){
                    setVelY(getPlayerEnt(), .4 * config("settings.airjump.jumppower"));
                    if(config("settings.airjump.velocity") != 1) setVelX(getPlayerEnt(), (-.4 * Math.sin(getYaw() / 180 * Math.PI)) * (config("settings.airjump.velocity") - 1));
                    if(config("settings.airjump.velocity") != 1) setVelZ(getPlayerEnt(), (.4 * Math.cos(getYaw() / 180 * Math.PI)) * (config("settings.airjump.velocity") - 1));
                });
                j.setOnTouchListener(function(v0, v1){
                    if(!moving) return !!0;
                    switch(v1.getAction()){
                        case 0:
                            dx = mPosX - v1.getRawX();
                            dy = mPosY - v1.getRawY();
                        break;
                        case 2:
                            mPosX = v1.getRawX() + dx;
                            mPosY = v1.getRawY() + dy;
                            AIRJUMP.update(mPosX - dp(40), mPosY - dp(15), -1, -1);
                        break;
                        default: moving = !!0;
                    };
                    return !0;
                });
                j.setOnLongClickListener(function(){
                    return moving = !0;
                });
                l0.addView(j);

                AIRJUMP = new PopupWindow(l0, dp(80), -2);
                AIRJUMP.setAnimationStyle(16973910);
                AIRJUMP.showAtLocation(ctx.getWindow().getDecorView(), 51, 0, 0);   
            },
            elevator(){
                let dx = dy = mPosX = mPosY = 0, moving = 0;
                let dp = client.gui.dip2px, lp = client.gui.layoutParams;

                let l0 = new LinearLayout(ctx);
                l0.setOrientation(1);

                let u = new TextView(ctx);
                u.setText("Up");
                u.setTextSize(1, 10);
                u.setTextColor(-1);
                u.setLayoutParams(lp([dp(80), dp(30)], [0, 0, 0, 1]));
                u.setPadding(dp(8), dp(8), dp(8), dp(8));
                u.setGravity(17);
                u.setBackground(client.gui.style.background(-16777216, [.5, parseColor("#FF9800")], !!0, [10, 10, 10, 10]));
                u.setOnClickListener(function(){
                    setPositionRelative(getPlayerEnt(), 0, 2.5, 0);
                    setVelY(getPlayerEnt(), 0);
                });
                u.setOnTouchListener(function(v0, v1){
                    if(!moving) return !!0;
                    switch(v1.getAction()){
                        case 0:
                            dx = mPosX - v1.getRawX();
                            dy = mPosY - v1.getRawY();
                        break;
                        case 2:
                            mPosX = v1.getRawX() + dx;
                            mPosY = v1.getRawY() + dy;
                            ELEVATOR.update(mPosX - dp(40), mPosY - dp(32), -1, -1);
                        break;
                        default: moving = !!0;
                    };
                    return !0;
                });
                u.setOnLongClickListener(function(){
                    return moving = !0;
                });
                l0.addView(u);

                let d = new TextView(ctx);
                d.setText("Down");
                d.setTextSize(1, 10);
                d.setTextColor(-1);
                d.setLayoutParams(lp([dp(80), dp(30)], [0, 1, 0, 0]));
                d.setPadding(dp(8), dp(8), dp(8), dp(8));
                d.setGravity(17);
                d.setBackground(client.gui.style.background(-16777216, [.5, parseColor("#FF9800")], !!0, [10, 10, 10, 10]));
                d.setOnClickListener(function(){
                    setPositionRelative(getPlayerEnt(), 0, -2.5, 0);
                    setVelY(getPlayerEnt(), 0);
                });
                d.setOnTouchListener(function(v0, v1){
                    if(!moving) return !!0;
                    switch(v1.getAction()){
                        case 0:
                            dx = mPosX - v1.getRawX();
                            dy = mPosY - v1.getRawY();
                        break;
                        case 2:
                            mPosX = v1.getRawX() + dx;
                            mPosY = v1.getRawY() + dy;
                            ELEVATOR.update(mPosX - dp(40), mPosY - dp(32), -1, -1);
                        break;
                        default: moving = !!0;
                    };
                    return !0;
                });
                d.setOnLongClickListener(function(){
                    return moving = !0;
                });
                l0.addView(d);

                ELEVATOR = new PopupWindow(l0, dp(80), -2);
                ELEVATOR.setAnimationStyle(16973910);
                ELEVATOR.showAtLocation(ctx.getWindow().getDecorView(), 51, 0, 0);
            }
        },
        utils: {
            entity: {
                getDistance(g0){
                    return Math.sqrt(Math.pow(Entity.getX(g0) - getPlayerX(), 2) + Math.pow(Entity.getY(g0) - getPlayerY(), 2) + Math.pow(Entity.getZ(g0) - getPlayerZ(), 2));
                },
                getNearest(g0){
                    let players = Server.getAllPlayers();
                    let small = g0;
                    let ent = null;
                    if(!!players){
                        for(let i in players){
                            let dist = this.getDistance(players[i]);
                            if(dist < small && dist > 0 && Entity.getHealth(players[i]) >= 1){
                                small = dist;
                                ent = players[i];
                            };
                        };
                        return ent;
                    };
                }
            },
            player: {
                crosshairAimAt(c0){
                    if(!!c0){
                        let x = Entity.getX(c0) - getPlayerX(), y = Entity.getY(c0) - getPlayerY(), z = Entity.getZ(c0) - getPlayerZ();
                        if(Entity.getEntityTypeId(c0) != 63) y += .5;
                        let a = Entity.getX(c0) + .5, b = Entity.getY(c0), c = Entity.getZ(c0) + .5;
                        let l = Math.sqrt(x * x + y * y + z * z);
                        y = y / l;
                        let p = Math.asin(y);
                        p = p * 180 / Math.PI;
                        p = -p;
                        let yaw = -Math.atan2(a - (getPlayerX() + .5), c - (getPlayerZ() + .5)) * (180 / Math.PI);
                        if(p < 89 && p > -89) Entity.setRot(getPlayerEnt(), yaw, p);
                    };
                },
                isOnGround(){
                    return Entity.getVelY(getPlayerEnt()) == -.07840000092983246;
                },
                isMoving(){
                    return Math.sqrt(Math.pow(Entity.getVelX(getPlayerEnt()), 2) + Math.pow(Entity.getVelZ(getPlayerEnt()), 2)) > .01;
                },
                setSpeedEating(s0){
                    Item.setProperties(260, { name: "apple", id: 4, use_duration: s0, food: { nutrition: 4, saturation_modifier: "low", is_meat: !!0 }});
                    Item.setProperties(322, { name: "golden_apple", id: 66, stack_by_data: !0, use_duration: s0, "foil": !!0, hover_text_color: "aqua", food: { nutrition: 4, saturation_modifier: "supernatural", is_meat: !!0, effects: [{ name: "regeneration", chance: 1.0, duration: 5, amplifier: 1 }, { name: "absorption", chance: 1.0, duration: 120, amplifier: 0 }], enchanted_effects: [{ name: "regeneration", chance: 0.66, duration: 30, amplifier: 4 }, { name: "absorption", chance: 0.66, duration: 120,  amplifier: 0 }, { name: "resistance",  chance: 0.66, duration: 300, amplifier: 0 }, { name: "fire_resistance", chance: 0.66, duration: 300, amplifier: 0 }]}});
                    Item.setProperties(466, { name: "appleEnchanted",  id: 210, hand_equipped: !!0, stack_by_data: !0, use_duration: s0, "foil": !0, hover_text_color: "light_purple", food: { nutrition: 4, saturation_modifier: "supernatural", is_meat: !!0, effects: [{ name: "regeneration", chance: 1.0, duration: 30, amplifier: 4 }, { name: "absorption", chance: 1.0, duration: 120,  amplifier: 0 }, { name: "resistance", chance: 1.0, duration: 300, amplifier: 0 }, { name: "fire_resistance", chance: 1.0, duration: 300, amplifier: 0 }]}});
                    Item.setProperties(282, { name: "mushroom_stew", id: 26, use_duration: s0, max_stack_size: 1, food: { nutrition: 6, saturation_modifier: "normal", is_meat: !!0, using_converts_to: "item.bowl" }});
                    Item.setProperties(297, { name: "bread", id: 41, use_duration: s0, food: { nutrition: 5, saturation_modifier: "normal", is_meat: !!0 }});
                    Item.setProperties(319, { name: "porkchop", id: 63, use_duration: s0, food: { nutrition: 3, saturation_modifier: "low", is_meat: !0 }});
                    Item.setProperties(320, { name: "porkchop_cooked", id: 64, use_duration: s0, food: { nutrition: 8, saturation_modifier: "good", is_meat: !0 }});
                    Item.setProperties(349, { name: "fish", id: 93, use_duration: s0, max_damage: 0, stacked_by_data: !0, food: { nutrition: 2, saturation_modifier: "poor", is_meat: !0 }});
                    Item.setProperties(460, { name: "salmon", id: 204, use_duration: s0, max_damage: 0, stacked_by_data: !0, food: { nutrition: 2, saturation_modifier: "poor", is_meat: !0 }});
                    Item.setProperties(461, { name: "clownfish", id: 205, use_duration: s0, max_damage: 0, stacked_by_data: !0, food: { nutrition: 1, saturation_modifier: "poor", is_meat: !0 }});
                    Item.setProperties(462, { name: "pufferfish", id: 206, use_duration: s0, max_damage: 0, stacked_by_data: !0, food: { nutrition: 1, saturation_modifier: "poor", is_meat: !0, effects: [{ name: "poison", duration: 60, amplifier: 3 }, { name: "nausea",  duration: 15, amplifier: 1 }, { name: "hunger", duration: 15, amplifier: 2 }]}});
                    Item.setProperties(350, { name: "cooked_fish", id: 94, use_duration: s0, max_damage: 0, stacked_by_data: !0, food: { nutrition: 5, saturation_modifier: "normal", eat_sound: "random.burp", is_meat: !0 }});
                    Item.setProperties(463, { name: "cooked_salmon", id: 207, use_duration: s0, max_damage: 0, stacked_by_data: !0, food: { nutrition: 6, saturation_modifier: "good", is_meat: !0 }});
                    Item.setProperties(357, { name: "cookie", id: 101, use_duration: s0, food: { nutrition: 2, saturation_modifier: "poor", is_meat: !!0 }});
                    Item.setProperties(360, { name: "melon", id: 104, use_duration: s0, food: { nutrition: 2, saturation_modifier: "low", is_meat: !!0 }});
                    Item.setProperties(363, { name: "beef", id: 107, use_duration: s0, food: { nutrition: 3, saturation_modifier: "low", is_meat: !0 }});
                    Item.setProperties(364, { name: "steak", id: 108, use_duration: s0, food: { nutrition: 8, saturation_modifier: "good", is_meat: !0 }});
                    Item.setProperties(365, { name: "chicken", id: 109, use_duration: s0, food: { nutrition: 2, saturation_modifier: "low", is_meat: !0, effects: [{ name: "hunger", effects: 0.3, duration: 30, amplifier: 0 }]}});
                    Item.setProperties(366, { name: "cooked_chicken", id: 110, use_duration: s0, food: { nutrition: 6, saturation_modifier: "normal", is_meat: !0 }});
                    Item.setProperties(423, { name: "muttonRaw", id: 167, use_duration: s0, food: { nutrition: 2, saturation_modifier: "low", is_meat: !0 }});
                    Item.setProperties(424, { name: "muttonCooked", id: 168, use_duration: s0, food: { nutrition: 6, saturation_modifier: "good", is_meat: !0 }});
                    Item.setProperties(367, { name: "rotten_flesh", id: 111, use_duration: s0, food: { nutrition: 4, saturation_modifier: "poor", is_meat: !0, effects: [{ name: "hunger", chance: 0.3, duration: 30, amplifier: 0 }]}});
                    Item.setProperties(375, { name: "spider_eye", id: 119, use_duration: s0, food: { nutrition: 2, saturation_modifier: "good", is_meat: !!0, effects: [{ name: "poison", chance: 1.0, duration: 5, amplifier: 0 }]}});
                    Item.setProperties(391, { name: "carrot", id: 135, use_duration: s0, food: { nutrition: 3, saturation_modifier: "normal", is_meat: !!0 }, seed: { crop_result: "carrots", plant_at: "farmland" }});
                    Item.setProperties(392, { name: "potato", id: 136, use_duration: s0, food: { nutrition: 1, saturation_modifier: "low", is_meat: !!0 }, seed: { crop_result: "potatoes", plant_at: "farmland" }});
                    Item.setProperties(393, { name: "baked_potato", id: 137, use_duration: s0, food: { nutrition: 5, saturation_modifier: "normal", is_meat: !!0 }});
                    Item.setProperties(394, { name: "poisonous_potato", id: 138, use_duration: s0, food: { nutrition: 2, saturation_modifier: "low", is_meat: !!0, effects: [{ name: "poison", chance: 0.6, duration: 5, amplifier: 0 }]}});
                    Item.setProperties(396, { name: "golden_carrot", id: 140, use_duration: s0, food: { nutrition: 6, saturation_modifier: "supernatural", is_meat: !!0 }});
                    Item.setProperties(400, { name: "pumpkin_pie", id: 144, use_duration: s0, food: { nutrition: 8, saturation_modifier: "low", is_meat: !!0 }});
                    Item.setProperties(411, { name: "rabbit", id: 155, use_duration: s0, food: { nutrition: 3, saturation_modifier: "low", is_meat: !0 }});
                    Item.setProperties(412, { name: "cooked_rabbit", id: 156, use_duration: s0, food: { nutrition: 5, saturation_modifier: "normal", is_meat: !0 }});
                    Item.setProperties(413, { name: "rabbit_stew", id: 157, use_duration: s0, max_stack_size: 1, food: { nutrition: 10, saturation_modifier: "normal", using_converts_to: "bowl", is_meat: !0 }});
                    Item.setProperties(457, { name: "beetroot", id: 201, use_duration: s0, food: { nutrition: 1, saturation_modifier: "normal", is_meat: !!0 }});
                    Item.setProperties(459, { name: "beetroot_soup", id: 203, use_duration: s0, max_stack_size: 1, food: { nutrition: 6, saturation_modifier: "normal", using_converts_to: "bowl", is_meat: !!0 }});
                }
            },
            text: {
                randomLetters(r0){
                    let a = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), b = "";
                    for(let i = 0; i < r0; i++) b += a[Math.floor(Math.random() * a.length)];
                    return b;
                }
            }
        },
        file: {
            createFile(c0, c1){
                let f = new File(c0);
                if(!f.exists()){
                    f.getParentFile().mkdirs();
                    f.createNewFile();
                    if(!!c1) c1();
                };
                return this;
            },
            createDir(c0, c1){
                let d = new File(c0);
                if(!d.exists()){
                    d.mkdirs();
                    if(!!c1) c1();
                };
                return this;
            },
            read(r0){
                let result = "", str;
                let br = new BufferedReader(new FileReader(r0));
                while(!!(str = br.readLine())) result += str + "\n";
                return result;
            }
        },
        optionsMCPE: {
            path: sdcard + "games/com.mojang/minecraftpe/options.txt",
            get(g0){
                let result, str;
                let br = new BufferedReader(new FileReader(this.path));
                while(!!(str = br.readLine()) && str.split(":")[0] == g0) result = str.split(":")[1];
                return result;
            },
            edit(e0, e1){
                if(this.get(e0) != e1){
                    let text = client.file.read(this.path).replace(e0 + ":" + this.get(e0), e0 + ":" + e1);
                    text = text.replace(e0 + ":" + this.get(e0), e0 + ":" + e1);
                    new java.io.FileOutputStream(this.path).write(new java.lang.String(text).getBytes());
                    client.restartGame();
                };
            }
        }
    };
    (() => {
        client.file.createDir(client.dir);
        config = new client.config("config").set({ combat: {}, motion: {}, player: {}, bind: { combat: {}, motion: {}, player: {} }, settings: { killaura: {}, hitboxes: {}, aimbot: {}, airjump: {}, flight: {}, jetpack: {}, tower: {}, scaffold: {}, antigravity: {}, fasteat: {}, changefov: {}, nuker: {}, destroyview: {}, antiafk: {} } }).access;

        if(client.optionsMCPE.get("ctrl_fullkeyboardgameplay") != undefined) client.optionsMCPE.edit("ctrl_fullkeyboardgameplay", 1); //setup killaura

        client.hud.buttons();
        client.thread(() => {
            config("motion.airjump") && typeof AIRJUMP != "object" ? client.hud.airjump() : "";
            config("motion.elevator") && typeof ELEVATOR != "object" ? client.hud.elevator() : "";
        });
        //print("Build > <font color=#FF9800>48</font>");
    })();

    core = new java.lang.Thread({
        run(){
            android.os.Looper.prepare();
            new android.os.Handler().postDelayed({
                run(){
                    try{
                        if(config("combat.aimbot")) client.utils.player.crosshairAimAt(client.utils.entity.getNearest(config("settings.aimbot.range")));
                        new android.os.Handler().postDelayed(this, 10);
                    }catch(e){
                        print("Error(" + e.lineNumber + "): " + e.message);
                        core.start();
                    };
                }
            }, 10);
            android.os.Looper.loop();
        }
    });
    core.start();

    killaura = new java.lang.Thread({
        run(){
            android.os.Looper.prepare();
            new android.os.Handler().postDelayed({
                run(){
                    try{
                        if(config("combat.killaura") && client.utils.entity.getNearest(config("settings.killaura.range"))) new android.app.Instrumentation().sendKeyDownUpSync(45);
                        new android.os.Handler().postDelayed(this, 1000 / config("settings.killaura.cps"));
                    }catch(e){
                        print("Error(" + e.lineNumber + "): " + e.message);
                        killaura.start();
                    };
                }
            }, 1000 / config("settings.killaura.cps"));
            android.os.Looper.loop();
        }
    });
    killaura.start();

    entityHurtHook = (e0, e1) => {
        let modP = client.array[1][1]; // module properties
        if(config("combat.antiknockback") && e1 == getPlayerEnt()){
            modP[0] = !0;
            modP[1] = 1;
            Entity.setImmobile(getPlayerEnt(), modP[0]);
        };
    };

    modTick = () => {
        let x = Math.cos((getYaw() + 90) * (Math.PI / 180)), y = Math.sin((getPitch() - 180) * (Math.PI / 180)), z = Math.sin((getYaw() + 90) * (Math.PI / 180)), modP = client.array[1]; // module properties
        if(config("combat.hitboxes")){
            let w = config("settings.hitboxes.width"), h = config("settings.hitboxes.height");
            switch(config("settings.hitboxes.mode")){
                case "Pointed":
                    Entity.setCollisionSize(Player.getPointedEntity(), w, h);
                break;
                case "Auto":
                    Entity.setCollisionSize(client.utils.entity.getNearest(50), w, h);
                break;
            };
        }else{
            switch(config("settings.hitboxes.mode")){
                case "Pointed":
                    Entity.setCollisionSize(Player.getPointedEntity(), .6, 1.8);
                break;
                case "Auto":
                    Entity.setCollisionSize(client.utils.entity.getNearest(100), .6, 1.8);
                break;
            };
        };
        if(config("combat.antiknockback") && modP[1][0]){
            if(modP[1][1]) modP[1][1]--; else{
                modP[1][0] = !!0;
                modP[1][1] = 0;
                Entity.setImmobile(getPlayerEnt(), modP[1][0]);
            };
        };
        if(config("motion.flight")){
            switch(config("settings.flight.mode")){
                 case "Default":
                    Player.setFlying(1);
                break;
                case "Bounce":
                    modP[0]--;
                    if(!modP[0]){
                        modP[0] = 5;
                        setVelY(getPlayerEnt(), .18);
                    };
                break;
                case "Crouch":
                    if(Entity.isSneaking(getPlayerEnt())){
                        setVelX(getPlayerEnt(), x * 1);
                        setVelZ(getPlayerEnt(), z * 1);
                        setVelY(getPlayerEnt(), 0);
                    };
                break;
            };
        };
        if(config("motion.glide")) setVelY(getPlayerEnt(), 0);
        if(config("motion.jetpack")){
            switch(config("settings.jetpack.mode")){
                case "Velocity":
                    setVelX(getPlayerEnt(), x * 1);
                    setVelY(getPlayerEnt(), y * 1);
                    setVelZ(getPlayerEnt(), z * 1);
                break;
                case "Teleport":
                    setVelY(getPlayerEnt(), 0);
                    setPositionRelative(getPlayerEnt(), x * 1, y * 1, z * 1);
                break;
            };
        };
        if(config("motion.airspeed") && !client.utils.player.isOnGround()){
            setVelX(getPlayerEnt(), Entity.getVelX(getPlayerEnt()) * 1.1);
            setVelZ(getPlayerEnt(), Entity.getVelZ(getPlayerEnt()) * 1.1);
        };
        if(config("motion.highjump")) Entity.addEffect(getPlayerEnt(), 8, 999999 * 20, 2, !0, !!0);
        if(config("motion.antigravity")) setVelY(getPlayerEnt(), .4);
        if(config("player.fastfall") && Entity.getVelY(getPlayerEnt()) < -.05) setVelY(getPlayerEnt(), -100);
        if(config("player.fastbreak")) Entity.addEffect(getPlayerEnt(), 3, 9999 * 20, 100, !0, !!0);
        if(config("player.fullbright")) Entity.addEffect(getPlayerEnt(), 16, 9999 * 20, 100, !0, !!0);
        if(config("player.fasteat")) client.utils.player.setSpeedEating(config("settings.fasteat.speed"));
        if(config("player.safewalk")) Entity.setSneaking(getPlayerEnt(), !0);
        if(config("player.changefov")) ModPE.setFov(config("settings.changefov.fov")); else ModPE.resetFov();
        if(config("player.nuker")){
            modP[2]--;
            if(!modP[2]){
                for(let x = getPlayerX() - 3; x <= getPlayerX() + 3; x++) for(let y = getPlayerY() - 3; y <= getPlayerY() + 3; y++) for(let z = getPlayerZ() - 3; z <= getPlayerZ() + 3; z++) Level.destroyBlock(x, y, z, !0);
                modP[2] = config("settings.nuker.delay");
            };
        };
        if(config("player.destroyview")){
            modP[3]--;
            if(!modP[3]){
                Level.destroyBlock(Player.getPointedBlockX(), Player.getPointedBlockY(), Player.getPointedBlockZ(), !0);
                modP[3] = config("settings.destroyview.delay");
            };
        };
        if(config("player.nobadeffects")){
            let badEffects = [2, 4, 7, 9, 15, 17, 18, 19, 20];
            for(let i in badEffects) Entity.removeEffect(getPlayerEnt(), badEffects[i]);
        };
        if(config("player.antiafk")){
            if(!client.utils.player.isMoving()){
                modP[4]--;
                if(!modP[4]){
                    if(client.utils.player.isOnGround()) setVelY(getPlayerEnt(), .4);
                    modP[4] = config("settings.antiafk.delay") * 20;
                };
            }else modP[4] = config("settings.antiafk.delay") * 20;
        };
    };

    attackHook = (a0, a1) => {
        let x = Math.cos((getYaw() + 90) * (Math.PI / 180)), y = Math.sin((getPitch() - 180) * (Math.PI / 180)), z = Math.sin((getYaw() + 90) * (Math.PI / 180));
        if(config("combat.hitaim")) client.utils.player.crosshairAimAt(a1);
        if(config("combat.hitboost")){
            setVelX(getPlayerEnt(), x * 1);
            setVelY(getPlayerEnt(), y * 1);
            setVelZ(getPlayerEnt(), z * 1);
        };
        if(config("combat.tpaura")) setPosition(getPlayerEnt(), Entity.getX(a1), Entity.getY(a1) + 2, Entity.getZ(a1));
        if(config("combat.rataura")){
            let yaw = Entity.getYaw(a1) % 360 * Math.PI / 180;
            setPosition(getPlayerEnt(), Entity.getX(a1) + Math.sin(yaw), Entity.getY(a1) + 2, Entity.getZ(a1) - Math.cos(yaw));
        };
    };

    useItem = (u0, u1, u2, u3, u4, u5) => {
        if(config("motion.tower")){
            switch(config("settings.tower.mode")){
                case "Velocity":
                    setVelY(getPlayerEnt(), .4 * config("settings.tower.powerlevel"));
                break;
                case "Teleport":
                    setPositionRelative(getPlayerEnt(), 0, 2.5 * config("settings.tower.powerlevel"), 0);
                break;
            };
        };
        if(config("motion.scaffold")){
            switch(config("settings.scaffold.mode")){
                case "Velocity":
                    if(u5 == 1) setVelY(getPlayerEnt(), .45);
                    else if(u5 == 2) setVelZ(getPlayerEnt(), -.45);
                    else if(u5 == 3) setVelZ(getPlayerEnt(), .45);
                    else if(u5 == 4) setVelX(getPlayerEnt(), -.45);
                    else if(u5 == 5) setVelX(getPlayerEnt(), .45);
                break;
                case "Teleport":
                    if(u5 == 1) setPositionRelative(getPlayerEnt(), 0, 1, 0);
                    else if(u5 == 2) setPositionRelative(getPlayerEnt(), 0, 0, -1);
                    else if(u5 == 3) setPositionRelative(getPlayerEnt(), 0, 0, 1);
                    else if(u5 == 4) setPositionRelative(getPlayerEnt(), -1, 0, 0);
                    else if(u5 == 5) setPositionRelative(getPlayerEnt(), 1, 0, 0);
                break;
            };
        };
        if(config("player.taptp")) setPosition(getPlayerEnt(), Player.getPointedBlockX(), Player.getPointedBlockY() + 3, Player.getPointedBlockZ());
    };
})();

/*
 * Positions:
 * top: 48
 * bottom: 80
 * left: 3
 * right: 5
 * center: 17
 */
