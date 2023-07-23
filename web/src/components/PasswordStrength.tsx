type Strengths = 'weak' | 'medium' | 'strong' | 'invalid'

const PasswordStrength = ({ password }: { password: string }) => {
  const mediumRegex =
    / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{10,}))/
  const strongRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{16,})/

  let strength: Strengths = 'weak'
  if (strongRegex.test(password)) {
    strength = 'strong'
  } else if (mediumRegex.test(password)) {
    strength = 'medium'
  }

  const barColor = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
    invalid: 'bg-gray-500',
  }

  const translate = {
    weak: 'fraca',
    medium: 'média',
    strong: 'forte',
  }

  return (
    <>
      <div className="w-full h-1 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor[strength]}`}
          style={{
            width: `${
              strength === 'weak' ? 33 : strength === 'medium' ? 66 : 100
            }%`,
          }}
        ></div>
      </div>
      <span className="text-xs text-slate-200 -mt-3">
        Senha: {translate[strength]}
      </span>
    </>
  )
}

export { PasswordStrength }

