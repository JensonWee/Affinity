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
package server.life;

import net.server.audit.locks.MonitoredLockType;
import net.server.audit.locks.MonitoredReadLock;
import net.server.audit.locks.MonitoredReentrantReadWriteLock;
import net.server.audit.locks.MonitoredWriteLock;
import net.server.audit.locks.factory.MonitoredReadLockFactory;
import net.server.audit.locks.factory.MonitoredWriteLockFactory;
import provider.Data;
import provider.DataProvider;
import provider.DataProviderFactory;
import provider.DataTool;
import provider.wz.WZFiles;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.concurrent.TimeUnit.SECONDS;

/**
 * @author Danny (Leifde)
 */
public class MobSkillFactory {

    private static final Map<String, MobSkill> mobSkills = new HashMap<>();
    private final static DataProvider dataSource = DataProviderFactory.getDataProvider(WZFiles.SKILL);
    private static final Data skillRoot = dataSource.getData("MobSkill.img");
    private final static MonitoredReentrantReadWriteLock dataLock = new MonitoredReentrantReadWriteLock(MonitoredLockType.MOBSKILL_FACTORY);
    private final static MonitoredReadLock rL = MonitoredReadLockFactory.createLock(dataLock);
    private final static MonitoredWriteLock wL = MonitoredWriteLockFactory.createLock(dataLock);

    public static MobSkill getMobSkill(final int skillId, final int level) {
        final String key = skillId + "" + level;
        rL.lock();
        try {
            MobSkill ret = mobSkills.get(key);
            if (ret != null) {
                return ret;
            }
        } finally {
            rL.unlock();
        }
        wL.lock();
        try {
            MobSkill ret;
            ret = mobSkills.get(key);
            if (ret == null) {
                Data skillData = skillRoot.getChildByPath(skillId + "/level/" + level);
                if (skillData != null) {
                    int mpCon = DataTool.getInt(skillData.getChildByPath("mpCon"), 0);
                    List<Integer> toSummon = new ArrayList<>();
                    for (int i = 0; i > -1; i++) {
                        if (skillData.getChildByPath(String.valueOf(i)) == null) {
                            break;
                        }
                        toSummon.add(DataTool.getInt(skillData.getChildByPath(String.valueOf(i)), 0));
                    }
                    int effect = DataTool.getInt("summonEffect", skillData, 0);
                    int hp = DataTool.getInt("hp", skillData, 100);
                    int x = DataTool.getInt("x", skillData, 1);
                    int y = DataTool.getInt("y", skillData, 1);
                    int count = DataTool.getInt("count", skillData, 1);
                    long duration = SECONDS.toMillis(DataTool.getInt("time", skillData, 0));
                    long cooltime = SECONDS.toMillis(DataTool.getInt("interval", skillData, 0));
                    int iprop = DataTool.getInt("prop", skillData, 100);
                    float prop = iprop / 100;
                    int limit = DataTool.getInt("limit", skillData, 0);
                    Data ltd = skillData.getChildByPath("lt");
                    Point lt = null;
                    Point rb = null;
                    if (ltd != null) {
                        lt = (Point) ltd.getData();
                        rb = (Point) skillData.getChildByPath("rb").getData();
                    }
                    ret = new MobSkill(skillId, level);
                    ret.addSummons(toSummon);
                    ret.setCoolTime(cooltime);
                    ret.setDuration(duration);
                    ret.setHp(hp);
                    ret.setMpCon(mpCon);
                    ret.setSpawnEffect(effect);
                    ret.setX(x);
                    ret.setY(y);
                    ret.setCount(count);
                    ret.setProp(prop);
                    ret.setLimit(limit);
                    ret.setLtRb(lt, rb);
                }
                mobSkills.put(skillId + "" + level, ret);
            }
            return ret;
        } finally {
            wL.unlock();
        }
    }
}
