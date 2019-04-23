package info.doushen.ent.music.mapper;

import info.doushen.common.utils.Query;
import info.doushen.ent.music.entity.SongEntity;
import info.doushen.ent.music.vo.SongVO;

import java.util.List;

/**
 * SongMapper
 *
 * @author huangdou
 * @date 2019/1/3
 */
public interface SongMapper {

    /**
     * 获取歌曲记录数
     *
     * @param query
     * @return
     */
    int count(Query query);

    /**
     * 分页获取歌曲列表
     *
     * @param query
     * @return
     */
    List<SongVO> list(Query query);

    /**
     * 保存歌曲
     *
     * @param song
     * @return
     */
    int save(SongEntity song);

    /**
     * 获取歌曲信息
     *
     * @param id
     * @return
     */
    SongVO get(int id);

    /**
     * 更新歌曲信息
     *
     * @param song
     * @return
     */
    int update(SongEntity song);

    /**
     * 删除专辑歌曲
     *
     * @param albumId
     * @return
     */
    int removeByAlbum(int albumId);

}
