package info.doushen.ent.music.biz;

import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.entity.SongEntity;

/**
 * SongService
 *
 * @author huangdou
 * @date 2019/1/1
 */
public interface SongService {

    /**
     * 分页获取歌曲列表
     *
     * @param query
     * @return
     */
    PageUtils pageSongList(Query query);

    /**
     * 保存歌曲
     *
     * @param song
     * @return
     */
    int save(SongEntity song);

}
