package info.doushen.system.biz.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import info.doushen.common.utils.Query;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import info.doushen.system.mapper.DictMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * DictServiceImpl
 *
 * @author huangdou
 * @date 2018/12/12
 */
@Service
@CacheConfig(cacheNames = {"dict"})
public class DictServiceImpl implements DictService {

    @Autowired
    private DictMapper dictMapper;

    @Override
    public List<DictEntity> listType() {
        return dictMapper.listType();
    }

    @Override
    public PageInfo<DictEntity> pageDictList(Query query) {
        PageHelper.startPage(query.getOffset(), query.getLimit());
        List<DictEntity> dictList = dictMapper.list(query);
        PageInfo<DictEntity> pageInfo = new PageInfo<>(dictList);
        return pageInfo;
    }

    @Override
    public int save(DictEntity dict) {
        return dictMapper.save(dict);
    }

    @Override
    public DictEntity get(int id) {
        return dictMapper.get(id);
    }

    @Override
    public int remove(int id) {
        return dictMapper.remove(id);
    }

    @Override
    public int batchremove(int[] dictIdList) {
        for (int dictId : dictIdList) {
            remove(dictId);
        }
        return dictIdList.length;
    }

    @Override
    public int update(DictEntity dict) {
        return dictMapper.update(dict);
    }

    @Override
    @Cacheable(key = "targetClass + methodName +#p0")
    public List<DictEntity> queryDictByType(String dictType) {
        return dictMapper.queryDictByType(dictType);
    }

    @Override
    public List<DictEntity> queryAll() {
        return dictMapper.queryAll();
    }

    @Override
    @Cacheable(key = "targetClass + methodName +#p0")
    public String dictDisplay(Map<String, Object> params) {
        String dictType = (String) params.get("dictType");
        String dictValue = (String) params.get("dictValue");
        if (StringUtils.isEmpty(dictType) || StringUtils.isEmpty(dictValue)) {
            return "";
        }
        String display = "";
        try {
            display = dictMapper.dictDisplay(params);
        } catch (Exception e) {
            System.out.println(e);
        }
        return display;
    }

    @Override
    public Map<String, Object> dictGroup(Map<String, Object> params) {
        return null;
    }

}
