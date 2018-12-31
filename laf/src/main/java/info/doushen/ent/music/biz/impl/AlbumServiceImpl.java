package info.doushen.ent.music.biz.impl;

import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.mapper.AlbumMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * AlbumServiceImpl
 *
 * @author huangdou
 * @date 2018/12/29
 */
@Service
public class AlbumServiceImpl implements AlbumService {

    @Autowired
    private AlbumMapper albumMapper;

    @Override
    public PageUtils pageAlbumList(Query query) {
        int count = albumMapper.count(query);
        if (count == 0) {
            return new PageUtils(count, new ArrayList<AlbumEntity>());
        }
        List<AlbumEntity> albumList = albumMapper.list(query);
        return new PageUtils(count, albumList);
    }

    @Override
    public int save(AlbumEntity album) {
        return albumMapper.save(album);
    }

}
