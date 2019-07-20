package info.doushen.system.mapper;

import info.doushen.common.utils.Query;
import info.doushen.system.entity.DictEntity;

import java.util.List;
import java.util.Map;

/**
 * DictMapper
 *
 * @author huangdou
 * @date 2018/12/12
 */
public interface DictMapper {

    /**
     * 获取字典类型列表
     *
     * @return
     */
    List<DictEntity> listType();

    /**
     * 获取数据字典记录
     *
     * @param query
     * @return
     */
    List<DictEntity> list(Query query);

    /**
     * 保存数据字典
     *
     * @param dict
     * @return
     */
    int save(DictEntity dict);

    /**
     * 获取字典信息
     *
     * @param id
     * @return
     */
    DictEntity get(int id);

    /**
     * 删除数据字典
     *
     * @param id
     * @return
     */
    int remove(int id);

    /**
     * 更新数据字典
     *
     * @param dict
     * @return
     */
    int update(DictEntity dict);

    /**
     * 根据字典类型获取数据字典
     *
     * @param dictType
     * @return
     */
    List<DictEntity> queryDictByType(String dictType);

    /**
     * 获取所有数据字典
     *
     * @return
     */
    List<DictEntity> queryAll();

    /**
     * 数据字典显示值
     *
     * @param params
     * @return
     */
    String dictDisplay(Map<String, Object> params);

}
