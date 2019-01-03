package info.doushen.ent.music.biz.impl;

import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.SongService;
import info.doushen.ent.music.entity.SongEntity;
import info.doushen.ent.music.mapper.SongMapper;
import info.doushen.ent.music.vo.SongVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * SongServiceImpl
 *
 * @author huangdou
 * @date 2019/1/1
 */
@Service
public class SongServiceImpl implements SongService {

    @Autowired
    private SongMapper songMapper;

    @Override
    public PageUtils pageSongList(Query query) {
        int count = songMapper.count(query);
        if (count == 0) {
            return new PageUtils(count, new ArrayList<SongVO>());
        }
        List<SongVO> songList = songMapper.list(query);
        return new PageUtils(count, songList);
    }

    @Override
    public int save(SongEntity song) {
        return songMapper.save(song);
    }

}
