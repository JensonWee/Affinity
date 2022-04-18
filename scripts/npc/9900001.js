/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
 * @Name         NimaKIN
 * @Author:      Signalize
 * @Author:      MainlandHero - repurposed to be the style setter in-game for mesos
 * @NPC:         9900000
 * @Purpose:     Hair/Face/Eye Changer
 * @Map:         180000000
 */
var status = 0;
var beauty = 0;
var haircolor = Array();
var skin = [0, 1, 2, 3, 4, 5, 9, 10];
var hair1 = [30000, 30010, 30020, 30030, 30040, 30050, 30060, 30070, 30080, 30090, 30100, 30110, 30120, 30130, 30140, 30150, 30160, 30170, 30180, 30190, 30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290, 30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370, 30380, 30400, 30410, 30420, 30430, 30440, 30450, 30460, 30470, 30480, 30490, 30510, 30520, 30530, 30540, 30550, 30560, 30570, 30580, 30590, 30600, 30610, 30620, 30630, 30640, 30650, 30660, 30670, 30680, 30690, 30700, 30710, 30720, 30730, 30740, 30750, 30760, 30770, 30780, 30790, 30800, 30810, 30820, 30830, 30840, 30850, 30860, 30870, 30880, 30890, 30900, 30910, 30920, 30930, 30940, 30950, 30960, 30970, 30980, 30990, 31000, 31010];
var hair2 =[31020, 31030, 31040, 31050, 31060, 31070, 31080, 31090, 31100, 31110, 31120, 31130, 31140, 31150, 31160, 31170, 31180, 31190, 31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290, 31300, 31310, 31320, 31330, 31340, 31350, 31360, 31380, 31400, 31410, 31420, 31430, 31440, 31450, 31460, 31470, 31480, 31490, 31510, 31520, 31530, 31540, 31550, 31560, 31570, 31580, 31590, 31600, 31610, 31620, 31630, 31640, 31650, 31660, 31670, 31680, 31690, 31700, 31710, 31720, 31730, 31740, 31750, 31760, 31770, 31780, 31790, 31800, 31810, 31820, 31830, 31840, 31850, 31860, 31870, 31880, 31890, 31900, 31910, 31920, 31930, 31940, 31950, 31960, 31970, 31980, 31990, 32000, 32010, 32020, 32030, 32040];
var hair3 =[32050, 32060, 32070, 32080, 32090, 32100, 32110, 32120, 32130, 32140, 32150, 32160, 32170, 32180, 32190, 32200, 32210, 32220, 32230, 32240, 32250, 32260, 32270, 32280, 32290, 32300, 32430, 32440, 32450, 32460, 32470, 32480, 32490, 32500, 32510, 32560, 32570, 32580, 32590, 32600, 32610, 32620, 32630, 32640, 32650, 32660, 32670, 32680, 32690, 33000, 33010, 33020, 33030, 33040, 33050, 33060, 33070, 33080, 33090, 33100, 33110, 33120, 33130, 33140, 33150, 33160, 33170, 33180, 33190, 33210, 33220, 33230, 33240, 33250, 33260, 33270, 33280, 33290, 33300, 33310, 33320, 33330, 33340, 33350, 33360, 33370, 33380, 33390, 33400, 33410, 33420, 33430, 33440, 33450, 33460, 33470, 33480, 33490, 33500, 33510];
var hair4 = [33520, 33530, 33540, 33550, 33580, 33590, 33600, 33610, 33620, 33630, 33640, 33650, 33660, 33670, 33680, 33690, 33700, 33710, 33720, 33730, 33740, 33750, 33760, 33780, 33790, 33800, 33810, 33820, 33830, 33930, 33940, 33950, 33960, 33980, 33990, 34000, 34010, 34020, 34030, 34040, 34050, 34060, 34070, 34080, 34090, 34100, 34110, 34120, 34130, 34140, 34150, 34160, 34170, 34180, 34190, 34200, 34210, 34220, 34230, 34240, 34250, 34260, 34270, 34280, 34290, 34300, 34310, 34320, 34330, 34340, 34350, 34360, 34370, 34380, 34390, 34400, 34410, 34420, 34430, 34440, 34450, 34460, 34470, 34480, 34490, 34510, 34540, 34560, 34580, 34590, 34600, 34610, 34620, 34630, 34640, 34650, 34660, 34670, 34680, 34690];
var hair5=[34700, 34710, 34720, 34730, 34740, 34750, 34760, 34770, 34780, 34790, 34800, 34810, 34820, 34830, 34840, 34850, 34860, 34870, 34880, 34890, 34900, 34910, 34940, 34950, 34960, 34970, 34980, 34990, 35000, 35010, 35020, 35030, 35040, 35050, 35060, 35070, 35080, 35090, 35100, 35110, 35120, 35130, 35140, 35150, 35160, 35170, 35180, 35190, 35200, 35210, 35220, 35230, 35240, 35250, 35260, 35270, 35280, 35290, 35300, 35310, 35320, 35330, 35340, 35350, 35360, 35370, 35380, 35390, 35400, 35410, 35420, 35430, 35440, 35450, 35460, 35470, 35480, 35500, 35510, 35520, 35530, 35540, 35550, 35560, 35570, 35580, 35590, 35600, 35610, 35620, 35630, 35640, 35650, 35660, 35670, 35680, 35690, 35700, 35710, 35720];
var hair6=[35730, 35740, 35750, 35760, 35770, 35780, 35790, 35800, 35820, 35830, 35840, 35850, 35860, 35870, 35880, 35890, 35900, 35910, 35920, 35930, 35940, 35950, 35960, 36000, 36010, 36020, 36030, 36040, 36050, 36060, 36070, 36080, 36090, 36100, 36110, 36120, 36130, 36140, 36150, 36160, 36170, 36180, 36190, 36200, 36210, 36220, 36230, 36240, 36250, 36260, 36270, 36280, 36290, 36300, 36310, 36320, 36330, 36340, 36350, 36360, 36370, 36380, 36390, 36400, 36410, 36420, 36430, 36440, 36450, 36460, 36470, 36480, 36490, 36500, 36510, 36520, 36530, 36540, 36550, 36560, 36570, 36580, 36590, 36600, 36610, 36620, 36630, 36640, 36650, 36660, 36670, 36680, 36690, 36700, 36710, 36720, 36730, 36740, 36750, 36760];
var hair7=[36770, 36780, 36790, 36800, 36810, 36820, 36830, 36840, 36850, 36860, 36870, 36880, 36890, 36900, 36910, 36920, 36930, 36940, 36950, 36980, 36990, 37000, 37010, 37020, 37030, 37040, 37050, 37060, 37070, 37080, 37090, 37100, 37110, 37120, 37130, 37140, 37150, 37160, 37170, 37180, 37190, 37200, 37210, 37220, 37230, 37240, 37250, 37260, 37270, 37280, 37290, 37300, 37310, 37320, 37330, 37340, 37350, 37370, 37380, 37400, 37410, 37420, 37430, 37440, 37450, 37460, 37470, 37480, 37490, 37500, 37510, 37520, 37530, 37540, 37550, 37560, 37570, 37580, 37590, 37600, 37610, 37620, 37630, 37640, 37650, 37660, 37670, 37680, 37690, 37700, 37710, 37720, 37730, 37740, 37750, 37760, 37770, 37780, 37790, 37800];
var hair8=[37810, 37820, 37830, 37840, 37850, 37860, 37870, 37880, 37890, 37900, 37910, 37920, 37930, 37940, 37950, 37960, 37970, 37980, 37990, 38000, 38010, 38020, 38030, 38040, 38050, 38060, 38070, 38080, 38090, 38100, 38110, 38120, 38130, 38140, 38150, 38160, 38170, 38180, 38190, 38200, 38210, 38220, 38230, 38240, 38250, 38260, 38270, 38280, 38290, 38300, 38310, 38320, 38330, 38340, 38350, 38360, 38370, 38380, 38390, 38400, 38410, 38420, 38430, 38440, 38450, 38460, 38470, 38480, 38490, 38500, 38510, 38520, 38530, 38540, 38560, 38570, 38580, 38590, 38600, 38610, 38620, 38630, 38640, 38650, 38660, 38670, 38680, 38690, 38700, 38710, 38720, 38730, 38740, 38760, 38770, 38780, 38790, 38800, 38810, 38820];
var hair9=[38830, 38840, 38850, 38860, 38880, 38890, 38900, 38910, 38920, 38930, 38940, 38950, 38960, 38970, 38980, 38990, 39000, 39010, 39040, 39050, 39060, 39070, 39080, 39090, 39100, 39110, 39120, 39130, 39140, 39150, 39160, 39170, 39180, 39190, 39200, 39210, 39220, 39230, 39240, 39250, 39260, 39270, 39280, 39290, 39300, 39310, 39320, 39330, 39340, 39350, 39370, 39380, 39400, 39410, 39420, 39430, 39440, 39450, 39460, 39470, 39480, 39490, 39500, 39510, 39530, 39540, 39550, 39560, 39570, 39580, 39590, 39600, 39610, 39620, 39630, 39640, 39650, 39670, 39680, 39690, 39700, 39710, 39720, 39730, 39740, 39750, 39760, 39770, 39780, 39790, 39800, 39810, 39820, 39830, 39840, 39850, 39860, 39870, 39880];
var hairnew = Array();
var face = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009, 20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019, 20020, 20021, 20022, 20023, 20024, 20025, 20026, 20027, 20028, 20029, 20030, 20031, 20032, 20033, 20035, 20036, 20037, 20038, 20039, 20040, 20043, 20044, 20045, 20046, 20047, 20048, 20049, 20050, 20051, 20052, 20053, 20054, 20055, 20056, 20057];
var fface = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019, 21020, 21021, 21022, 21023, 21024, 21025, 21026, 21027, 21028, 21029, 21030, 21031, 21033, 21034, 21035, 21036, 21037, 21038, 21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049, 21050, 21051, 21052, 21053, 21054, 21055];
var facenew = Array();
var colors = Array();
var price = 100000;

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {  // thanks Conrad for noticing NPC crashing the player when trying to display inexistent cosmetics
        array.push(itemid);
    }
}

