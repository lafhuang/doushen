package info.doushen.ent.music.biz.impl;

import info.doushen.ent.music.biz.SingerService;
import info.doushen.ent.music.entity.SingerEntity;
import info.doushen.ent.music.mapper.SingerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * SingerServiceImpl
 *
 * @author huangdou
 * @date 2018-12-21
 */
@Service
public class SingerServiceImpl implements SingerService {

    @Autowired
    private SingerMapper singerMapper;

    @Override
    public List<SingerEntity> list(Map<String, Object> params) {
        return singerMapper.list(params);
    }

    @Override
    public int save(SingerEntity singer) {
        singerMapper.save(singer);
        return singer.getId();
    }

    @Override
    public SingerEntity get(int singerId) {
        return singerMapper.get(singerId);
    }

    @Override
    public int update(SingerEntity singer) {
        return singerMapper.update(singer);
    }

}
