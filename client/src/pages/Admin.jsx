import { useState, useEffect } from 'react'
import axios from 'axios'

// ForgeAI admin panel — generic CRUD over every data model.
// Intentionally NOT linked from the public site; reach it directly at /admin.
const MODELS = [
  {
    "name": "Stick",
    "endpoint": "/api/sticks",
    "fields": [
      {
        "name": "name",
        "type": "String"
      },
      {
        "name": "description",
        "type": "String"
      },
      {
        "name": "price",
        "type": "Number"
      },
      {
        "name": "imageUrl",
        "type": "String"
      }
    ]
  },
  {
    "name": "Review",
    "endpoint": "/api/reviews",
    "fields": [
      {
        "name": "stickId",
        "type": "String"
      },
      {
        "name": "userName",
        "type": "String"
      },
      {
        "name": "rating",
        "type": "Number"
      },
      {
        "name": "comment",
        "type": "String"
      },
      {
        "name": "date",
        "type": "Date"
      }
    ]
  }
]

function ModelManager({ model }) {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState({})
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(model.endpoint)
      setRows(Array.isArray(data) ? data : (data.items || data.data || []))
      setError('')
    } catch (e) {
      setError('Failed to load ' + model.name + 's')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const set = (name, isBool) => (e) =>
    setForm((f) => ({ ...f, [name]: isBool ? e.target.checked : e.target.value }))

  const reset = () => { setForm({}); setEditing(null) }

  const submit = async (e) => {
    e.preventDefault()
    const payload = {}
    model.fields.forEach((f) => { payload[f.name] = form[f.name] })
    try {
      if (editing) await axios.put(model.endpoint + '/' + editing, payload)
      else await axios.post(model.endpoint, payload)
      reset()
      await load()
    } catch (err) {
      setError((err.response && err.response.data && err.response.data.message) || 'Save failed')
    }
  }

  const edit = (row) => { setEditing(row._id); setForm(row) }

  const remove = async (id) => {
    if (!window.confirm('Delete this record?')) return
    try { await axios.delete(model.endpoint + '/' + id); await load() }
    catch (err) { setError('Delete failed') }
  }

  return (
    <section className="admin-model card">
      <h2 className="admin-model-title">{model.name}</h2>
      {error && <p className="admin-error">{error}</p>}
      <form className="admin-form" onSubmit={submit}>
        {model.fields.map((f) => (
          <label key={f.name} className="admin-field">
            <span className="admin-label">{f.name}</span>
            {f.type === 'Boolean' ? (
              <input type="checkbox" checked={!!form[f.name]} onChange={set(f.name, true)} />
            ) : (
              <input
                className="admin-input"
                type={f.type === 'Number' ? 'number' : f.type === 'Date' ? 'date' : 'text'}
                value={form[f.name] == null ? '' : form[f.name]}
                onChange={set(f.name)}
              />
            )}
          </label>
        ))}
        <div className="admin-actions">
          <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
          {editing && (
            <button type="button" className="btn btn-secondary" onClick={reset}>Cancel</button>
          )}
        </div>
      </form>
      {loading ? (
        <p className="admin-loading">Loading…</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {model.fields.map((f) => <th key={f.name}>{f.name}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td className="admin-empty" colSpan={model.fields.length + 1}>No records yet.</td></tr>
              )}
              {rows.map((row) => (
                <tr key={row._id}>
                  {model.fields.map((f) => (
                    <td key={f.name}>
                      {typeof row[f.name] === 'boolean'
                        ? (row[f.name] ? 'Yes' : 'No')
                        : String(row[f.name] == null ? '' : row[f.name])}
                    </td>
                  ))}
                  <td className="admin-row-actions">
                    <button className="btn btn-secondary" onClick={() => edit(row)}>Edit</button>
                    <button className="btn btn-secondary" onClick={() => remove(row._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default function Admin() {
  return (
    <main className="admin container">
      <header className="admin-head">
        <h1>Admin Panel</h1>
        <p className="admin-sub">Manage your application's data. This page is not linked from the public site.</p>
      </header>
      {MODELS.map((m) => <ModelManager key={m.name} model={m} />)}
    </main>
  )
}