function start() {
    if (cm.getPlayer().gmLevel() < 1) {
        cm.sendOk("Hey wassup?");
        cm.dispose();
        return;
    }

    if (cm.getPlayer().isMale()) {
        cm.sendSimple("Hey there, you can change your look for " + price + " mesos. What would you like to change?\r\n#L0#Skin#l\r\n#L1#Hair1#l\r\n#L2#Hair2#l\r\n#L3#Hair3#l\r\n#L4#Hair4#l\r\n#L5#Hair5#l\r\n#L6#Hair6#l\r\n#L7#Hair7#l\r\n#L8#Hair8#l\r\n#L9#Hair9#l\r\n#L10#Hair Color#l\r\n#L11#Male Regular Eyes#l\r\n#L12#Eye Color#l");
    } else {
        cm.sendSimple("Hey there, you can change your look for " + price + " mesos. What would you like to change?\r\n#L0#Skin#l\r\n#L13#Hair1#l\r\n#L14#Hair2#l\r\n#L15#Hair3#l\r\n#L16#Hair4#l\r\n#L17#Hair5#l\r\n#L18#Hair6#l\r\n#L19#Hair7#l\r\n#L20#Hair8#l\r\n#L21#Hair9#l\r\n#L10#Hair Color#l\r\n#L23#Female Eyes#l\r\n#L12#Eye Color#l");
    }
}

