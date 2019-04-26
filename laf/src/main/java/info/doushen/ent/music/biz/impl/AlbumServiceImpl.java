package info.doushen.ent.music.biz.impl;

import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.biz.SongService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.mapper.AlbumMapper;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @Autowired
    private DictService dictService;

    @Autowired
    private SongService songService;

    @Override
    public Pager pageAlbumList(Query query) {
        int count = albumMapper.count(query);
        if (count == 0) {
            return new Pager(count, new ArrayList<AlbumEntity>());
        }
        List<AlbumEntity> albumList = albumMapper.list(query);
        return new Pager(count, albumList);
    }

    @Override
    public int save(AlbumEntity album) {
        return albumMapper.save(album);
    }

    @Override
    public AlbumEntity get(int albumId) {
        return albumMapper.get(albumId);
    }

    @Override
    public int update(AlbumEntity album) {
        return albumMapper.update(album);
    }

    @Override
    public int saveSingerAlbum(int createUser, List<AlbumEntity> albumList) {
        List<DictEntity> typeList = dictService.queryDictByType("album_type");

        List<DictEntity> styleList = dictService.queryDictByType("album_style");

        List<DictEntity> languageList = dictService.queryDictByType("album_language");

        for (AlbumEntity album : albumList) {

            album.setCreateBy(createUser);

            for (DictEntity dict : typeList) {
                if (StringUtils.equals(album.getType(), dict.getDictName())) {
                    album.setType(dict.getDictValue());
                    break;
                }
            }

            for (DictEntity dict : styleList) {
                if (StringUtils.equals(album.getStyle(), dict.getDictName())) {
                    album.setStyle(dict.getDictValue());
                    break;
                }
            }

            for (DictEntity dict : languageList) {
                if (StringUtils.equals(album.getLanguage(), dict.getDictName())) {
                    album.setLanguage(dict.getDictValue());
                    break;
                }
            }

            albumMapper.save(album);
        }

        return albumList.size();
    }

    @Override
    public AlbumEntity querySingerAlbum(Map<String, Object> params) {
        return albumMapper.querySingerAlbum(params);
    }

    @Override
    @Transactional
    public int remove(int id) {
        songService.removeByAlbum(id);
        return albumMapper.remove(id);
    }

    @Override
    @Transactional
    public int batchRemove(int[] albumIdList) {
        for (int albumId : albumIdList) {
            remove(albumId);
        }
        return albumIdList.length;
    }

}
