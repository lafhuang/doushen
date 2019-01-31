package info.doushen.system.biz.impl;

import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import info.doushen.system.mapper.DictMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * DictServiceImpl
 *
 * @author huangdou
 * @date 2018/12/12
 */
@Service
public class DictServiceImpl implements DictService {

    @Autowired
    private DictMapper dictMapper;

    @Override
    public List<DictEntity> listType() {
        return dictMapper.listType();
    }

    @Override
    public Pager pageDictList(Query query) {
        int count = dictMapper.count(query);
        if (count == 0) {
            return new Pager(count, new ArrayList<DictEntity>());
        }
        List<DictEntity> dictList = dictMapper.list(query);
        return new Pager(count, dictList);
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
    public List<DictEntity> queryDictByType(String dictType) {
        return dictMapper.queryDictByType(dictType);
    }

    @Override
    public List<DictEntity> queryAll() {
        return dictMapper.queryAll();
    }

}