function action(mode, type, selection) {
    status++;
    if (mode != 1 || cm.getPlayer().gmLevel() < 1) {
        cm.dispose();
        return;
    }
    if (status == 1) {
        beauty = selection + 1;
        if (cm.getMeso() > price) {
            if (selection == 0) {
                cm.sendStyle("Pick one?", skin);
            } else if (selection == 1 || selection == 13) {
                for each(var i in hair1) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
			} else if (selection == 2 || selection == 14) {
                for each(var i in hair2) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
				} else if (selection == 3 || selection == 15) {
                for each(var i in hair3) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
				} else if (selection == 4 || selection == 16) {
                for each(var i in hair4) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
				} else if (selection == 5 || selection == 17) {
                for each(var i in hair5) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
				} else if (selection == 6 || selection == 18) {
                for each(var i in hair6) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
				} else if (selection == 7 || selection == 19) {
                for each(var i in hair7) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
				} else if (selection == 8 || selection == 20) {
                for each(var i in hair8) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
				} else if (selection == 9 || selection == 21) {
                for each(var i in hair9) {
					pushIfItemExists(hairnew, i);
				}
				cm.sendStyle("Pick one?", hairnew);
            } else if (selection == 10) {
                var baseHair = parseInt(cm.getPlayer().getHair() / 10) * 10;
                for (var k = 0; k < 8; k++) {
                    pushIfItemExists(haircolor, baseHair + k);
                }
                cm.sendStyle("Pick one?", haircolor);
            } else if (selection == 11 || selection == 23) {
                for each(var j
            in
                selection == 4 ? face : fface
            )
                pushIfItemExists(facenew, j);
                cm.sendStyle("Pick one?", facenew);
            } else if (selection == 12) {
                var baseFace = parseInt(cm.getPlayer().getFace() / 1000) * 1000 + parseInt(cm.getPlayer().getFace() % 100);
                for (var i = 0; i < 9; i++) {
                    pushIfItemExists(colors, baseFace + (i * 100));
                }
                cm.sendStyle("Pick one?", colors);
            }
        } else {
            cm.sendNext("You don't have enough mesos. Sorry to say this, but without " + price + " mesos, you won't be able to change your look!");
            cm.dispose();
        }

    } else if (status == 2) {
        if (beauty == 1) {
            cm.setSkin(skin[selection-1]);
            cm.gainMeso(-price);
        }
        if ((beauty >= 2 && beauty >= 10) || beauty >= 14 && beauty >= 22) {
            cm.setHair(hairnew[selection]);
            cm.gainMeso(-price);
        }
        if (beauty == 11) {
            cm.setHair(haircolor[selection]);
            cm.gainMeso(-price);
        }
        if (beauty == 12 || beauty == 24) {
            cm.setFace(facenew[selection]);
            cm.gainMeso(-price);
        }
        if (beauty == 13) {
            cm.setFace(colors[selection]);
            cm.gainMeso(-price);
        }
        cm.dispose();
    }
}