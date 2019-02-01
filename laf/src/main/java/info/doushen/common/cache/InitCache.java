package info.doushen.common.cache;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import info.doushen.common.Constant;
import info.doushen.common.redis.RedisUtil;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * InitCache
 *
 * @author huangdou
 * @date 2019-01-31
 */
@Component
public class InitCache implements ApplicationRunner {

    @Autowired
    private DictService dictService;

    @Async
    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 加载数据字典
        // initDict();
    }

    private void initDict() {
        List<DictEntity> dictList = dictService.queryAll();
        if (CollectionUtils.isNotEmpty(dictList)) {
            Map<String, List<DictEntity>> dictGroupMap = new HashMap<>();
            for (DictEntity dict : dictList) {
                List<DictEntity> typeList;
                if (dictGroupMap.containsKey(dict.getDictType())) {
                    typeList = dictGroupMap.get(dict.getDictType());
                } else {
                    typeList = new ArrayList<>();
                }
                typeList.add(dict);
                dictGroupMap.put(dict.getDictType(), typeList);
            }

            for (Map.Entry dictEntry : dictGroupMap.entrySet()) {
                String key = Constant.DICT_CACHE_PREFIX + dictEntry.getKey();
                if (RedisUtil.hasKey(key)) {
                    RedisUtil.delete(key);
                }
                RedisUtil.set(key, JSONArray.toJSONString(dictEntry.getValue()));
            }
        }
    }

}
