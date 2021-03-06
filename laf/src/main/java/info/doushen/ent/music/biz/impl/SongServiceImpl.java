package info.doushen.ent.music.biz.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.biz.SongService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.entity.SongEntity;
import info.doushen.ent.music.mapper.SongMapper;
import info.doushen.ent.music.vo.SongVO;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private AlbumService albumService;

    @Autowired
    private DictService dictService;

    @Override
    public PageInfo<SongVO> pageSongList(Query query) {
        PageHelper.startPage(query.getOffset(), query.getLimit());
        List<SongVO> songList = songMapper.list(query);
        PageInfo<SongVO> pageInfo = new PageInfo<>(songList);
        return pageInfo;
    }

    @Override
    public int save(SongEntity song) {
        return songMapper.save(song);
    }

    @Override
    public SongVO get(int id) {
        return songMapper.get(id);
    }

    @Override
    public int update(SongEntity song) {
        return songMapper.update(song);
    }

    @Override
    public int saveSingerSong(int userId, List<SongVO> songList) {
        List<DictEntity> languageList = dictService.queryDictByType("album_language");

        List<DictEntity> audioTypeList = dictService.queryDictByType("audio_type");

        for (SongVO song : songList) {
            SongEntity songEntity = new SongEntity();
            songEntity.setCreateBy(userId);

            songEntity.setName(song.getName());

            Map<String, Object> params = new HashMap<>();
            params.put("singerId", song.getSingerId());
            params.put("albumName", song.getAlbumName());
            AlbumEntity album = albumService.querySingerAlbum(params);
            if (album == null) {
                break;
            }
            songEntity.setAlbumId(album.getId());

            songEntity.setTrackNumber(song.getTrackNumber());
            for (DictEntity dict : languageList) {
                if (StringUtils.equals(song.getLanguage(), dict.getDictName())) {
                    songEntity.setLanguage(dict.getDictValue());
                    break;
                }
            }
            songEntity.setLength(song.getLength());
            songEntity.setSize(song.getSize());
            for (DictEntity dict : audioTypeList) {
                if (StringUtils.equals(song.getAudioType(), dict.getDictName())) {
                    songEntity.setAudioType(dict.getDictValue());
                    break;
                }
            }

            songMapper.save(songEntity);
        }

        return songList.size();
    }

    @Override
    public int removeByAlbum(int albumId) {
        return songMapper.removeByAlbum(albumId);
    }

}
