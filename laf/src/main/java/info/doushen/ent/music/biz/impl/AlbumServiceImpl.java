package info.doushen.ent.music.biz.impl;

import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.mapper.AlbumMapper;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import org.apache.commons.lang3.StringUtils;
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

    @Autowired
    private DictService dictService;

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

    @Override
    public AlbumEntity get(int albumId) {
        return albumMapper.get(albumId);
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

}
